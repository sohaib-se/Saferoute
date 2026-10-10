import { MdShield } from 'react-icons/md';

const LoginFooter = () => {
  return (
    <footer className="w-full text-center pt-5 space-y-2 select-none" data-purpose="page-footer">
      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
        <MdShield className="w-3.5 h-3.5 text-slate-400" />
        <span>End-to-End Encrypted School Fleet Portal</span>
      </div>
      <p className="text-[11px] text-slate-400">
        © 2026 SafeRoute Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default LoginFooter;
