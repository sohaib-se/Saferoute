import React from 'react';

const DriverKPICards = ({
  totalDrivers = 28,
  activeDrivers = 18,
  standbyDrivers = 7,
  offDutyDrivers = 3,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
      {/* Card 1: Total Drivers */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col min-w-0 pr-space-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
            Total Drivers
          </span>
          <span className="font-display-lg text-display-lg text-on-surface font-bold mt-space-xs leading-none">
            {totalDrivers}
          </span>
          <span className="font-body-sm text-body-sm text-outline mt-space-sm">
            Registered personnel
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[24px]">badge</span>
        </div>
      </div>

      {/* Card 2: On Duty / Active */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col min-w-0 pr-space-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
            On Duty / Active
          </span>
          <span className="font-display-lg text-display-lg text-on-surface font-bold mt-space-xs leading-none">
            {activeDrivers}
          </span>
          <div className="flex items-center gap-1.5 mt-space-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0"></span>
            <span className="font-body-sm text-body-sm text-on-surface truncate">
              Currently driving routes
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary-container shrink-0">
          <span className="material-symbols-outlined text-[24px]">timelapse</span>
        </div>
      </div>

      {/* Card 3: Standby / Idle */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col min-w-0 pr-space-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
            Standby / Idle
          </span>
          <span className="font-display-lg text-display-lg text-on-secondary-container font-bold mt-space-xs leading-none">
            {standbyDrivers}
          </span>
          <span className="font-body-sm text-body-sm text-outline mt-space-sm">
            Available for backup/shift
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary-container/60 flex items-center justify-center text-on-secondary-container shrink-0">
          <span className="material-symbols-outlined text-[24px]">schedule</span>
        </div>
      </div>

      {/* Card 4: On Leave / Off-Duty */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col min-w-0 pr-space-sm">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
            On Leave / Off-Duty
          </span>
          <span className="font-display-lg text-display-lg text-on-surface font-bold mt-space-xs leading-none">
            {offDutyDrivers}
          </span>
          <span className="font-body-sm text-body-sm text-outline mt-space-sm">
            Scheduled off-duty
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
          <span className="material-symbols-outlined text-[24px]">block</span>
        </div>
      </div>
    </section>
  );
};

export default DriverKPICards;
