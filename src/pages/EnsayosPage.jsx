import { useState } from "react";
import { Plus, Clock, MapPin, Users, CalendarDays, FileText, Pencil, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";

const typeColors = {
  General: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Seccional: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Marcha: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

const formFields = [
  { key: "title", label: "Título", required: true },
  { key: "date", label: "Fecha", type: "date", required: true },
  { key: "time", label: "Hora", type: "time", required: true },
  { key: "duration", label: "Duración", required: true, defaultValue: "2h" },
  { key: "location", label: "Ubicación", required: true },
  { key: "type", label: "Tipo", type: "select", options: ["General", "Seccional", "Marcha"], required: true, defaultValue: "General" },
  { key: "attendees", label: "Asistentes esperados", type: "number", defaultValue: 40 },
  { key: "notes", label: "Notas", type: "textarea" },
];

export default function EnsayosPage() {
  const { rehearsals, addItem, updateItem, deleteItem } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const sorted = [...rehearsals].sort((a, b) => new Date(a.date) - new Date(b.date));

  const openAdd = () => {
    setEditing(null);
    const blank = {};
    formFields.forEach((f) => (blank[f.key] = f.defaultValue ?? ""));
    setForm(blank);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const populated = {};
    formFields.forEach((f) => (populated[f.key] = item[f.key] ?? ""));
    setForm(populated);
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      updateItem("rehearsals", editing.id, { ...form, attendees: Number(form.attendees) });
    } else {
      addItem("rehearsals", { ...form, attendees: Number(form.attendees) });
    }
    setModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Ensayos</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Programar</span>
        </button>
      </div>

      <div className="grid gap-3">
        {sorted.map((r) => {
          const d = new Date(r.date + "T00:00:00");
          const dayName = d.toLocaleDateString("es-ES", { weekday: "long" });
          const dateStr = d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
          const tc = typeColors[r.type] || typeColors.General;
          const isPast = d < new Date(new Date().toDateString());

          return (
            <div
              key={r.id}
              className={`bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-4 hover:shadow-md transition-shadow ${isPast ? "opacity-60" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Date block */}
                <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/5 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-[var(--color-primary)] leading-none">{d.getDate()}</span>
                  <span className="text-[10px] uppercase font-semibold text-[var(--color-primary)]/60 mt-0.5">
                    {d.toLocaleDateString("es-ES", { month: "short" })}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text)]">{r.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] capitalize">{dayName}, {dateStr}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${tc.bg} ${tc.text} ${tc.border}`}>
                      {r.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.time} · {r.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{r.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{r.attendees} personas</span>
                  </div>

                  {r.notes && (
                    <p className="mt-2 text-xs text-gray-400 flex items-start gap-1">
                      <FileText className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {r.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Ensayo" : "Programar Ensayo"}>
        <form onSubmit={handleSave} className="space-y-4">
          {formFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.type === "select" ? (
                <select
                  value={form[f.key] || ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  required={f.required}
                >
                  <option value="">Seleccionar...</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  value={form[f.key] || ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  rows={3}
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.key] || ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  required={f.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] font-medium">
              {editing ? "Guardar" : "Programar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Confirmar Eliminación" width="max-w-sm">
        <p className="text-sm text-gray-600 mb-5">¿Estás seguro de que deseas eliminar este ensayo?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] hover:bg-gray-50">Cancelar</button>
          <button onClick={() => { deleteItem("rehearsals", deleteConfirm); setDeleteConfirm(null); }} className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium">Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
