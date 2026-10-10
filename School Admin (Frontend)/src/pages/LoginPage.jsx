import LoginHeader from '../components/pagecomponents/Login/LoginHeader';
import LoginForm from '../components/pagecomponents/Login/LoginForm';
import LoginFooter from '../components/pagecomponents/Login/LoginFooter';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden font-sans p-4 antialiased">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Login Card */}
      <div className="relative w-full max-w-[420px] mx-auto z-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-8 py-8">
          <LoginHeader />
          <LoginForm onLogin={onLogin} />
        </div>

        {/* Footer */}
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;
