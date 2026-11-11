import { useState } from 'react';
import {
  MdSearch,
  MdWarning,
  MdPeople,
  MdLocationOn,
  MdCheckCircle,
  MdFileDownload,
} from 'react-icons/md';

const EmergencyResponseLedger = ({ alerts = [], onResolveAlert }) => {
  const [activeTab, setActiveTab] = useState('All Alerts');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // Map raw DB alerts into table display rows
  const ledgerData = alerts.map((row, index) => {
    const isDriver = row.sender_type === 'driver';
    const senderType = isDriver ? 'Driver SOS' : 'Parent SOS';
    const initials = (row.sender_name || 'SR')
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const isCritical = row.status === 'active';
    const created = row.created_at ? new Date(row.created_at) : new Date();
    const timeStr = created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const lat = Number(row.latitude);
    const lng = Number(row.longitude);
    const coordsStr =
      !isNaN(lat) && !isNaN(lng) && lat !== 0
        ? `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        : null;

    return {
      num: index + 1,
      realId: row.id,
      id: `SOS-${row.id.slice(0, 4).toUpperCase()}`,
      type: senderType,
      typeCategory: senderType,
      initiatorInitials: initials || 'SR',
      initiatorName: row.sender_name || (isDriver ? 'Staff Driver' : 'Registered Parent'),
      initiatorRole: isDriver ? 'Staff Driver' : 'Registered Parent',
      bus: row.vehicle_name || (isDriver ? 'Assigned Bus' : 'Parent Stop'),
      route: isDriver ? 'Active Fleet Route' : 'Assigned Stop',
      location: coordsStr ? `GPS (${coordsStr})` : 'Telemetry Distress Point',
      coords: coordsStr,
      time: timeStr,
      status: isCritical ? 'Active Beacon' : 'Resolved',
      statusType: isCritical ? 'critical' : 'resolved',
      isCriticalRow: isCritical,
    };
  });

  const counts = {
    all: ledgerData.length,
    driver: ledgerData.filter((i) => i.typeCategory === 'Driver SOS').length,
    parent: ledgerData.filter((i) => i.typeCategory === 'Parent SOS').length,
    resolved: ledgerData.filter((i) => i.statusType === 'resolved').length,
  };

  const filteredData = ledgerData.filter((item) => {
    if (activeTab === 'Driver SOS' && item.typeCategory !== 'Driver SOS') return false;
    if (activeTab === 'Parent SOS' && item.typeCategory !== 'Parent SOS') return false;
    if (activeTab === 'Resolved' && item.statusType !== 'resolved') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.initiatorName.toLowerCase().includes(q) ||
        item.bus.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'emergency_sos_ledger.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans w-full"
      data-purpose="emergency-response-ledger-container"
    >
      {/* Table Top Toolbar (styled like ParentsTableSection) */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Emergency Response Ledger
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              {filteredData.length} Logged
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all font-sans"
                placeholder="Search by ID, Bus, Driver, Parent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <MdFileDownload className="w-4 h-4 text-slate-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs Bar */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 flex-wrap">
          {[
            { label: `All Alerts (${counts.all})`, name: 'All Alerts' },
            { label: `Driver SOS (${counts.driver})`, name: 'Driver SOS' },
            { label: `Parent SOS (${counts.parent})`, name: 'Parent SOS' },
            { label: `Resolved (${counts.resolved})`, name: 'Resolved' },
          ].map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Page Responsive Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-5 w-12">#</th>
              <th className="py-3.5 px-5">ALERT TYPE &amp; ID</th>
              <th className="py-3.5 px-5">INITIATOR / USER</th>
              <th className="py-3.5 px-5">VEHICLE / ROUTE</th>
              <th className="py-3.5 px-5">LOCATION TELEMETRY</th>
              <th className="py-3.5 px-5 text-right">STATUS / ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-slate-400 italic">
                  No emergency distress alerts recorded in database.
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr
                  key={row.realId}
                  className={`transition-colors ${
                    row.isCriticalRow
                      ? 'bg-red-50/50 hover:bg-red-50/80'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td
                    className={`py-3.5 px-5 font-bold ${
                      row.isCriticalRow ? 'text-red-600' : 'text-slate-400'
                    }`}
                  >
                    {row.num}
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex flex-col">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                          row.type === 'Driver SOS'
                            ? row.isCriticalRow
                              ? 'text-red-700'
                              : 'text-blue-700'
                            : 'text-indigo-700'
                        }`}
                      >
                        {row.type === 'Driver SOS' ? (
                          <MdWarning
                            className={`w-3.5 h-3.5 ${
                              row.isCriticalRow ? 'text-red-600 animate-pulse' : 'text-blue-600'
                            }`}
                          />
                        ) : (
                          <MdPeople className="w-3.5 h-3.5 text-indigo-600" />
                        )}
                        {row.type}
                      </span>
                      <span className="font-bold text-slate-800 text-[11px] mt-0.5">
                        #{row.id}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full font-bold text-[11px] flex items-center justify-center ${
                          row.isCriticalRow
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {row.initiatorInitials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">
                          {row.initiatorName}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {row.initiatorRole}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="font-bold text-slate-900 block">{row.bus}</span>
                    <span className="text-[10px] text-slate-500">{row.route}</span>
                  </td>

                  <td className="py-3.5 px-5">
                    <span
                      className={`block ${
                        row.isCriticalRow
                          ? 'font-medium text-slate-800'
                          : 'font-medium text-slate-700'
                      }`}
                    >
                      {row.location}
                    </span>
                    {row.coords && (
                      <span className="text-[10px] text-blue-600 font-mono flex items-center gap-1">
                        <MdLocationOn className="w-3 h-3 text-red-500" />
                        {row.coords}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {row.time}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            row.statusType === 'critical'
                              ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {row.status}
                        </span>
                      </div>

                      {row.isCriticalRow && onResolveAlert && (
                        <button
                          onClick={() => onResolveAlert(row.realId)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                          <MdCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {filteredData.length} of {filteredData.length} Recorded Incident{filteredData.length === 1 ? '' : 's'}
        </span>
        <div className="flex items-center gap-1 font-medium">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 cursor-pointer transition-colors"
          >
            Prev
          </button>
          <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs">
            {page}
          </span>
          <button
            disabled={true}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmergencyResponseLedger;
