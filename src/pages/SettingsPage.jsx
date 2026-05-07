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
        {/* Band Identity */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-text)] mb-4">Identidad de la Banda</h3>

          {/* Logo */}
          <div className="flex items-center gap-5 mb-5">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center cursor-pointer hover:ring-4 hover:ring-[var(--color-accent)]/30 transition-all overflow-hidden group relative"
            >
              {logoUrl ? (
                <>
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-8 h-8 text-[var(--color-primary-dark)]" />
                  <span className="text-[9px] text-[var(--color-primary-dark)]/60 font-medium">Cambiar</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Escudo / Logo</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Clic en la imagen para cambiar</p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG o SVG. Máx 2MB</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logoUrl && (
                <button
                  onClick={() => setLogoUrl(null)}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Eliminar logo
                </button>
              )}
            </div>
          </div>

          {/* Band Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Banda</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
              placeholder="Nombre de tu banda"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-text)] mb-3">Información del Sistema</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Versión</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Licencia</p>
              <p className="font-medium">Demo</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Última sesión</p>
              <p className="font-medium">{new Date().toLocaleDateString("es-ES")}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Usuario</p>
              <p className="font-medium">Administrador</p>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="p-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Guardado
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
