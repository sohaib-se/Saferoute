import React, { useState, useEffect } from 'react';
import { MdDirectionsBus, MdPersonAdd, MdSchool, MdNotificationsNone } from 'react-icons/md';
import { supabase } from '../../../lib/supabaseClient';
import { getCurrentSchoolId } from '../../../lib/session';

const RecentActivity = ({ onNavigate }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRecentActivity = async () => {
      try {
        const schoolId = getCurrentSchoolId();
        if (!schoolId) {
          if (isMounted) setLoading(false);
          return;
        }

        // 1. First attempt to fetch recent notifications
        const { data: notifs } = await supabase
          .from('notifications')
          .select('*')
          .eq('school_id', schoolId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (notifs && notifs.length > 0) {
          if (isMounted) {
            setActivities(
              notifs.map((n) => ({
                id: n.id,
                title: n.title,
                subtitle: n.body,
                time: new Date(n.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                type: n.type || 'notice',
              }))
            );
            setLoading(false);
          }
          return;
        }

        // 2. Fallback to recently active students if no notifications yet
        const { data: students } = await supabase
          .from('students')
          .select('id, name, status, vehicle, driver, updated_at')
          .eq('school_id', schoolId)
          .order('updated_at', { ascending: false })
          .limit(5);

        if (isMounted) {
          if (students && students.length > 0) {
            setActivities(
              students.map((s) => ({
                id: s.id,
                title: `${s.name} • ${s.status || 'Enrolled'}`,
                subtitle: s.vehicle ? `Vehicle: ${s.vehicle}${s.driver ? ` • Driver: ${s.driver}` : ''}` : 'School Transit Roster',
                time: s.updated_at
                  ? new Date(s.updated_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Today',
                type: 'student',
              }))
            );
          } else {
            setActivities([]);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setActivities([]);
          setLoading(false);
        }
      }
    };

    fetchRecentActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  const getActivityIcon = (type) => {
    if (type === 'trip_start' || type === 'proximity' || type === 'vehicle') {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] flex-shrink-0">
          <MdDirectionsBus size={18} />
        </div>
      );
    }
    if (type === 'picked_up' || type === 'dropped_off' || type === 'student') {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981] flex-shrink-0">
          <MdSchool size={18} />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] flex-shrink-0">
        <MdPersonAdd size={18} />
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between" data-purpose="recent-activity-card">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('Notifications')}
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 cursor-pointer"
            >
              Notifications
            </button>
          )}
        </div>

        <div className="mt-4 space-y-3.5">
          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Loading recent activity...
            </div>
          ) : activities.length > 0 ? (
            activities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getActivityIcon(act.type)}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight truncate">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight truncate">
                      {act.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md shrink-0 ml-2">
                  {act.time}
                </span>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <MdNotificationsNone size={20} />
              </div>
              <p className="text-xs font-bold text-slate-700">No recent activity</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Activity events will update as trips start and attendance is recorded.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
