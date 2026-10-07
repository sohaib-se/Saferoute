import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

const LandingHeader = () => {
  return (
    <header className="w-full relative z-50 py-6 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
            <span className="text-white font-bold text-xl tracking-tighter">S</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            SafeRoute
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-slate-200 backdrop-blur-md transition-colors duration-300 cursor-not-allowed opacity-80"
            title="Coming Soon"
          >
            <FiDownload size={16} />
            <span>Download App</span>
          </button>
          
          <Link 
            to="/login"
            className="px-6 py-2.5 bg-white text-[#060d1f] hover:bg-blue-50 rounded-xl text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
