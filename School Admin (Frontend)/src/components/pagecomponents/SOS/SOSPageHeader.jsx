import { MdCampaign, MdFileDownload, MdWarning } from 'react-icons/md';

const SOSPageHeader = ({ onBroadcast, onExport, onTriggerDistress }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          <span>SAFETY &amp; FLEET OPERATIONS</span>
          <span>/</span>
          <span className="text-blue-600 font-bold">Incident Dispatch &amp; SOS Center</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          SOS Alerts &amp; Emergency Incident Center
        </h2>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="font-bold">1 Critical Alert Active</span>
          <span className="text-red-300">|</span>
          <span>Dispatcher Team #04 Linked</span>
        </div>
      </div>

      {/* Top Right Incident Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          onClick={onBroadcast}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <MdCampaign className="w-4 h-4 text-slate-500" />
          Broadcast Safety Advisory
        </button>
        <button
          onClick={onExport}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <MdFileDownload className="w-4 h-4 text-slate-500" />
          Export Incident Log
        </button>
        <button
          onClick={onTriggerDistress}
          className="px-4 py-2 bg-[#b91c1c] hover:bg-red-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm shadow-red-900/20 transition-all cursor-pointer"
        >
          <MdWarning className="w-4 h-4 text-red-100" />
          Trigger Manual Distress
        </button>
      </div>
    </div>
  );
};

export default SOSPageHeader;
