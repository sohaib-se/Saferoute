import {
  MdLocationOn,
  MdNotificationsActive,
  MdWarning,
  MdPeople,
  MdRadar,
  MdAltRoute,
} from 'react-icons/md';

const LandingFeatures = () => {
  const features = [
    {
      icon: <MdLocationOn size={22} />,
      badgeBg: 'bg-blue-50 text-blue-600 border-blue-100',
      title: 'Sub-Second Live GPS Radar',
      description:
        'Continuous telematics tracking with high-precision GPS coordinates, live vehicle speed monitoring, and real-time transit telemetry.',
      tag: 'Real-Time Telemetry',
    },
    {
      icon: <MdNotificationsActive size={22} />,
      badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      title: 'Automated Parent Alerts',
      description:
        'Instant automated SMS and push notifications sent to guardians when the bus departs, arrives at stops, or completes drop-off.',
      tag: 'Zero-Effort Push/SMS',
    },
    {
      icon: <MdWarning size={22} />,
      badgeBg: 'bg-rose-50 text-rose-600 border-rose-100',
      title: 'Dispatcher Code-Red SOS',
      description:
        'Dedicated driver emergency panic triggers that instantly alert dispatch supervisors, stream cabin audio, and deploy emergency links.',
      tag: 'Critical Safety',
    },
    {
      icon: <MdPeople size={22} />,
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-100',
      title: 'Verified Student Manifest',
      description:
        'Eliminate transit uncertainty with digital passenger manifests, attendance rosters, and bus pass verification for every stop.',
      tag: 'Passenger Security',
    },
    {
      icon: <MdRadar size={22} />,
      badgeBg: 'bg-amber-50 text-amber-600 border-amber-100',
      title: 'Smart Geofence Safe Zones',
      description:
        'Automated 500m proximity perimeters around student homes and schools so parents never wait unnecessarily in extreme weather.',
      tag: 'Proximity Sensors',
    },
    {
      icon: <MdAltRoute size={22} />,
      badgeBg: 'bg-teal-50 text-teal-600 border-teal-100',
      title: 'Route Fleet Optimization',
      description:
        'Centralized assignment of buses, assigned drivers, and schedules to reduce transit duration and optimize fuel efficiency.',
      tag: 'Fleet Efficiency',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 sm:px-10 lg:px-12 bg-white border-y border-slate-200/80">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold uppercase tracking-wider mb-3">
            Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Built for Complete School Fleet Security
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Engineered to give school administrators complete operational control while delivering complete transparency to families.
          </p>
        </div>

        {/* Feature Cards Grid (Inspired by Bento & Buffer) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC]/60 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feature.badgeBg}`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                <span>Learn more details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
