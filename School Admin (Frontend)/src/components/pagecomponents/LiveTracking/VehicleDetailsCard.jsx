import React from 'react';
import {
  MdDirectionsBus,
  MdVisibility,
  MdPhone,
  MdChat,
  MdWarning,
  MdCheck,
} from 'react-icons/md';

const VehicleDetailsCard = ({
  vehicle,
  onViewDetails,
  onCallDriver,
  onSendMessage,
  onTriggerSOS,
}) => {
  if (!vehicle) return null;

  const isDelayed = vehicle.statusType === 'delayed';
  const fuelPercent = vehicle.fuel || 76;
  const studentsPercent = Math.round(
    ((vehicle.studentsOnboard || 28) / (vehicle.totalCapacity || 32)) * 100
  );

  return (
    <section
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5 font-sans"
      data-purpose="vehicle-telematics-panel"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Vehicle Details
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{vehicle.shift}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isDelayed
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDelayed ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          ></span>
          <span>{vehicle.status}</span>
        </span>
      </div>

      {/* Bus Primary Identity */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
          <MdDirectionsBus size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {vehicle.name}
            </h3>
            <span className="text-[11px] font-mono font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Plate: {vehicle.plate}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1 space-y-0.5">
            <p>
              Driver:{' '}
              <button
                type="button"
                onClick={() => onCallDriver(vehicle)}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                {vehicle.driver}
              </button>
            </p>
            <p>
              Speed:{' '}
              <span
                className={`font-bold ${
                  isDelayed ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {vehicle.speed} km/h
              </span>{' '}
              <span className="text-slate-400 font-normal">
                (Limit: {vehicle.speedLimit || 50})
              </span>
            </p>
            <p className="text-[11px] text-slate-400">
              Last Update: {vehicle.lastUpdate}
            </p>
          </div>
        </div>
      </div>

      {/* Telematics Metrics (Fuel & Students onboard) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Fuel Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            FUEL LEVEL
          </span>
          <div className="flex items-baseline justify-between mt-1 mb-2">
            <span className="text-lg font-bold text-slate-800">
              {fuelPercent}%
            </span>
            <span className="text-[11px] font-medium text-emerald-600">
              {vehicle.fuelKm}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${fuelPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            STUDENTS ONBOARD
          </span>
          <div className="flex items-baseline justify-between mt-1 mb-2">
            <span className="text-lg font-bold text-slate-800">
              {vehicle.studentsOnboard}{' '}
              <span className="text-xs font-normal text-slate-400">
                / {vehicle.totalCapacity}
              </span>
            </span>
            <span className="text-[11px] font-medium text-blue-600">
              {studentsPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${studentsPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Route Timeline Stepper */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-400 tracking-wider uppercase text-[10px]">
            ROUTE TIMELINE
          </span>
          <span className="font-semibold text-blue-600">
            Next: {vehicle.nextStopEta}
          </span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 text-xs">
          {vehicle.timeline?.map((step) => {
            if (step.status === 'completed') {
              return (
                <div key={step.id || step.name} className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
                    <MdCheck size={11} className="stroke-[1.5]" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-slate-800">{step.name}</h4>
                    <span className="text-[11px] font-medium text-slate-400">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{step.note}</p>
                </div>
              );
            }

            if (step.status === 'current') {
              return (
                <div key={step.id || step.name} className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-blue-700">{step.name}</h4>
                    <span className="text-[11px] font-bold text-blue-700">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-600 font-medium">
                    {step.note}
                  </p>
                </div>
              );
            }

            return (
              <div key={step.id || step.name} className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300 ring-4 ring-white"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium text-slate-500">{step.name}</h4>
                  <span className="text-[11px] font-medium text-slate-400">
                    {step.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{step.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="space-y-2 pt-2">
        {/* View Details Primary CTA */}
        <button
          type="button"
          onClick={() => onViewDetails(vehicle)}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <MdVisibility size={16} />
          <span>View Details</span>
        </button>

        {/* Two Column Driver Actions */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => onCallDriver(vehicle)}
            className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <MdPhone size={14} className="text-slate-500" />
            <span>Call Driver</span>
          </button>
          <button
            type="button"
            onClick={() => onSendMessage(vehicle)}
            className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <MdChat size={14} className="text-slate-500" />
            <span>Send Message</span>
          </button>
        </div>

        {/* SOS Alert Depot CTA */}
        <button
          type="button"
          onClick={() => onTriggerSOS(vehicle)}
          className="w-full py-2 px-4 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <MdWarning size={16} className="text-amber-600" />
          <span>Trigger SOS / Alert Depot</span>
        </button>
      </div>
    </section>
  );
};

export default VehicleDetailsCard;
