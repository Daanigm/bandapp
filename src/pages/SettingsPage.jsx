import { useState, useRef } from "react";
import { Shield, Upload, Save, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { bandName, setBandName, logoUrl, setLogoUrl } = useApp();
  const [name, setName] = useState(bandName);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setBandName(name.trim() || bandName);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-5">Configuración</h2>
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-text)] mb-4">Identidad de la Banda</h3>
          <div className="flex items-center gap-5 mb-5">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center cursor-pointer hover:ring-4 hover:ring-[var(--color-accent)]/30 transition-all overflow-hidden group relative"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Shield className="w-8 h-8 text-[var(--color-primary-dark)]" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Escudo / Logo</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Banda</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm" />
          </div>
        </div>
        <div className="p-6 flex justify-end">
          <button onClick={handleSave} className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg">
            {saved ? "Guardado" : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}