const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      {/* Brand + Icon */}
      <div className="flex items-center gap-2.5 mb-6">
        {/* Gradient icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0652bb 0%, #4f87e0 100%)' }}
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-10-7h11V6.5h-11V10z" />
          </svg>
        </div>
        {/* Brand name */}
        <span
          className="text-[20px] font-extrabold tracking-tight"
          style={{ background: 'linear-gradient(135deg, #0652bb, #4f87e0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          SafeRoute
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-100 mb-6" />

      {/* Heading & Subtitle */}
      <h1 className="text-[22px] font-extrabold text-[#0F172A] tracking-tight text-center mb-1">
        Register School
      </h1>
      <p className="text-[13px] text-slate-500 text-center">
        Create your school account to get started.
      </p>
    </div>
  );
};

export default RegisterHeader;
