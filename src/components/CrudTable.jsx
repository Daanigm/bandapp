import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Modal from "./Modal";

export default function CrudTable({
  title,
  items,
  columns,
  formFields,
  onAdd,
  onUpdate,
  onDelete,
  renderStatus,
}) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = items.filter((item) =>
    columns.some((col) =>
      String(item[col.key] ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

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
      onUpdate(editing.id, form);
    } else {
      onAdd(form);
    }
    setModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">{title}</h2>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-[var(--color-border)]">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-4 py-3 font-semibold text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 font-semibold text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-12 text-gray-400">
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-gray-50/50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                        {col.key === "status" && renderStatus
                          ? renderStatus(item[col.key])
                          : col.key === "color"
                          ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: item[col.key] }} />
                              <span className="text-xs text-gray-500">{item[col.key]}</span>
                            </div>
                          )
                          : item[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick="() => setDeleteConfirm(item.id)"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50/50 border-t border-[var(--color-border)] text-xs text-gray-500">
          {filtered.length} de {items.length} registros
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose="() => setModalOpen(false)"
        title={editing ? "Editar Registro" : "Agregar Registro"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.type === "select" ? (
                <select
                  value={form[f.key] || ""}
                  onChange="(e) => setForm({ ...form, [f.key]: e.target.value })"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  required={f.required}
                >
                  <option value="">Seleccionar...</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  value={form[f.key] || ""}
                  onChange="(e) => setForm({ ...form, [f.key]: e.target.value })"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  rows={3}
                  required={f.required}
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.key] || ""}
                  onChange="(e) => setForm({ ...form, [f.key]: e.target.value })"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  required={f.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick="() => setModalOpen(false)"
              className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] font-medium"
            >
              {editing ? "Guardar Cambios" : "Agregar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        open={deleteConfirm !== null}
        onClose="() => setDeleteConfirm(null)"
        title="Confirmar Eliminación"
        width="max-w-sm"
      >
        <p className="text-sm text-gray-600 mb-5">
          ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick="() => setDeleteConfirm(null)"
            className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick="() => { onDelete(deleteConfirm); setDeleteConfirm(null); }"
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
