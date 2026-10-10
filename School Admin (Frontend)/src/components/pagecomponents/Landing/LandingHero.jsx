import { Link } from 'react-router-dom';
import {
  MdDirectionsBus,
  MdArrowForward,
  MdShield,
  MdLocationOn,
  MdNotificationsActive,
  MdPeople,
  MdCheckCircle,
} from 'react-icons/md';

const LandingHero = () => {
  return (
    <section className="relative pt-12 pb-20 px-6 sm:px-10 lg:px-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Fleet Dispatch &amp; Student Safety</span>
          <span className="text-blue-300">|</span>
          <span className="font-normal text-blue-600">v2.4 Telematics Active</span>
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-[1.15]">
          Safe, Verified School Commutes.{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Real-Time Peace of Mind
          </span>{' '}
          for Every Parent.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          The all-in-one school fleet portal. Sub-second GPS vehicle tracking, automated departure &amp; arrival SMS alerts, student boarding verification, and 1-tap SOS distress response.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/25 transition-all hover:shadow-lg cursor-pointer"
          >
            <span>Register Your School</span>
            <MdArrowForward className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <span>Admin Portal Login</span>
          </Link>
        </div>

        {/* Key Feature Micro Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <MdCheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Sub-second Live GPS Tracking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MdCheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Automated Parent SMS Alerts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MdCheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Code-Red SOS Distress Link</span>
          </div>
        </div>

        {/* Interactive Bento Showcase Preview Card (Inspired by Bento & Emitly) */}
        <div id="preview" className="w-full max-w-5xl mt-14 relative">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-4 sm:p-6 text-left relative overflow-hidden">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="ml-3 text-xs font-semibold text-slate-500">
                  SafeRoute Admin Fleet Console • Live Dispatch
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  All 25 Fleets Operating Normally
                </span>
              </div>
            </div>

            {/* Bento Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Telematics Map Mockup (Col-7) */}
              <div className="md:col-span-7 bg-slate-50/70 rounded-2xl p-4 border border-slate-200/70 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                {/* Simulated Road Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="absolute w-full h-1 bg-slate-300 top-1/4 -rotate-6"></div>
                  <div className="absolute w-full h-2 bg-blue-200 top-1/2 rotate-12"></div>
                  <div className="absolute w-2 h-full bg-slate-300 left-1/3 -rotate-12"></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-800">
                      Live Telematics • Bus 12
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                    Speed: 38 km/h
                  </span>
                </div>

                {/* Center Pulse Pin */}
                <div className="relative z-10 flex flex-col items-center justify-center py-6">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-blue-400 opacity-30"></span>
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <MdDirectionsBus size={18} />
                    </div>
                  </div>
                  <div className="mt-2 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg border border-slate-200 shadow-xs text-center">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">
                      Route 1: Green Valley &rarr; Main Campus
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Next Stop: Beaconhouse Crossing (ETA 3 mins)
                    </p>
                  </div>
                </div>

                {/* Bottom Status Ribbon */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                  <span>Driver: <strong>Muhammad Ali</strong></span>
                  <span className="font-semibold text-emerald-600">Geofence Radius: 500m</span>
                </div>
              </div>

              {/* Right Mini Cards (Col-5) */}
              <div className="md:col-span-5 space-y-3 flex flex-col justify-between">
                {/* Micro Stat 1: Student Boarding */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <MdPeople size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Student Manifest</p>
                        <p className="text-[10px] text-slate-500">28 / 30 Students Boarded</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      93% Picked
                    </span>
                  </div>
                </div>

                {/* Micro Stat 2: Instant Alert Feed */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MdNotificationsActive size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        Automated Parent SMS Dispatched
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        &quot;Ayesha Khan boarded Bus 12 at Sector B-1 Stop at 07:42 AM.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Micro Stat 3: SOS Safety */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600/30 text-red-400 flex items-center justify-center">
                      <MdShield size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Emergency Dispatch</p>
                      <p className="text-[10px] text-slate-400">1-Touch Driver Panic Signal</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                    Standby
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
