import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdDirectionsBus } from 'react-icons/md';
import { getVehicles } from '../../../services/vehiclesService';

const TodaysTrips = ({ onNavigate }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadFleetTrips = async () => {
      try {
        const data = await getVehicles();
        if (isMounted) {
          setVehicles(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setVehicles([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadFleetTrips();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigateToTrips = () => {
    if (onNavigate) {
      onNavigate('Trips');
    } else {
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: 'Trips' }));
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Available').toLowerCase();
    if (s === 'on route' || s === 'in transit') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981]">
          <span className="text-[8px] animate-pulse">●</span> On Route
        </span>
      );
    }
    if (s === 'maintenance') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600">
          <span className="text-[8px]">●</span> Maintenance
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB]">
        <span className="text-[8px]">●</span> {status || 'Available'}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between" data-purpose="todays-trips-card">
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Fleet Trips & Transit</h3>
            <p className="text-xs text-slate-400 mt-0.5">Active vehicles and assigned route transit</p>
          </div>
          <button
            type="button"
            onClick={handleNavigateToTrips}
            className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 cursor-pointer"
          >
            View All
          </button>
        </div>
        
        {/* Trips Table */}
        <div className="mt-4">
          <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 px-2">
            <div className="col-span-4">BUS NO.</div>
            <div className="col-span-5">ROUTE / DRIVER</div>
            <div className="col-span-3 text-right">STATUS</div>
          </div>
          
          <div className="divide-y divide-slate-50 text-xs">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Loading fleet schedule...
              </div>
            ) : vehicles.length > 0 ? (
              vehicles.slice(0, 5).map((v) => (
                <div
                  key={v.id || v.name}
                  onClick={handleNavigateToTrips}
                  className="grid grid-cols-12 items-center py-3.5 px-2 hover:bg-slate-50/70 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="col-span-4 flex items-center gap-2 font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                    <span className="truncate">{v.name}</span>
                  </div>
                  <div className="col-span-5 text-slate-600 font-medium truncate">
                    <span>{v.assignedRoute || v.route || 'Morning Schedule'}</span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {v.driverName ? `Driver: ${v.driverName}` : 'Driver on call'}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    {getStatusBadge(v.status)}
                    <MdChevronRight className="text-[14px] text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs font-bold text-slate-700">No vehicles registered</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Register vehicles in the Vehicles tab to see daily fleet schedules.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Card Banner */}
      <div className="mx-5 mb-5 p-4 rounded-xl bg-[#091124] text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white text-base shrink-0">
            <MdDirectionsBus size={18} />
          </div>
          <div>
            <p className="text-xs font-bold leading-tight tracking-tight">School Fleet Telematics</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              {vehicles.length} VEHICLE{vehicles.length === 1 ? '' : 'S'} REGISTERED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysTrips;
