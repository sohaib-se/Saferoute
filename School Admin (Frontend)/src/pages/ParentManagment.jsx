import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import ParentStatCards from '../components/pagecomponents/ParentManagement/ParentStatCards';
import ParentsTableSection from '../components/pagecomponents/ParentManagement/ParentsTableSection';
import ParentManagementFooter from '../components/pagecomponents/ParentManagement/ParentManagementFooter';
import AddParentModal from '../components/pagecomponents/ParentManagement/AddParentModal';
import EditParentModal from '../components/pagecomponents/ParentManagement/EditParentModal';
import ParentDetailsModal from '../components/pagecomponents/ParentManagement/ParentDetailsModal';
import AppCredentialsModal from '../components/common/AppCredentialsModal';
import { getParents, addParent, updateParent, deleteParent } from '../services/parentsService';
import { getStudents } from '../services/studentsService';

const ParentManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Parents',
  parents: externalParents,
  students: externalStudents,
  onRefreshStudents,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedParentForCreds, setSelectedParentForCreds] = useState(null);
  const [isCredsModalOpen, setIsCredsModalOpen] = useState(false);
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState(externalStudents || []);
  const [loading, setLoading] = useState(!externalParents);
  const [error, setError] = useState(null);

  const fetchParentsList = useCallback(async () => {
    if (externalParents) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getParents();
      setParents(data);
    } catch (err) {
      console.error('Error fetching parents:', err);
      setError(err.message || 'Failed to fetch parents from database');
    } finally {
      setLoading(false);
    }
  }, [externalParents]);

  useEffect(() => {
    fetchParentsList();
  }, [fetchParentsList]);

  // Sync or fetch students for child-linking
  useEffect(() => {
    if (externalStudents && externalStudents.length > 0) {
      setStudents(externalStudents);
      return;
    }

    const loadStudents = async () => {
      try {
        const studentData = await getStudents();
        if (studentData && studentData.length > 0) {
          setStudents(studentData);
        }
      } catch (err) {
        console.warn('Could not load students for linking:', err);
      }
    };

    loadStudents();
  }, [externalStudents]);

  const parentsList = externalParents || parents;

  const handleAddParent = async (newParent) => {
    try {
      await addParent(newParent);
      await fetchParentsList();
      if (onRefreshStudents) {
        onRefreshStudents();
      }
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to create parent in database:', err);
      // Fallback local addition for offline / demo mode
      setParents((prev) => [
        {
          ...newParent,
          id: `parent-${Date.now()}`,
          num: prev.length + 1,
        },
        ...prev,
      ]);
      setIsAddModalOpen(false);
    }
  };

  const handleViewParent = (parent) => {
    setSelectedParent(parent);
    setIsDetailsModalOpen(true);
  };

  const handleEditParent = (parent) => {
    setSelectedParent(parent);
    setIsEditModalOpen(true);
  };

  const handleUpdateParent = async (updatedParent) => {
    try {
      if (updatedParent.id) {
        await updateParent(updatedParent.id, updatedParent);
        await fetchParentsList();
        if (onRefreshStudents) {
          onRefreshStudents();
        }
      }
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update parent in database:', err);
      setParents((prev) =>
        prev.map((p) => (p.id === updatedParent.id ? { ...p, ...updatedParent } : p))
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteParent = async (parent) => {
    if (
      !window.confirm(
        `Are you sure you want to delete guardian "${parent.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      if (parent.id) {
        await deleteParent(parent.id);
        await fetchParentsList();
      }
    } catch (err) {
      console.error('Failed to delete parent:', err);
      // Fallback local deletion
      setParents((prev) => prev.filter((p) => p.id !== parent.id));
    }
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
          <ParentStatCards
            stats={
              parentsList.length > 0
                ? {
                    totalParents: parentsList.length,
                    activePupils: parentsList.reduce(
                      (acc, p) => acc + (p.children?.length || 0),
                      0
                    ),
                  }
                : undefined
            }
          />

          <ParentsTableSection
            onAddParentClick={() => setIsAddModalOpen(true)}
            parentsList={parentsList}
            isLoading={loading}
            onViewCredentials={(parent) => {
              setSelectedParentForCreds(parent);
              setIsCredsModalOpen(true);
            }}
            onViewParent={handleViewParent}
            onEditParent={handleEditParent}
            onDeleteParent={handleDeleteParent}
          />

          <div className="h-4"></div>
        </main>

        <ParentManagementFooter />
      </div>

      <AddParentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddParent={handleAddParent}
        availableStudents={students}
      />

      <EditParentModal
        parent={selectedParent}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateParent={handleUpdateParent}
        availableStudents={students}
      />

      <ParentDetailsModal
        parent={selectedParent}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEditClick={(parent) => {
          setIsDetailsModalOpen(false);
          handleEditParent(parent);
        }}
      />

      <AppCredentialsModal
        isOpen={isCredsModalOpen}
        onClose={() => setIsCredsModalOpen(false)}
        entity={selectedParentForCreds}
        userType="parent"
      />
    </div>
  );
};

export default ParentManagment;
