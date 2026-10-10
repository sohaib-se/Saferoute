import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import ParentStatCards from '../components/pagecomponents/ParentManagement/ParentStatCards';
import ParentsTableSection from '../components/pagecomponents/ParentManagement/ParentsTableSection';
import ParentManagementFooter from '../components/pagecomponents/ParentManagement/ParentManagementFooter';
import AddParentModal from '../components/pagecomponents/ParentManagement/AddParentModal';

const initialParentsList = [
  {
    num: 1,
    initials: 'SA',
    avatarBg: 'bg-blue-100 text-blue-600',
    name: 'Sana Ahmed',
    email: 'sana.ahmed@example.com',
    phone: '+92 300 1234567',
    children: [
      { name: 'Ayesha Khan', grade: 'Grade 5' },
      { name: 'Zoya Malik', grade: 'Grade 5' },
    ],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
  {
    num: 2,
    initials: 'AR',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 312 9876543',
    children: [{ name: 'Muhammad Ali', grade: 'Grade 6' }],
    route: 'Route 2 (Model Town)',
    bus: 'Bus 07',
    status: 'Active',
  },
  {
    num: 3,
    initials: 'FK',
    avatarBg: 'bg-purple-100 text-purple-600',
    name: 'Fatima Khan',
    email: 'fatima.k@example.com',
    phone: '+92 321 7654321',
    children: [
      { name: 'Sara Khan', grade: 'Grade 7' },
      { name: 'Hamza Khan', grade: 'Grade 3' },
    ],
    route: 'Route 3 (University)',
    bus: 'Bus 09',
    status: 'Active',
  },
  {
    num: 4,
    initials: 'US',
    avatarBg: 'bg-amber-100 text-amber-600',
    name: 'Usman Shah',
    email: 'usman.shah@example.com',
    phone: '+92 345 1112233',
    children: [{ name: 'Hassan Ali', grade: 'Grade 5' }],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
  {
    num: 5,
    initials: 'AM',
    avatarBg: 'bg-rose-100 text-rose-600',
    name: 'Ayesha Malik',
    email: 'ayesha.m@example.com',
    phone: '+92 301 4567890',
    children: [
      { name: 'Fatima Noor', grade: 'Grade 6' },
      { name: 'Bilal Noor', grade: 'Grade 4' },
    ],
    route: 'Route 2 (Model Town)',
    bus: 'Bus 15',
    status: 'Active',
  },
  {
    num: 6,
    initials: 'TA',
    avatarBg: 'bg-teal-100 text-teal-600',
    name: 'Tariq Ahmed',
    email: 'tariq.a@example.com',
    phone: '+92 333 5566778',
    children: [{ name: 'Bilal Ahmed', grade: 'Grade 7' }],
    route: 'Route 4 (Johar Town)',
    bus: 'Bus 18',
    status: 'Active',
  },
  {
    num: 7,
    initials: 'RN',
    avatarBg: 'bg-orange-100 text-orange-600',
    name: 'Rashid Nadeem',
    email: 'r.nadeem@example.com',
    phone: '+92 305 8899001',
    children: [{ name: 'Hamza Tariq', grade: 'Grade 8' }],
    route: 'Route 5 (Canal Road)',
    bus: 'Bus 05',
    status: 'Pending',
  },
  {
    num: 8,
    initials: 'ZH',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    name: 'Zainab Hassan',
    email: 'zainab.h@example.com',
    phone: '+92 344 2233445',
    children: [{ name: 'Omer Hassan', grade: 'Grade 4' }],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
];

const ParentManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Parents',
  parents: externalParents,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [parents, setParents] = useState(initialParentsList);

  const parentsList = externalParents || parents;

  const handleAddParent = (newParent) => {
    setParents((prev) => [
      ...prev,
      {
        ...newParent,
        num: prev.length + 1,
      },
    ]);
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 font-sans antialiased overflow-hidden">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        <main className="p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
          <ParentStatCards />

          <ParentsTableSection
            onAddParentClick={() => setIsAddModalOpen(true)}
            parentsList={parentsList}
          />

          <div className="h-4"></div>
        </main>

        <ParentManagementFooter />
      </div>

      <AddParentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddParent={handleAddParent}
      />
    </div>
  );
};

export default ParentManagment;
