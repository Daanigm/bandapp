import { createContext, useContext, useState, useCallback } from "react";
import {
  initialInstruments,
  initialUniforms,
  initialRehearsals,
  initialInventory,
} from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bandName, setBandName] = useState("Banda Municipal de Santa Cecilia");
  const [logoUrl, setLogoUrl] = useState(null);
  const [instruments, setInstruments] = useState(initialInstruments);
  const [uniforms, setUniforms] = useState(initialUniforms);
  const [rehearsals, setRehearsals] = useState(initialRehearsals);
  const [inventory, setInventory] = useState(initialInventory);

  const login = useCallback((user, pass) => {
    if (user === "admin" && pass === "banda2026") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  const addItem = useCallback((collection, item) => {
    const setters = { instruments: setInstruments, uniforms: setUniforms, rehearsals: setRehearsals, inventory: setInventory };
    const setter = setters[collection];
    if (setter) setter((prev) => [...prev, { ...item, id: Date.now() }]);
  }, []);

  const updateItem = useCallback((collection, id, updates) => {
    const setters = { instruments: setInstruments, uniforms: setUniforms, rehearsals: setRehearsals, inventory: setInventory };
    const setter = setters[collection];
    if (setter) setter((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  }, []);

  const deleteItem = useCallback((collection, id) => {
    const setters = { instruments: setInstruments, uniforms: setUniforms, rehearsals: setRehearsals, inventory: setInventory };
    const setter = setters[collection];
    if (setter) setter((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated, login, logout,
        bandName, setBandName, logoUrl, setLogoUrl,
        instruments, uniforms, rehearsals, inventory,
        addItem, updateItem, deleteItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
