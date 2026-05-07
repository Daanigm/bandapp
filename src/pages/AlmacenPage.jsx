import CrudTable from "../components/CrudTable";
import { useApp } from "../context/AppContext";

const columns = [
  { key: "name", label: "Artículo" },
  { key: "category", label: "Categoría" },
  { key: "quantity", label: "Cantidad" },
  { key: "minStock", label: "Mín. Stock" },
  { key: "location", label: "Ubicación" },
  { key: "status", label: "Estado" },
];

const formFields = [
  { key: "name", label: "Nombre del artículo", required: true },
  { key: "category", label: "Categoría", type: "select", options: ["Accesorios", "Mobiliario", "Mantenimiento", "Material", "Electrónica", "Otro"], required: true },
  { key: "quantity", label: "Cantidad", type: "number", required: true, defaultValue: 1 },
  { key: "minStock", label: "Stock Mínimo", type: "number", required: true, defaultValue: 5 },
  { key: "location", label: "Ubicación", type: "select", options: ["Almacén A", "Almacén B", "Almacén C", "Archivo", "Otro"], required: true },
  { key: "lastUpdated", label: "Última actualización", type: "date" },
];

function addStatus(items) {
  return items.map((i) => ({
    ...i,
    status: i.quantity < i.minStock ? "Bajo" : i.quantity === i.minStock ? "Justo" : "OK",
  }));
}

function renderStatus(status) {
  const map = {
    OK: "bg-emerald-50 text-emerald-700",
    Justo: "bg-amber-50 text-amber-700",
    Bajo: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

export default function AlmacenPage() {
  const { inventory, addItem, updateItem, deleteItem } = useApp();
  const itemsWithStatus = addStatus(inventory);

  return (
    <CrudTable
      title="Almacén"
      items={itemsWithStatus}
      columns={columns}
      formFields={formFields}
      onAdd={(data) =>
        addItem("inventory", {
          ...data,
          quantity: Number(data.quantity),
          minStock: Number(data.minStock),
          lastUpdated: data.lastUpdated || new Date().toISOString().slice(0, 10),
        })
      }
      onUpdate={(id, data) =>
        updateItem("inventory", id, {
          ...data,
          quantity: Number(data.quantity),
          minStock: Number(data.minStock),
        })
      }
      onDelete={(id) => deleteItem("inventory", id)}
      renderStatus={renderStatus}
    />
  );
}
