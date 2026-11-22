const {
  agregarGasto, eliminarGasto, calcularTotal, totalPorCategoria,
} = require("../src/gastos");

test("agrega un gasto válido", () => {
  const r = agregarGasto([], { descripcion: "Tacos", monto: 80, categoria: "Comida" });
  expect(r).toHaveLength(1);
  expect(r[0].descripcion).toBe("Tacos");
});

test("rechaza monto inválido", () => {
  expect(() => agregarGasto([], { descripcion: "X", monto: -5 })).toThrow();
});

test("rechaza descripción vacía", () => {
  expect(() => agregarGasto([], { descripcion: "", monto: 10 })).toThrow();
});

test("calcula el total", () => {
  const gastos = [{ monto: 100 }, { monto: 50 }];
  expect(calcularTotal(gastos)).toBe(150);
});

test("calcula total por categoría", () => {
  const gastos = [
    { categoria: "Comida", monto: 100 },
    { categoria: "Comida", monto: 50 },
    { categoria: "Transporte", monto: 30 },
  ];
  expect(totalPorCategoria(gastos)).toEqual({ Comida: 150, Transporte: 30 });
});

test("elimina un gasto por id", () => {
  const gastos = [{ id: 1, monto: 10 }, { id: 2, monto: 20 }];
  expect(eliminarGasto(gastos, 1)).toEqual([{ id: 2, monto: 20 }]);
});