import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import HomePage from '@/pages/HomePage.jsx';
import FindDoctorsPage from '@/pages/FindDoctorsPage';
import DoctorDetailsPage from '@/pages/DoctorDetailsPage';
import FindMedicinesPage from '@/pages/FindMedicinesPage';
import MedicineDetailsPage from '@/pages/MedicineDetailsPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import ContactPage from '@/pages/ContactPage';
import SymptomCheckerPage from '@/pages/SymptomCheckerPage';
import UserProfilePage from '@/pages/UserProfilePage.jsx'; // Added import
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider, useUser } from './contexts/UserContext.jsx';
import LoginModal from '@/components/auth/LoginModal';
import HealthDetailsModal from '@/components/auth/HealthDetailsModal.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUser();
  // Modals are now primarily handled in AppContent for explicit triggers
  // and initial load logic by ProtectedRoute itself.

  useEffect(() => {
    // This effect could potentially trigger modals if needed based on user state
    // but the primary gating logic is below.
  }, [user, isLoading]);
  
  const handleLoginSuccess = () => {
    // Logic to potentially open HealthDetailsModal after login
    // This will be handled by AppContent's state transitions
  };

  const handleHealthDetailsClose = () => {
    // Logic for closing health details modal
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading application...</p>
      </div>
    );
  }

  // If no user, show LoginModal (non-dismissable version)
  if (!user) {
    return (
      <>
        <LoginModal 
          isOpen={true} 
          onOpenChange={() => {}} // Non-dismissable, so no change handler needed here
          onLoginSuccess={handleLoginSuccess} // This will be chained in AppContent
          isDismissable={false}
        />
         {/* Render children hidden to keep structure, but not visible/interactive */}
         <div className="opacity-0 pointer-events-none">
          {children}
        </div>
      </>
    );
  }
  
  // If user exists but health details not provided/skipped, show HealthDetailsModal
  if (user && !user.healthDetailsProvided) {
     return (
      <>
        <HealthDetailsModal 
          isOpen={true} 
          onOpenChange={handleHealthDetailsClose} // This will be chained in AppContent
        />
        {/* Render children with reduced opacity, not interactive yet */}
        <div className="opacity-50 pointer-events-none">
            {children}
        </div>
      </>
    );
  }

  // If user exists and health details provided/skipped, render children
  return children;
};


const AppContent = () => {
  const { user, isLoading, openLoginModal, isLoginModalExplicitlyOpened, setIsLoginModalExplicitlyOpened, closeLoginModal } = useUser();
  const [isLoginModalOpenForNavbar, setIsLoginModalOpenForNavbar] = useState(false);
  const [isHealthModalOpenAfterLogin, setIsHealthModalOpenAfterLogin] = useState(false);

  useEffect(() => {
    // Handle explicit modal opening from Navbar
    if (openLoginModal && !user) {
      setIsLoginModalOpenForNavbar(true);
    } else {
      setIsLoginModalOpenForNavbar(false);
    }
  }, [openLoginModal, user]);
  
  useEffect(() => {
    // If user is loaded, logged in, but health details are pending, AND no explicit login modal is open
    if (!isLoading && user && !user.healthDetailsProvided && !isLoginModalExplicitlyOpened) {
      setIsHealthModalOpenAfterLogin(true);
    } else {
      setIsHealthModalOpenAfterLogin(false);
    }
  }, [user, isLoading, isLoginModalExplicitlyOpened]);


  const handleLoginSuccessForNavbarModal = () => {
    setIsLoginModalOpenForNavbar(false);
    setIsLoginModalExplicitlyOpened(false); 
    if (user && !user.healthDetailsProvided) {
      setIsHealthModalOpenAfterLogin(true);
    }
  };
  
  const handleLoginModalCloseForNavbar = () => {
    setIsLoginModalOpenForNavbar(false);
    setIsLoginModalExplicitlyOpened(false);
    closeLoginModal(); // Update context state
  }

  const handleHealthDetailsModalClose = () => {
    setIsHealthModalOpenAfterLogin(false);
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
          <Route path="/find-doctors" element={<ProtectedRoute><FindDoctorsPage /></ProtectedRoute>} />
          <Route path="/doctors/:id" element={<ProtectedRoute><DoctorDetailsPage /></ProtectedRoute>} />
          <Route path="/find-medicines" element={<ProtectedRoute><FindMedicinesPage /></ProtectedRoute>} />
          <Route path="/medicines/:id" element={<ProtectedRoute><MedicineDetailsPage /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/symptom-checker" element={<ProtectedRoute><SymptomCheckerPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      
      {/* LoginModal specifically for Navbar trigger (dismissable) */}
      {isLoginModalOpenForNavbar && !user && (
          <LoginModal 
            isOpen={isLoginModalOpenForNavbar} 
            onOpenChange={handleLoginModalCloseForNavbar} 
            onLoginSuccess={handleLoginSuccessForNavbarModal}
            isDismissable={true} 
          />
      )}
      
      {/* HealthDetailsModal triggered after any login if needed, or on initial load by ProtectedRoute */}
      {isHealthModalOpenAfterLogin && user && !user.healthDetailsProvided && (
        <HealthDetailsModal 
          isOpen={isHealthModalOpenAfterLogin} 
          onOpenChange={handleHealthDetailsModalClose} 
        />
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;