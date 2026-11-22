function agregarGasto(gastos, { descripcion, monto, categoria, fecha }) {
  if (!descripcion || descripcion.trim() === "") {
    throw new Error("La descripción es obligatoria");
  }
  if (typeof monto !== "number" || isNaN(monto) || monto <= 0) {
    throw new Error("El monto debe ser mayor a 0");
  }
  const nuevo = {
    id: Date.now() + Math.random(),
    descripcion: descripcion.trim(),
    monto,
    categoria: categoria || "Otros",
    fecha: fecha || new Date().toISOString().slice(0, 10),
  };
  return [...gastos, nuevo];
}

function eliminarGasto(gastos, id) {
  return gastos.filter((g) => g.id !== id);
}

function calcularTotal(gastos) {
  return gastos.reduce((suma, g) => suma + g.monto, 0);
}

function totalPorCategoria(gastos) {
  const resultado = {};
  for (const g of gastos) {
    resultado[g.categoria] = (resultado[g.categoria] || 0) + g.monto;
  }
  return resultado;
}

if (typeof module !== "undefined") {
  module.exports = { agregarGasto, eliminarGasto, calcularTotal, totalPorCategoria };
}X