import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Calling the Supabase Edge Function (Cloud or Local)
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
      const response = await fetch(`${supabaseUrl}/functions/v1/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: identifier,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid email or password');
      } else {
        // We successfully logged in via the centralized backend
        onLogin(data.user);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={handleSubmit}
      className="w-full space-y-3.5"
    >
      {error && <div className="text-red-500 text-xs text-center font-medium">{error}</div>}
      {/* Label + Input: Email or Phone */}
      <div>
        <label htmlFor="identifier" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">
          Email or Phone Number
        </label>
        <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="admin@school.com"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Label + Input: Password */}
      <div>
        <label htmlFor="password" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">
          Password
        </label>
        <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Remember me + Forgot Password */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded border-slate-300 text-[#0652bb] focus:ring-[#0652bb] focus:ring-offset-0"
          />
          <span className="text-[12px] text-slate-500">Remember me</span>
        </label>
        <a href="#" className="text-[12px] font-semibold text-[#0652bb] hover:text-blue-800 transition-colors">
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-white text-[14px] font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-blue-500/30 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #0652bb 0%, #4f87e0 100%)' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
