import { useState } from 'react';
import {
  MdSearch,
  MdCalendarToday,
  MdKeyboardArrowDown,
  MdWarning,
  MdPeople,
  MdDomain,
  MdLocationOn,
} from 'react-icons/md';

const initialLedgerData = [
  {
    num: 1,
    type: 'Driver SOS',
    id: 'SOS-9042',
    typeCategory: 'Driver SOS',
    initiatorInitials: 'BA',
    initiatorName: 'Bilal Ahmed',
    initiatorRole: 'Staff Driver',
    bus: 'Bus 09',
    route: 'Route 3 (Univ. Express)',
    location: 'Near Ring Road Crossing',
    coords: '33.6844, 73.0479',
    time: '07:35 AM',
    status: '8 mins active',
    statusType: 'critical',
    isCriticalRow: true,
  },
  {
    num: 2,
    type: 'Parent SOS',
    id: 'SOS-9039',
    typeCategory: 'Parent SOS',
    initiatorInitials: 'AK',
    initiatorName: 'Ayesha Khan',
    initiatorRole: 'Parent of Zaid (G-5)',
    bus: 'Bus 12',
    route: 'Route 1 (Green Valley)',
    location: 'Sector B-1 Stop',
    coords: null,
    time: '07:12 AM',
    status: 'Acknowledged',
    statusType: 'acknowledged',
    isCriticalRow: false,
  },
  {
    num: 3,
    type: 'Driver SOS',
    id: 'SOS-9035',
    typeCategory: 'Driver SOS',
    initiatorInitials: 'MA',
    initiatorName: 'Muhammad Ali',
    initiatorRole: 'Staff Driver',
    bus: 'Bus 12',
    route: 'Route 1 (Green Valley)',
    location: 'Sector 4 Junction',
    coords: null,
    time: '06:50 AM',
    status: 'Resolved',
    statusType: 'resolved',
    isCriticalRow: false,
  },
  {
    num: 4,
    type: 'Parent SOS',
    id: 'SOS-9031',
    typeCategory: 'Parent SOS',
    initiatorInitials: 'SK',
    initiatorName: 'Sara Khan',
    initiatorRole: 'Parent of Zain (G-7)',
    bus: 'Bus 07',
    route: 'Route 2 (Model Town)',
    location: 'School Gate 3 Terminal',
    coords: null,
    time: '06:40 AM',
    status: 'Resolved',
    statusType: 'resolved',
    isCriticalRow: false,
  },
  {
    num: 5,
    type: 'Depot Warning',
    id: 'SOS-9028',
    typeCategory: 'Impact & Sensor',
    initiatorInitials: 'RM',
    initiatorName: 'Rashid Mehmood',
    initiatorRole: 'Staff Driver',
    bus: 'Bus 15',
    route: 'Route 4 (Johar Town)',
    location: 'Central Workshop Bays',
    coords: null,
    time: '06:15 AM',
    status: 'Resolved',
    statusType: 'resolved',
    isCriticalRow: false,
  },
];

const EmergencyResponseLedger = () => {
  const [activeTab, setActiveTab] = useState('All Alerts');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredData = initialLedgerData.filter((item) => {
    // Tab Filter
    if (activeTab === 'Parent SOS' && item.typeCategory !== 'Parent SOS') return false;
    if (activeTab === 'Driver SOS' && item.typeCategory !== 'Driver SOS') return false;
    if (activeTab === 'Impact & Sensor' && item.typeCategory !== 'Impact & Sensor') return false;
    if (activeTab === 'Resolved' && item.statusType !== 'resolved') return false;

    // Search Filter
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

  return (
    <div className="space-y-4">
      {/* Filter Navigation Tabs & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 flex-wrap">
          {[
            { label: 'All Alerts (5)', name: 'All Alerts' },
            { label: 'Parent SOS (2)', name: 'Parent SOS' },
            { label: 'Driver SOS (2)', name: 'Driver SOS' },
            { label: 'Impact & Sensor (1)', name: 'Impact & Sensor' },
            { label: 'Resolved (4)', name: 'Resolved' },
          ].map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
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

        {/* Controls row: Search, Date Filter, Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium">Auto-sync:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
              Live 5s Polling
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            {/* Search within alerts */}
            <div className="relative w-full sm:w-60">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-slate-400">
                <MdSearch className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Alert ID, Bus No, Parent, d..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Date Dropdown */}
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-slate-50">
              <MdCalendarToday className="w-3.5 h-3.5 text-slate-400" />
              Today, Sep 28
            </button>

            {/* Severity Dropdown */}
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-slate-50">
              All Severity Levels
              <MdKeyboardArrowDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Response Ledger Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header summary */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Emergency Response Ledger</h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full">
                {filteredData.length} Total Events
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Displaying entries logged in past 24 hours
            </p>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-8">#</th>
                <th className="py-3 px-4">ALERT TYPE &amp; ID</th>
                <th className="py-3 px-4">INITIATOR / USER</th>
                <th className="py-3 px-4">BUS &amp; ROUTE</th>
                <th className="py-3 px-4">LOCATION TELEMETRY</th>
                <th className="py-3 px-4 text-right">TIME / STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    No emergency alert records match your criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      row.isCriticalRow
                        ? 'bg-red-50/40 hover:bg-red-50/70'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td
                      className={`py-3 px-4 font-bold ${
                        row.isCriticalRow ? 'text-red-600' : 'text-slate-400'
                      }`}
                    >
                      {row.num}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                            row.type === 'Driver SOS'
                              ? row.isCriticalRow
                                ? 'text-red-700'
                                : 'text-blue-700'
                              : row.type === 'Parent SOS'
                              ? 'text-blue-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {row.type === 'Driver SOS' && (
                            <MdWarning
                              className={`w-3 h-3 ${
                                row.isCriticalRow ? 'text-red-600' : 'text-blue-600'
                              }`}
                            />
                          )}
                          {row.type === 'Parent SOS' && (
                            <MdPeople className="w-3 h-3 text-blue-600" />
                          )}
                          {row.type === 'Depot Warning' && (
                            <MdDomain className="w-3 h-3 text-slate-500" />
                          )}
                          {row.type}
                        </span>
                        <span className="font-bold text-slate-800 text-[11px] mt-0.5">
                          {row.id}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full font-bold text-[10px] flex items-center justify-center ${
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

                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{row.bus}</span>
                      <span className="text-[10px] text-slate-500">{row.route}</span>
                    </td>

                    <td className="py-3 px-4">
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
                          <MdLocationOn className="w-2.5 h-2.5" />
                          {row.coords}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`block ${
                          row.isCriticalRow
                            ? 'font-bold text-red-600'
                            : 'font-medium text-slate-800'
                        }`}
                      >
                        {row.time}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${
                          row.statusType === 'critical'
                            ? 'text-red-500'
                            : row.statusType === 'acknowledged'
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1-5 of 12 Recorded Incidents This Week</span>
          <div className="flex items-center gap-1 font-medium">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(1)}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                page === 1
                  ? 'bg-blue-600 text-white font-bold'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setPage(2)}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                page === 2
                  ? 'bg-blue-600 text-white font-bold'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setPage(3)}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                page === 3
                  ? 'bg-blue-600 text-white font-bold'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              3
            </button>
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponseLedger;
