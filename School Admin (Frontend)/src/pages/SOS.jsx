import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import SOSPageHeader from '../components/pagecomponents/SOS/SOSPageHeader';
import SOSStatCards from '../components/pagecomponents/SOS/SOSStatCards';
import CriticalAlertBanner from '../components/pagecomponents/SOS/CriticalAlertBanner';
import EmergencyResponseLedger from '../components/pagecomponents/SOS/EmergencyResponseLedger';
import SOSFooter from '../components/pagecomponents/SOS/SOSFooter';
import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

const isValidUUID = (val) =>
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const SOS = ({ onLogout, onNavigate, currentPage = 'SOS Alerts' }) => {
  const [alerts, setAlerts] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchAlerts = useCallback(async () => {
    try {
      let query = supabase
        .from('sos_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      const schoolId = getCurrentSchoolId();
      if (isValidUUID(schoolId)) {
        query = query.or(`school_id.eq.${schoolId},school_id.is.null`);
      }

      const { data, error } = await query;
      if (!error && data) {
        setAlerts(data);
      }
    } catch (err) {
      console.error('Failed to fetch sos_alerts:', err);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();

    // 5-second polling fallback
    const interval = setInterval(fetchAlerts, 5000);

    // Real-time Supabase subscription
    const channel = supabase
      .channel('admin:sos_page_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sos_alerts' },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [fetchAlerts]);

  const handleResolveAlert = async (alertId) => {
    try {
      const { error } = await supabase
        .from('sos_alerts')
        .update({ status: 'resolved' })
        .eq('id', alertId);

      if (error) throw error;
      showNotification(`Incident #${alertId.slice(0, 4).toUpperCase()} marked as Resolved.`);
      await fetchAlerts();
    } catch (err) {
      console.error('Failed to resolve alert:', err);
      showNotification('Could not resolve alert. Please try again.');
    }
  };

  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const activeAlert = activeAlerts[0] || null;

  return (
    <div className="h-screen flex bg-[#F8FAFC] antialiased text-slate-800 overflow-hidden font-sans">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        <main className="p-8 space-y-6 max-w-[1440px] w-full mx-auto flex-1">
          {/* Page Header */}
          <SOSPageHeader />

          {/* KPI Stat Cards (Dynamic from real DB) */}
          <SOSStatCards alerts={alerts} />

          {/* Critical Alert Banner Card (Shows only when an active critical alert exists) */}
          <CriticalAlertBanner
            activeAlert={activeAlert}
            onResolveAlert={handleResolveAlert}
          />

          {/* Full-Width Emergency Response Ledger (matches Parents screen layout) */}
          <EmergencyResponseLedger
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          <div className="h-4"></div>
        </main>

        <SOSFooter />
      </div>
    </div>
  );
};

export default SOS;
