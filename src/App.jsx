import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InstrumentosPage from "./pages/InstrumentosPage";
import UniformesPage from "./pages/UniformesPage";
import EnsayosPage from "./pages/EnsayosPage";
import AlmacenPage from "./pages/AlmacenPage";
import SettingsPage from "./pages/SettingsPage";

const pages = {
  dashboard: DashboardPage,
  instrumentos: InstrumentosPage,
  uniformes: UniformesPage,
  ensayos: EnsayosPage,
  almacen: AlmacenPage,
  settings: SettingsPage,
};

function AppContent() {
  const { isAuthenticated } = useApp();
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!isAuthenticated) return <LoginPage />;

  const PageComponent = pages[currentPage] || DashboardPage;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 pt-14 lg:pt-8">
          <PageComponent onNavigate={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
