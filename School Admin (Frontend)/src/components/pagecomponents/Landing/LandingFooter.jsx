import { Link } from 'react-router-dom';
import { MdDirectionsBus } from 'react-icons/md';

const LandingFooter = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white pt-16 pb-8 px-6 sm:px-10 lg:px-12 text-slate-600">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand info (Col-2) */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                <MdDirectionsBus size={20} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">
                  SafeRoute
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                  School Fleet Portal
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Enterprise fleet telematics and verified student transit management. Delivering continuous real-time transparency to schools, drivers, and parents.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Telematics Satellite Relays 100% Operational</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Live GPS Telematics</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Parent SMS Engine</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Driver SOS Panic Link</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Attendance Manifests</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Geofence Safe Zones</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/register" className="hover:text-blue-600 transition-colors">For K-12 Campuses</Link></li>
              <li><Link to="/register" className="hover:text-blue-600 transition-colors">For District Fleets</Link></li>
              <li><Link to="/register" className="hover:text-blue-600 transition-colors">For Private Academies</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 transition-colors">Driver Mobile Portal</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 transition-colors">Parent Guardian Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Security &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Child Privacy Shield</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">FERPA / COPPA Compliance</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">System Uptime SLA</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security Incident Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} SafeRoute Telematics Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0 font-medium">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-700 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
