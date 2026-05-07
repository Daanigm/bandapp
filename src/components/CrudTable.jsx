import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Modal from "./Modal";

export default function CrudTable({ title, items, columns, formFields, onAdd, onUpdate, onDelete, renderStatus }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const filtered = items.filter((item) =>
    columns.some((col) => String(item[col.key] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (e) => {
    e.preventDefault();
    editing ? onUpdate(editing.id, form) : onAdd(form);
    setModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button onClick={() => {setEditing(null); setForm({}); setModalOpen(true);}} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg">Agregar</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>{columns.map(c => <th key={c.key} className="text-left p-4">{c.label}</th>)}<th className="text-right p-4">Acciones</th></tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} className="border-b">
                {columns.map(c => <td key={c.key} className="p-4">{item[c.key]}</td>)}
                <td className="p-4 text-right">
                  <button onClick={() => {setEditing(item); setForm(item); setModalOpen(true);}} className="p-2 text-blue-500"><Pencil className="w-4 h-4"/></button>
                  <button onClick={() => onDelete(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar" : "Agregar"}>
        <form onSubmit={handleSave} className="space-y-4">
          {formFields.map(f => (
            <div key={f.key}>
              <label className="block text-sm mb-1">{f.label}</label>
              <input type={f.type || "text"} value={form[f.key] || ""} onChange={e => setForm({...form, [f.key]: e.target.value})} className="w-full border rounded-lg p-2" />
            </div>
          ))}
          <button type="submit" className="bg-[var(--color-primary)] text-white w-full py-2 rounded-lg">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}