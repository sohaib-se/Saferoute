import React, { useState, useEffect } from 'react';
import { MdDirectionsBus, MdLocationOn, MdPerson, MdVerifiedUser, MdTrendingUp } from 'react-icons/md';
import { getVehicles } from '../../../services/vehiclesService';
import { getDrivers } from '../../../services/driversService';
import { getStudents } from '../../../services/studentsService';

const StatCards = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    operationalVehicles: 0,
    activeTrips: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    totalStudents: 0,
    onboardStudents: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardStats = async () => {
      try {
        const [vehiclesRes, driversRes, studentsRes] = await Promise.all([
          getVehicles().catch(() => []),
          getDrivers().catch(() => []),
          getStudents().catch(() => []),
        ]);

        if (isMounted) {
          const vehicles = vehiclesRes || [];
          const drivers = driversRes || [];
          const students = studentsRes || [];

          const activeTripsCount = vehicles.filter((v) => {
            const st = (v.status || '').toLowerCase();
            return st === 'on route' || st === 'in transit';
          }).length;

          const operationalVehiclesCount = vehicles.filter((v) => {
            const st = (v.status || '').toLowerCase();
            return st !== 'maintenance' && st !== 'inactive';
          }).length;

          const activeDriversCount = drivers.filter((d) => {
            const st = (d.status || '').toLowerCase();
            return st === 'active' || st === 'on duty' || st === 'available';
          }).length;

          const onboardStudentsCount = students.filter((s) => {
            const st = (s.status || '').toLowerCase();
            return st === 'picked up' || st === 'on route' || st === 'en route';
          }).length;

          setStats({
            totalVehicles: vehicles.length,
            operationalVehicles: operationalVehiclesCount,
            activeTrips: activeTripsCount,
            totalDrivers: drivers.length,
            activeDrivers: activeDriversCount,
            totalStudents: students.length,
            onboardStudents: onboardStudentsCount,
            loading: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchDashboardStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-cards">
      {/* Card 1: TOTAL VEHICLES */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Total Vehicles
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats.loading ? '...' : stats.totalVehicles}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-2">
            <MdTrendingUp size={14} />
            <span>
              {stats.totalVehicles > 0
                ? `${stats.operationalVehicles} operational`
                : 'No vehicles registered'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <MdDirectionsBus size={20} />
        </div>
      </div>

      {/* Card 2: ACTIVE TRIPS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Active Trips
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats.loading ? '...' : stats.activeTrips}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <span
              className={`w-2 h-2 rounded-full ${
                stats.activeTrips > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
              }`}
            ></span>
            <span>
              {stats.activeTrips > 0 ? `${stats.activeTrips} in progress now` : 'No active trips'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          <MdLocationOn size={20} />
        </div>
      </div>

      {/* Card 3: DRIVERS ONLINE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Drivers
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats.loading ? '...' : stats.totalDrivers}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <MdPerson size={14} className="text-blue-600" />
            <span>
              {stats.totalDrivers > 0
                ? `${stats.activeDrivers} available / on-duty`
                : 'No drivers registered'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <MdPerson size={20} />
        </div>
      </div>

      {/* Card 4: STUDENTS ENROLLED */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Students Enrolled
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats.loading ? '...' : stats.totalStudents}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-2">
            <MdVerifiedUser size={14} />
            <span>
              {stats.totalStudents > 0
                ? `${stats.onboardStudents} currently onboard`
                : 'No students enrolled'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
          <MdVerifiedUser size={20} />
        </div>
      </div>
    </section>
  );
};

export default StatCards;
