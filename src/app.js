let gastos = [];

const form = document.getElementById("form-gasto");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const resumen = document.getElementById("resumen");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    gastos = agregarGasto(gastos, {
      descripcion: form.descripcion.value,
      monto: parseFloat(form.monto.value),
      categoria: form.categoria.value,
      fecha: form.fecha.value,
    });
    form.reset();
    render();
  } catch (err) {
    alert(err.message);
  }
});

function render() {
  lista.innerHTML = "";
  gastos.forEach((g) => {
    const li = document.createElement("li");
    li.textContent = `${g.fecha} - ${g.descripcion} (${g.categoria}): $${g.monto.toFixed(2)}`;
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => {
      gastos = eliminarGasto(gastos, g.id);
      render();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });

  total.textContent = calcularTotal(gastos).toFixed(2);

  resumen.innerHTML = "";
  const porCat = totalPorCategoria(gastos);
  for (const cat in porCat) {
    const li = document.createElement("li");
    li.textContent = `${cat}: $${porCat[cat].toFixed(2)}`;
    resumen.appendChild(li);
  }
}