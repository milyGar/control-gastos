let gastos = [];

const form = document.getElementById("form-gasto");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const resumen = document.getElementById("resumen");

function hoy() {
  return new Date().toLocaleDateString("en-CA");
}

function formato(n) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fechaLegible(f) {
  return new Date(f + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric", month: "short", year: "numeric",
  });
}

form.fecha.value = hoy();

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
    form.fecha.value = hoy();
    render();
  } catch (err) {
    alert(err.message);
  }
});

function render() {
  // Lista de gastos
  lista.innerHTML = "";
  if (gastos.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = "Aún no hay gastos. Agrega el primero con el formulario.";
    lista.appendChild(vacio);
  }

  gastos.forEach((g) => {
    const li = document.createElement("li");
    li.className = "gasto";
    li.dataset.cat = g.categoria.toLowerCase();

    const punto = document.createElement("span");
    punto.className = "punto";
    punto.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.className = "info";
    const desc = document.createElement("strong");
    desc.textContent = g.descripcion;
    const meta = document.createElement("small");
    meta.textContent = `${g.categoria}, ${fechaLegible(g.fecha)}`;
    info.append(desc, meta);

    const monto = document.createElement("span");
    monto.className = "monto";
    monto.textContent = `$${formato(g.monto)}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "eliminar";
    btn.textContent = "×";
    btn.setAttribute("aria-label", `Eliminar ${g.descripcion}`);
    btn.onclick = () => {
      gastos = eliminarGasto(gastos, g.id);
      render();
    };

    li.append(punto, info, monto, btn);
    lista.appendChild(li);
  });

  // Total y resumen por categoría
  const totalGeneral = calcularTotal(gastos);
  total.textContent = formato(totalGeneral);

  resumen.innerHTML = "";
  const porCat = totalPorCategoria(gastos);
  Object.entries(porCat)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, suma]) => {
      const li = document.createElement("li");
      li.className = "categoria";
      li.dataset.cat = cat.toLowerCase();

      const fila = document.createElement("div");
      fila.className = "fila";
      const nombre = document.createElement("span");
      nombre.textContent = cat;
      const valor = document.createElement("span");
      valor.textContent = `$${formato(suma)}`;
      fila.append(nombre, valor);

      const barra = document.createElement("div");
      barra.className = "barra";
      const relleno = document.createElement("span");
      relleno.style.width = `${(suma / totalGeneral) * 100}%`;
      barra.appendChild(relleno);

      li.append(fila, barra);
      resumen.appendChild(li);
    });
}

render();