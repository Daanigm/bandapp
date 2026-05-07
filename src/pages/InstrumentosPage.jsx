import CrudTable from "../components/CrudTable";
import { useApp } from "../context/AppContext";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "category", label: "Categoría" },
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "quantity", label: "Cantidad" },
  { key: "status", label: "Estado" },
  { key: "condition", label: "Condición" },
];

const formFields = [
  { key: "name", label: "Nombre", required: true },
  { key: "category", label: "Categoría", type: "select", options: ["Viento Metal", "Viento Madera", "Percusión", "Cuerdas", "Otro"], required: true },
  { key: "brand", label: "Marca", required: true },
  { key: "model", label: "Modelo" },
  { key: "quantity", label: "Cantidad", type: "number", required: true, defaultValue: 1 },
  { key: "status", label: "Estado", type: "select", options: ["Disponible", "En Uso", "En Reparación"], required: true, defaultValue: "Disponible" },
  { key: "condition", label: "Condición", type: "select", options: ["Excelente", "Bueno", "Regular", "Malo"], required: true, defaultValue: "Bueno" },
];

function renderStatus(status) {
  const map = {
    Disponible: "bg-emerald-50 text-emerald-700",
    "En Uso": "bg-blue-50 text-blue-700",
    "En Reparación": "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

export default function InstrumentosPage() {
  const { instruments, addItem, updateItem, deleteItem } = useApp();
  return (
    <CrudTable
      title="Instrumentos"
      items={instruments}
      columns={columns}
      formFields={formFields}
      onAdd={(data) => addItem("instruments", { ...data, quantity: Number(data.quantity) })}
      onUpdate={(id, data) => updateItem("instruments", id, { ...data, quantity: Number(data.quantity) })}
      onDelete={(id) => deleteItem("instruments", id)}
      renderStatus={renderStatus}
    />
  );
}
