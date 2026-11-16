import safeRouteLogo from '../../../assets/logo.png';

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6 text-center">
      {/* Brand Icon + Name */}
      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm mb-3.5 p-2 overflow-hidden">
        <img src={safeRouteLogo} alt="SafeRoute Logo" className="w-full h-full object-contain" />
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-base font-bold text-slate-900 tracking-tight">SafeRoute</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
          Admin Portal
        </span>
      </div>

      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
        Welcome Back
      </h1>
      <p className="text-xs text-slate-500 mt-1">
        Sign in to your school fleet management portal
      </p>
    </div>
  );
};

export default LoginHeader;
