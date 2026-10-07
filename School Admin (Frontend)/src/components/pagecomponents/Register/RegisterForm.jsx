import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
      const response = await fetch(`${supabaseUrl}/functions/v1/school-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', ...formData })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Registration failed');
      } else {
        onRegister(data.user);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="#" method="POST" onSubmit={handleSubmit} className="w-full space-y-3.5">
      {error && <div className="text-red-500 text-xs text-center font-medium">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* School Name */}
        <div>
          <label htmlFor="schoolName" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">School Name</label>
          <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
            <input
              id="schoolName" name="schoolName" type="text" placeholder="Greenwood High" required
              value={formData.schoolName} onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">Phone Number</label>
          <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
            <input
              id="phone" name="phone" type="text" placeholder="+1 234 567 890" required
              value={formData.phone} onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">Address</label>
        <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
          <input
            id="address" name="address" type="text" placeholder="123 Education Lane, City" required
            value={formData.address} onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">Admin Email Address</label>
        <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
          <input
            id="email" name="email" type="email" placeholder="school@example.com" required
            value={formData.email} onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">Password</label>
          <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
            <input
              id="password" name="password" type="password" placeholder="••••••••" required
              value={formData.password} onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-[12px] font-semibold text-slate-600 mb-1.5 ml-1">Confirm Password</label>
          <div className="relative w-full input-field-shadow rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
            <input
              id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required
              value={formData.confirmPassword} onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Register Button */}
      <div className="pt-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-white text-[14px] font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-blue-500/30 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #0652bb 0%, #4f87e0 100%)' }}
        >
          {loading ? 'Creating account...' : 'Register School'}
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center mt-4 pt-4 border-t border-slate-100">
        <span className="text-[13px] text-slate-500">Already have an account? </span>
        <Link to="/login" className="text-[13px] font-semibold text-[#0652bb] hover:text-blue-800 transition-colors">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
