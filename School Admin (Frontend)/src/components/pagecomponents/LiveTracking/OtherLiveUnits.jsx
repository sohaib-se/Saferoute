import React from 'react';

const OtherLiveUnits = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onViewAll,
}) => {
  // Filter out the selected vehicle or show all other units
  const otherUnits = vehicles.filter((v) => v.id !== selectedVehicle?.id);

  return (
    <section
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3 font-sans"
      data-purpose="other-fleet-units"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
          OTHER LIVE UNITS
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
        >
          View All ({vehicles.length})
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {otherUnits.map((unit) => {
          const isDelayed = unit.statusType === 'delayed';

          return (
            <div
              key={unit.id}
              onClick={() => onSelectVehicle(unit)}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isDelayed ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                ></span>
                <div>
                  <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {unit.name}
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    {unit.route.split(' - ')[1] || unit.route} • {unit.driver}
                  </p>
                </div>
              </div>

              <div className="text-right">
                {isDelayed ? (
                  <>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                      Delay +8m
                    </span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {unit.speed}{' '}
                      <span className="font-normal text-slate-400">km/h</span>
                    </p>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-slate-800">
                      {unit.speed}{' '}
                      <span className="text-[10px] text-slate-500 font-normal">
                        km/h
                      </span>
                    </span>
                    <p className="text-[10px] text-slate-400">
                      ETA: {unit.timeline?.[2]?.time?.split(' ')?.[0] || '08:35 AM'}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OtherLiveUnits;
