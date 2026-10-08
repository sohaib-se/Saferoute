const LandingCTA = () => {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 relative z-10">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-xl" />
        <div className="relative bg-gradient-to-br from-[#0a1122] to-[#0d162d] border border-white/10 rounded-3xl p-8 sm:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold text-white">Ready to secure your school's transit?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join the growing number of schools upgrading to SafeRoute. Provide parents with peace of mind and simplify your transport management today.
            </p>
            <div className="pt-6">
              <button className="px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 rounded-2xl font-bold text-lg shadow-xl shadow-white/10 transition-all duration-300 hover:-translate-y-1">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
