import {
  Music, Shirt, Calendar, Warehouse, Users, TrendingUp,
  Clock, MapPin, AlertTriangle, CheckCircle2, Wrench,
} from "lucide-react";
import { useApp } from "../context/AppContext";

function MetricCard({ icon: Icon, label, value, sub, color, bgColor }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
          {sub && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Disponible: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    "En Uso": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    "En Reparación": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    "En Lavandería": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  };
  const s = map[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export default function DashboardPage({ onNavigate }) {
  const { bandName, instruments, uniforms, rehearsals, inventory } = useApp();

  const totalInstruments = instruments.reduce((s, i) => s + i.quantity, 0);
  const totalUniforms = uniforms.reduce((s, u) => s + u.quantity, 0);
  const upcomingRehearsals = rehearsals.filter((r) => new Date(r.date) >= new Date()).slice(0, 4);
  const lowStock = inventory.filter((i) => i.quantity <= i.minStock);
  const inRepair = instruments.filter((i) => i.status === "En Reparación");

  const instrumentsByStatus = instruments.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + i.quantity;
    return acc;
  }, {});

  return (
    <div className="animate-fade-in">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Dashboard</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
          Bienvenido al panel de gestión de <span className="font-medium">{bandName}</span>
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          icon={Music}
          label="Instrumentos"
          value={totalInstruments}
          sub={`${instruments.length} tipos`}
          color="#1e3a5f"
          bgColor="#e8f0fe"
        />
        <MetricCard
          icon={Shirt}
          label="Uniformes"
          value={totalUniforms}
          sub={`${uniforms.length} variantes`}
          color="#7c3aed"
          bgColor="#ede9fe"
        />
        <MetricCard
          icon={Calendar}
          label="Ensayos"
          value={upcomingRehearsals.length}
          sub="próximos programados"
          color="#059669"
          bgColor="#d1fae5"
        />
        <MetricCard
          icon={Warehouse}
          label="Almacén"
          value={inventory.length}
          sub={`${lowStock.length} con stock bajo`}
          color="#d97706"
          bgColor="#fef3c7"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Rehearsals */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="font-semibold text-[var(--color-text)]">Próximos Ensayos</h3>
            <button
              onClick={() => onNavigate("ensayos")}
              className="text-xs text-[var(--color-primary)] hover:underline font-medium"
            >
              Ver todos →
            </button>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {upcomingRehearsals.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No hay ensayos programados</div>
            ) : (
              upcomingRehearsals.map((r) => {
                const d = new Date(r.date + "T00:00:00");
                const dayName = d.toLocaleDateString("es-ES", { weekday: "short" });
                const dayNum = d.getDate();
                const monthName = d.toLocaleDateString("es-ES", { month: "short" });
                return (
                  <div key={r.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className="w-12 h-14 rounded-lg bg-[var(--color-primary)]/5 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] uppercase font-semibold text-[var(--color-primary)]/60">{dayName}</span>
                      <span className="text-lg font-bold text-[var(--color-primary)] leading-none">{dayNum}</span>
                      <span className="text-[10px] text-[var(--color-primary)]/60">{monthName}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text)] truncate">{r.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {r.time} · {r.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {r.location}
                        </span>
                      </div>
                      {r.notes && <p className="text-xs text-gray-400 mt-0.5 truncate">{r.notes}</p>}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                      <Users className="w-3.5 h-3.5" />
                      {r.attendees}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Instrument Status */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-text)]">Estado de Instrumentos</h3>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(instrumentsByStatus).map(([status, count]) => {
                const icons = {
                  Disponible: CheckCircle2,
                  "En Uso": TrendingUp,
                  "En Reparación": Wrench,
                };
                const colors = {
                  Disponible: "#059669",
                  "En Uso": "#2563eb",
                  "En Reparación": "#d97706",
                };
                const Icon = icons[status] || CheckCircle2;
                const color = colors[status] || "#6b7280";
                const pct = Math.round((count / totalInstruments) * 100);
                return (
                  <div key={status} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-[var(--color-text)]">{status}</span>
                        <span className="text-[var(--color-text-muted)]">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-[var(--color-text)]">Alertas de Stock</h3>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {lowStock.length === 0 ? (
                <div className="p-5 text-center text-sm text-gray-400">Todo en orden ✓</div>
              ) : (
                lowStock.map((item) => (
                  <div key={item.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{item.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${item.quantity < item.minStock ? "text-red-500" : "text-amber-500"}`}>
                        {item.quantity}
                      </p>
                      <p className="text-[10px] text-gray-400">mín: {item.minStock}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Repairs */}
          {inRepair.length > 0 && (
            <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-[var(--color-text)]">En Reparación</h3>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {inRepair.map((i) => (
                  <div key={i.id} className="px-5 py-3">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-gray-400">{i.brand} {i.model} · {i.quantity} unidades</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
