import LandingHeader from '../components/pagecomponents/Landing/LandingHeader';
import LandingHero from '../components/pagecomponents/Landing/LandingHero';
import LandingFeatures from '../components/pagecomponents/Landing/LandingFeatures';
import LandingAbout from '../components/pagecomponents/Landing/LandingAbout';
import LandingCTA from '../components/pagecomponents/Landing/LandingCTA';
import LandingFooter from '../components/pagecomponents/Landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-800 antialiased">
      {/* Subtle ambient background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-100/60 via-blue-50/25 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-sky-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <LandingHeader />

      <main className="flex-1 flex flex-col relative z-10 w-full">
        <LandingHero />
        <LandingFeatures />
        <LandingAbout />
        <LandingCTA />
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
