const productos = [
  { nombre: "Velas de gruta", linea: "Diseño y relieve" },
  { nombre: "Velas de café", linea: "Aroma y calidez" },
  { nombre: "Amor eterno", linea: "Para regalar" }
];

const contenedor = document.getElementById("productos");

if (contenedor) {
  productos.forEach((p) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <div class="foto" role="img" aria-label="Foto de ${p.nombre}"></div>
      <div class="info">
        <h3>${p.nombre}</h3>
        <p>${p.linea}</p>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

const boton = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (boton && menu) {
  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });
}
