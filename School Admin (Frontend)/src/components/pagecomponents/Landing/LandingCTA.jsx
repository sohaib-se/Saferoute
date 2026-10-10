import { Link } from 'react-router-dom';
import { MdArrowForward, MdVerifiedUser, MdSupportAgent, MdFlashOn } from 'react-icons/md';

const LandingCTA = () => {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-12 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl p-10 sm:p-16 text-center shadow-xl shadow-blue-500/15 overflow-hidden">
          {/* Subtle background ambient circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/15 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
              Instant Institutional Onboarding
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Secure Your School Fleet?
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Join leading schools that have eliminated waiting anxiety, verified daily commutes, and modernized their transport logistics with SafeRoute.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Register Your School</span>
                <MdArrowForward className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/25 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Access Admin Portal</span>
              </Link>
            </div>

            {/* Proof Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/15 text-[11px] text-blue-100 font-medium">
              <div className="flex items-center gap-1.5">
                <MdFlashOn className="w-4 h-4 text-amber-300" />
                <span>15-Minute Fleet Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MdVerifiedUser className="w-4 h-4 text-emerald-300" />
                <span>Enterprise Telematics Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MdSupportAgent className="w-4 h-4 text-sky-200" />
                <span>Dedicated Dispatch Liaison</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
