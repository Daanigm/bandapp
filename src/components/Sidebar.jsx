import { useState } from "react";
import { LayoutDashboard, Music, Shirt, Calendar, Warehouse, Settings, LogOut, Menu, X, Shield, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "instrumentos", label: "Instrumentos", icon: Music },
  { id: "uniformes", label: "Uniformes", icon: Shirt },
  { id: "ensayos", label: "Ensayos", icon: Calendar },
  { id: "almacen", label: "Almacén", icon: Warehouse },
  { id: "settings", label: "Configuración", icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bandName, logoUrl, logout } = useApp();
  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };
  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--color-primary)] text-white">
      <div className="p-5 border-b border-white/10">
        <h1 className="text-sm font-bold">{bandName}</h1>
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => handleNav(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${currentPage === id ? "bg-white/15" : ""}`}>
            <Icon className="w-[18px] h-[18px]" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-white/70 hover:text-white">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-[var(--color-primary)] text-white rounded-lg">
        <Menu className="w-5 h-5" />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full">{sidebarContent}</div>
        </div>
      )}
      <aside className="hidden lg:block w-60 h-screen fixed left-0 top-0 z-40">{sidebarContent}</aside>
    </>
  );
}