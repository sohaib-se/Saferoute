import { FiMapPin, FiBell, FiShield, FiUsers, FiClock, FiActivity } from 'react-icons/fi';

const LandingFeatures = () => {
  const features = [
    {
      icon: <FiMapPin size={24} />,
      color: "blue",
      title: "Live Tracking",
      description: "Real-time GPS broadcast gives parents and admins exact vehicle locations instantly on the map."
    },
    {
      icon: <FiBell size={24} />,
      color: "emerald",
      title: "Smart Notifications",
      description: "Automated alerts for pick-up, drop-off, and proximity to keep parents informed without effort."
    },
    {
      icon: <FiShield size={24} />,
      color: "purple",
      title: "Verified Security",
      description: "School-issued credentials and dedicated SOS features ensure maximum safety during transit."
    },
    {
      icon: <FiUsers size={24} />,
      color: "orange",
      title: "Parent & Driver Apps",
      description: "Dedicated mobile applications for both drivers to broadcast and parents to monitor the journey."
    },
    {
      icon: <FiClock size={24} />,
      color: "rose",
      title: "Route Optimization",
      description: "Smart routing suggestions to minimize travel time and save fuel for school transport fleets."
    },
    {
      icon: <FiActivity size={24} />,
      color: "cyan",
      title: "Admin Dashboard",
      description: "Centralized control panel for school administrators to oversee the entire transport network."
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 relative z-10 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need for Safe Transit</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Powerful features designed to ensure the safety of students and provide peace of mind to parents and administrators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                ${feature.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                ${feature.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                ${feature.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                ${feature.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
                ${feature.color === 'rose' ? 'bg-rose-500/20 text-rose-400' : ''}
                ${feature.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
              `}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
