export const initialInstruments = [
  { id: 1, name: "Trompeta Bb", category: "Viento Metal", brand: "Yamaha", model: "YTR-2330", quantity: 8, status: "Disponible", condition: "Bueno" },
  { id: 2, name: "Clarinete Bb", category: "Viento Madera", brand: "Buffet", model: "E11", quantity: 6, status: "Disponible", condition: "Excelente" },
  { id: 3, name: "Tambor Redoblante", category: "Percusión", brand: "Pearl", model: "SS1455", quantity: 4, status: "En Uso", condition: "Bueno" },
  { id: 4, name: "Flauta Traversa", category: "Viento Madera", brand: "Yamaha", model: "YFL-222", quantity: 5, status: "Disponible", condition: "Regular" },
  { id: 5, name: "Tuba", category: "Viento Metal", brand: "Jupiter", model: "JTU1110", quantity: 2, status: "En Reparación", condition: "Regular" },
  { id: 6, name: "Saxofón Alto", category: "Viento Madera", brand: "Selmer", model: "AS42", quantity: 4, status: "Disponible", condition: "Excelente" },
  { id: 7, name: "Trombón", category: "Viento Metal", brand: "Bach", model: "TB301", quantity: 3, status: "En Uso", condition: "Bueno" },
  { id: 8, name: "Bombo", category: "Percusión", brand: "Ludwig", model: "LB520", quantity: 2, status: "Disponible", condition: "Bueno" },
  { id: 9, name: "Platillos", category: "Percusión", brand: "Zildjian", model: "A391", quantity: 3, status: "Disponible", condition: "Excelente" },
  { id: 10, name: "Corno Francés", category: "Viento Metal", brand: "Holton", model: "H379", quantity: 2, status: "En Uso", condition: "Bueno" },
];

export const initialUniforms = [
  { id: 1, name: "Uniforme de Gala", type: "Formal", size: "M", quantity: 25, color: "#1e3a5f", status: "Disponible" },
  { id: 2, name: "Uniforme de Gala", type: "Formal", size: "L", quantity: 20, color: "#1e3a5f", status: "Disponible" },
  { id: 3, name: "Uniforme de Gala", type: "Formal", size: "S", quantity: 10, color: "#1e3a5f", status: "Disponible" },
  { id: 4, name: "Polo de Ensayo", type: "Casual", size: "M", quantity: 30, color: "#e8b931", status: "Disponible" },
  { id: 5, name: "Polo de Ensayo", type: "Casual", size: "L", quantity: 25, color: "#e8b931", status: "Disponible" },
  { id: 6, name: "Capa de Lluvia", type: "Especial", size: "Único", quantity: 40, color: "#333333", status: "En Lavandería" },
  { id: 7, name: "Gorra con Pluma", type: "Accesorio", size: "Único", quantity: 50, color: "#1e3a5f", status: "Disponible" },
  { id: 8, name: "Guantes Blancos", type: "Accesorio", size: "M", quantity: 45, color: "#ffffff", status: "Disponible" },
];

export const initialRehearsals = [
  { id: 1, title: "Ensayo General", date: "2026-04-17", time: "18:00", duration: "2h", location: "Sala Principal", type: "General", notes: "Preparación para desfile del 1 de mayo", attendees: 42 },
  { id: 2, title: "Sección Vientos", date: "2026-04-18", time: "16:00", duration: "1.5h", location: "Sala B", type: "Seccional", notes: "Trabajo en afinación conjunta", attendees: 18 },
  { id: 3, title: "Sección Percusión", date: "2026-04-19", time: "17:00", duration: "1.5h", location: "Sala C", type: "Seccional", notes: "Cadencias nuevas para desfile", attendees: 8 },
  { id: 4, title: "Ensayo de Marcha", date: "2026-04-20", time: "09:00", duration: "3h", location: "Campo Exterior", type: "Marcha", notes: "Formaciones y coreografía", attendees: 45 },
  { id: 5, title: "Ensayo General", date: "2026-04-22", time: "18:00", duration: "2h", location: "Sala Principal", type: "General", notes: "Repaso completo del repertorio", attendees: 42 },
  { id: 6, title: "Ensayo Pre-evento", date: "2026-04-25", time: "15:00", duration: "3h", location: "Sala Principal", type: "General", notes: "Último ensayo antes del desfile", attendees: 48 },
];

export const initialInventory = [
  { id: 1, name: "Atriles de Música", category: "Mobiliario", quantity: 30, minStock: 20, location: "Almacén A", lastUpdated: "2026-04-10" },
  { id: 2, name: "Cañas para Clarinete", category: "Accesorios", quantity: 50, minStock: 30, location: "Almacén B", lastUpdated: "2026-04-12" },
  { id: 3, name: "Aceite para Válvulas", category: "Mantenimiento", quantity: 15, minStock: 10, location: "Almacén B", lastUpdated: "2026-04-08" },
  { id: 4, name: "Baquetas de Tambor", category: "Accesorios", quantity: 20, minStock: 15, location: "Almacén A", lastUpdated: "2026-04-11" },
  { id: 5, name: "Partituras Impresas", category: "Material", quantity: 200, minStock: 100, location: "Archivo", lastUpdated: "2026-04-14" },
  { id: 6, name: "Sillas Plegables", category: "Mobiliario", quantity: 50, minStock: 40, location: "Almacén A", lastUpdated: "2026-04-05" },
  { id: 7, name: "Cables de Audio", category: "Electrónica", quantity: 8, minStock: 10, location: "Almacén C", lastUpdated: "2026-04-09" },
  { id: 8, name: "Grasa para Vara", category: "Mantenimiento", quantity: 12, minStock: 8, location: "Almacén B", lastUpdated: "2026-04-13" },
  { id: 9, name: "Fundas de Instrumento", category: "Accesorios", quantity: 35, minStock: 25, location: "Almacén A", lastUpdated: "2026-04-07" },
  { id: 10, name: "Micrófonos", category: "Electrónica", quantity: 4, minStock: 5, location: "Almacén C", lastUpdated: "2026-04-06" },
];
