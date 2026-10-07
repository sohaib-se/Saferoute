const LandingAbout = () => {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative bg-[#0a1122] border border-white/10 rounded-2xl p-2 shadow-2xl">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center relative">
                {/* Mockup or Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-[#020813] z-10" />
                <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" />
                <div className="absolute z-20 text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/50 mb-4 transform -rotate-6">
                    <span className="text-3xl font-bold text-white">S</span>
                  </div>
                  <div className="text-blue-100 font-medium bg-blue-950/80 px-4 py-2 rounded-full border border-blue-500/30 backdrop-blur-sm">System Overview Dashboard</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              About SafeRoute
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Bridging the gap between schools and parents.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              SafeRoute was built with a singular mission: to ensure every child's journey to and from school is safe, transparent, and stress-free. We provide schools with the tools they need to manage fleets efficiently, while giving parents the visibility they deserve.
            </p>
            
            <ul className="space-y-4 pt-4">
              {['Real-time visibility for peace of mind', 'Reduced administrative overhead for schools', 'Streamlined communication during transit'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
