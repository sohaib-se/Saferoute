import React, { useState } from 'react';
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDeleteOutline,
  MdChevronLeft,
  MdChevronRight,
  MdRoute,
} from 'react-icons/md';

const RoutesTableSection = ({
  routesList = [],
  isLoading = false,
  onAddRouteClick,
  onEditRoute,
  onDeleteRoute,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);

  const filteredRoutes = routesList.filter((route) => {
    const term = searchTerm.toLowerCase().trim();
    return !term || (route.name || '').toLowerCase().includes(term);
  });

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans" data-purpose="routes-table-container">
      {/* Card Header Toolbar */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Title & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">Routes Directory</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                {routesList.length} Registered Routes
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 bg-slate-50/70 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
                placeholder="Search route name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Right: Add Route Button */}
          <div>
            <button
              type="button"
              onClick={onAddRouteClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-transparent text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition cursor-pointer"
            >
              <MdAdd size={16} />
              <span>Add Route</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6 w-16 text-center" scope="col">#</th>
              <th className="py-3.5 px-6 font-bold" scope="col">ROUTE NAME</th>
              <th className="py-3.5 px-6 font-bold" scope="col">DATE REGISTERED</th>
              <th className="py-3.5 px-6 text-center font-bold w-28" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400 text-xs font-normal">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-500 font-medium">Fetching routes from database...</span>
                  </div>
                </td>
              </tr>
            ) : filteredRoutes.length > 0 ? (
              filteredRoutes.map((route, idx) => (
                <tr key={route.id || idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 text-center text-slate-400 font-medium">{route.num || idx + 1}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 font-bold flex items-center justify-center text-xs shrink-0">
                        <MdRoute size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-snug">{route.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500 font-medium">
                    {route.formattedDate || 'Recently Added'}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onEditRoute && onEditRoute(route)}
                        className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit Route Name"
                      >
                        <MdEdit size={16} />
                      </button>
                      {onDeleteRoute && (
                        <button
                          type="button"
                          onClick={() => onDeleteRoute(route.id)}
                          className="p-1.5 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Route"
                        >
                          <MdDeleteOutline size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-slate-400 text-xs font-normal">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <p className="text-slate-600 font-medium">No routes found.</p>
                    <p className="text-slate-400 text-[11px]">Click "+ Add Route" above to register a route name for your school.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredRoutes.length}</span> of <span className="font-semibold text-slate-700">{routesList.length}</span> routes
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronLeft size={16} />
          </button>
          {[1].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 rounded-lg font-medium flex items-center justify-center transition cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={activePage === 1}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoutesTableSection;
