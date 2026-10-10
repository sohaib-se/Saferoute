import { MdCheck, MdDirectionsBus, MdSecurity, MdSpeed } from 'react-icons/md';

const LandingAbout = () => {
  return (
    <section id="about" className="py-20 px-6 sm:px-10 lg:px-12 relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Card (Col-5) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <MdDirectionsBus size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">SafeRoute Core Engine</h4>
                    <p className="text-[10px] text-slate-400">Institutional Safety Layer</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  100% Operational
                </span>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <MdSecurity className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Child Transit Security</p>
                      <p className="text-[10px] text-slate-400">Zero unauthorized drop-offs</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">100%</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <MdSpeed className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Telemetry Refresh Rate</p>
                      <p className="text-[10px] text-slate-400">Low-latency GPS streaming</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">&lt; 2s</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <MdDirectionsBus className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">School Gate Congestion</p>
                      <p className="text-[10px] text-slate-400">Reduced parent car lines</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-600">-65%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Description (Col-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold uppercase tracking-wider">
              About The SafeRoute Platform
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Bridging the Communication Gap Between Schools and Families.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SafeRoute was built with one goal: to eliminate stress, confusion, and safety risks from daily school commutes. We replace chaotic phone calls and manual gate sign-ins with an intelligent fleet ecosystem where every trip is verified, monitored, and transparent.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                'Sub-second real-time GPS tracking',
                'Reduced gate traffic & waiting anxiety',
                'Verified passenger manifests for every stop',
                'Instant driver panic distress linkage',
                'Comprehensive driver background audits',
                'Direct two-way dispatcher audio bridge',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MdCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
