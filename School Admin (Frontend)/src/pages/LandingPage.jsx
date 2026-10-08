import LandingHeader from '../components/pagecomponents/Landing/LandingHeader';
import LandingHero from '../components/pagecomponents/Landing/LandingHero';
import LandingFeatures from '../components/pagecomponents/Landing/LandingFeatures';
import LandingAbout from '../components/pagecomponents/Landing/LandingAbout';
import LandingCTA from '../components/pagecomponents/Landing/LandingCTA';
import LandingFooter from '../components/pagecomponents/Landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-[#020813] text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0652bb 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4f87e0 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
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
