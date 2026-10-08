import { FiMapPin, FiBell, FiShield } from 'react-icons/fi';

const LandingHero = () => {
  return (
    <section className="flex flex-col items-center justify-center relative z-10 px-6 sm:px-12 lg:px-24 py-20 min-h-[80vh]">
      <div className="max-w-5xl mx-auto text-center space-y-8 mt-[-40px]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
           <span className="text-sm text-slate-300 font-medium">Next-Gen School Transport Security</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 leading-[1.1]">
          Secure, Track, and <br className="hidden sm:block" /> Deliver Peace of Mind.
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate school transport tracking platform. Real-time GPS visibility, automated notifications, and centralized control for schools, drivers, and parents.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/40">
            Get Started for Your School
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-semibold backdrop-blur-md transition-all duration-300">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
