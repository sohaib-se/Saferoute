import RegisterHeader from '../components/pagecomponents/Register/RegisterHeader';
import RegisterForm from '../components/pagecomponents/Register/RegisterForm';
import LoginFooter from '../components/pagecomponents/Login/LoginFooter';

const RegisterPage = ({ onRegister }) => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden dot-grid py-12"
      style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0a1a3e 40%, #0d2260 70%, #061228 100%)' }}
    >
      {/* Decorative glowing orbs */}
      <div
        className="orb-pulse absolute top-[-8%] left-[-6%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,82,187,0.45) 0%, transparent 70%)' }}
      />
      <div
        className="orb-pulse-slow absolute bottom-[-10%] right-[-6%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,135,224,0.35) 0%, transparent 70%)' }}
      />
      <div
        className="orb-pulse absolute top-[50%] right-[5%] w-[220px] h-[220px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,82,187,0.2) 0%, transparent 70%)' }}
      />

      {/* Centered Register Card */}
      <div className="relative w-full max-w-[500px] mx-4 z-10 my-auto">
        {/* Glow ring behind card */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl opacity-30 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #0652bb, #4f87e0)' }}
        />

        {/* Card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-8 border border-white/20">
          <RegisterHeader />
          <RegisterForm onRegister={onRegister} />
        </div>

        {/* Footer below card */}
        <LoginFooter />
      </div>
    </div>
  );
};

export default RegisterPage;
