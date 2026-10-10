import { Link } from 'react-router-dom';
import { MdDirectionsBus, MdArrowForward } from 'react-icons/md';

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
        {/* SafeRoute Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <MdDirectionsBus size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 tracking-tight leading-none">
                SafeRoute
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                School Transport
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Fleet &amp; Student Safety
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Platform Features
          </a>
          <a href="#preview" className="hover:text-blue-600 transition-colors">
            Live Telematics
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About SafeRoute
          </a>
          <a href="#security" className="hover:text-blue-600 transition-colors">
            SOS Security
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 rounded-xl transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-blue-500/20 transition-all hover:shadow-md cursor-pointer"
          >
            <span>Register School</span>
            <MdArrowForward className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
