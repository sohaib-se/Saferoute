import { MdAccessTime } from 'react-icons/md';

const IncidentTimeline = ({ onViewArchive }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <h3 className="text-xs font-bold text-slate-900">Incident Dispatch Timeline</h3>
        <span className="text-[11px] text-slate-400 font-medium">Case #SOS-9042</span>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {/* Item 1: Driver Panic Pressed */}
        <div className="relative">
          <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-white"></span>
          <div className="text-[11px]">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>07:35:12 AM — Driver Panic Pressed</span>
            </div>
            <p className="text-slate-500 mt-0.5 leading-snug">
              Dashboard distress button depressed continuously for 3s by Driver Bilal Ahmed.
            </p>
          </div>
        </div>

        {/* Item 2: Server Telematics Handshake */}
        <div className="relative">
          <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
          <div className="text-[11px]">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>07:35:30 AM — Server Telematics Handshake</span>
            </div>
            <p className="text-slate-500 mt-0.5 leading-snug">
              Cellular gateway acknowledged packet. Geo-coordinates pinned at 33.6844° N, 73.0479° E.
            </p>
          </div>
        </div>

        {/* Item 3: Dispatcher Linked */}
        <div className="relative">
          <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
          <div className="text-[11px]">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>07:36:04 AM — Dispatcher Linked</span>
            </div>
            <p className="text-slate-500 mt-0.5 leading-snug">
              Supervisor Tariq assumed control. Established two-way audio uplink with vehicle console.
            </p>
          </div>
        </div>

        {/* Item 4: Advisory SMS Prepared */}
        <div className="relative">
          <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
          <div className="text-[11px]">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>07:38:15 AM — Advisory SMS Prepared</span>
            </div>
            <p className="text-slate-500 mt-0.5 leading-snug">
              28 parents of onboard students ready for broadcast notification. Awaiting supervisor approval.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button: Diagnostic Telemetry */}
      <button
        onClick={onViewArchive}
        className="w-full mt-5 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-blue-100 shadow-xs"
      >
        <MdAccessTime className="w-4 h-4 text-blue-600" />
        View Full Diagnostic Telemetry Archive
      </button>
    </div>
  );
};

export default IncidentTimeline;
