import CrudTable from "../components/CrudTable";
import { useApp } from "../context/AppContext";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "type", label: "Tipo" },
  { key: "size", label: "Talla" },
  { key: "quantity", label: "Cantidad" },
  { key: "color", label: "Color" },
  { key: "status", label: "Estado" },
];

const formFields = [
  { key: "name", label: "Nombre", required: true },
  { key: "type", label: "Tipo", type: "select", options: ["Formal", "Casual", "Especial", "Accesorio"], required: true },
  { key: "size", label: "Talla", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL", "Único"], required: true },
  { key: "quantity", label: "Cantidad", type: "number", required: true, defaultValue: 1 },
  { key: "color", label: "Color (hex)", defaultValue: "#1e3a5f" },
  { key: "status", label: "Estado", type: "select", options: ["Disponible", "En Uso", "En Lavandería", "Dañado"], required: true, defaultValue: "Disponible" },
];

function renderStatus(status) {
  const map = {
    Disponible: "bg-emerald-50 text-emerald-700",
    "En Uso": "bg-blue-50 text-blue-700",
    "En Lavandería": "bg-purple-50 text-purple-700",
    Dañado: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

export default function UniformesPage() {
  const { uniforms, addItem, updateItem, deleteItem } = useApp();
  return (
    <CrudTable
      title="Uniformes"
      items={uniforms}
      columns={columns}
      formFields={formFields}
      onAdd={(data) => addItem("uniforms", { ...data, quantity: Number(data.quantity) })}
      onUpdate={(id, data) => updateItem("uniforms", id, { ...data, quantity: Number(data.quantity) })}
      onDelete={(id) => deleteItem("uniforms", id)}
      renderStatus={renderStatus}
    />
  );
}
