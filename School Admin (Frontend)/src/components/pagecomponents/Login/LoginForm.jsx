import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail, MdLock, MdErrorOutline, MdArrowForward } from 'react-icons/md';

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
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
      const response = await fetch(`${supabaseUrl}/functions/v1/school-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'login',
          email: identifier,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid email or password');
      } else {
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
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
          <MdErrorOutline className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email / Phone Field */}
      <div>
        <label htmlFor="identifier" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Email or Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MdEmail className="w-4 h-4" />
          </div>
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="admin@school.edu"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MdLock className="w-4 h-4" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Remember me & Forgot Password */}
      <div className="flex items-center justify-between text-xs pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remember me</span>
        </label>
        <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl shadow-xs shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          {!loading && <MdArrowForward className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Register Link */}
      <div className="text-center pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">Need a portal account? </span>
        <Link to="/register" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Register your school
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
