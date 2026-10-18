/* =====================================================
   1. CONFIGURACIÓN (cambia estos datos)
   ===================================================== */
const CONFIGURACION = {
  // Número de WhatsApp con código de país y sin signos ni espacios. Ejemplo: "59170000000"
  whatsapp: "59172379293",
  moneda: "Bs",
  tienda: "Librería Castro"
};

/* =====================================================
   2. TUS PRODUCTOS
   Para agregar uno nuevo, copia una línea completa
   (de { a },) y pégala debajo. Cambia los datos.
   - imagen: ruta de la foto, por ejemplo "imagenes/cuaderno.jpg"
   - precio: solo el número, sin símbolo
   ===================================================== */
const productos = [
  { nombre: "Cuaderno tamaño oficio", 
    descripcion: "Cuaderno de 100 hojas, tapa dura, anillado y diferentes cuadriculas.", 
    precio: 20, 
    imagen: "productos/cuadernos.jpg" },

  { nombre: "Cuaderno tamaño carta", 
    descripcion: "Cuaderno de 100 hojas, tapa dura, anillado y diferentes cuadriculas.", 
    precio: 20, 
    imagen: "productos/cuaderno-oficio.jpg" },

  { nombre: "Boligrafos Pilot", 
    descripcion: "Lo mejor para escribir con suavidad y precisión.", 
    precio: 8, 
    imagen: "productos/bolis.jpg" },

  { nombre: "Boligrafos Monami", 
    descripcion: "Los mejores bolígrafos para escribir con suavidad y precisión.", 
    precio: 2.50, 
    imagen: "productos/bolis1.jpg" },

  { nombre: "Hojas de carpeta", 
    descripcion: "Tenemos en todas las cuadriculas: menudo, intermedio y grande", 
    precio: 40, 
    imagen: "productos/hojas-carpeta.jpg" },

  { nombre: "Lapiz rojo (Faber Castell)", 
    descripcion: "Tenemos para vender por unidad y paquetes", 
    precio: 3, 
    imagen: "productos/lapiz-rojo.jpg" },

  { nombre: "Lapiz negro", 
    descripcion: "Tenemos para vender por unidad y paquetes", 
    precio: 3, 
    imagen: "productos/lapiz-negro.jpg" },

  { nombre: "Lapiz negro", 
    descripcion: "Tenemos para vender por unidad y paquetes", 
    precio: 3, 
    imagen: "productos/lapiz-negro.jpg" },

    

  { nombre: "Cartulinas", 
    descripcion: "Se tiene de todo los colores.", 
    precio: 4, 
    imagen: "productos/cartulinas.webp" }
];

/* =====================================================
   3. TUS LIBROS
   Igual que los productos, pero con "autor".
   ===================================================== */
const libros = [
  { nombre: "Cara sucia", 
    autor: "José Camarlinghi", 
    descripcion: "Es una obra de la literatura boliviana que refleja la vida difícil de los niños de la calle", 
    precio: 100, 
    imagen: "libro/cara.jpg" },

  { nombre: "Tempestad en la cordillera", 
    autor: "Walter Guevara Arze", 
    descripcion: "Una obra que refleja las dificultades de la vida en las montañas bolivianas.", 
    precio: 15, 
    imagen: "libro/tempestad.jpg" },

  { nombre: "Sangre de campeón", 
    autor: "Carlos Cuauhtémoc Sánchez", 
    descripcion: "Novela que enseña valores como el respeto, la responsabilidad, la honestidad y la perseverancia.", 
    precio: 10, 
    imagen: "libro/campeon.webp" },

  { nombre: "¿Quien se ha llevado mi queso?", 
    autor: "Spencer Johnson", 
    descripcion: "Una fábula sencilla sobre el cambio: dos ratones y dos personitas buscan queso en un laberinto", 
    precio: 10, 
    imagen: "libro/queso.jpg" },

  { nombre: "El velero de cristal", 
    autor: "Jose Mauro de Vasconcelos", 
    descripcion: "Es una novela breve y tierna sobre un niño que, a través de la imaginación, emprende un viaje al país de los sueños.", 
    precio: 10, 
    imagen: "libro/velero.jpg" },

  { nombre: "Quiubole", 
    autor: "Gaby Vargas & Yordi Rosado", 
    descripcion: "Es una guía para adolescentes que responde, con lenguaje juvenil y divertido, las dudas más comunes de esa etapa.", 
    precio: 10, 
    imagen: "libro/quiubole.jpg" },    

  { nombre: "La Chaskañawi", 
    autor: "Carlos Medinaceli", 
    descripcion: "Es una novela boliviana que cuenta una historia de amor entre un joven estudiante y una cholita", 
    precio: 10, 
    imagen: "libro/chasca.jpg" },

    { nombre: "Borracho estaba, pero no me acuerdo", 
    autor: "Victor Hugo Viscarra", 
    descripcion: "Es un libro de memorias de Viscarra, escritor paceño (1958-2006). Mezcla crónica, cuento, descripción antropológica y anécdota.", 
    precio: 10, 
    imagen: "libro/borracho.jpg" }
];

/* =====================================================
   4. CÓDIGO DE LA TIENDA (no necesitas modificar)
   ===================================================== */
const IMAGEN_VACIA = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#EDE7F6"/><text x="150" y="155" font-family="sans-serif" font-size="20" fill="#8B63C9" text-anchor="middle">Sin imagen</text></svg>'
);

let carrito = [];
try { carrito = JSON.parse(localStorage.getItem("carrito-castro")) || []; } catch (e) { carrito = []; }

const $ = (id) => document.getElementById(id);
const dinero = (valor) => CONFIGURACION.moneda + " " + Number(valor).toFixed(2);
const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Dibujar productos y libros ---------- */
function crearTarjeta(item, esLibro) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML =
    '<div class="tarjeta-imagen' + (esLibro ? " libro" : "") + '"><img src="' + escapar(item.imagen || "") + '" alt="' + escapar(item.nombre) + '" loading="lazy"></div>' +
    '<div class="tarjeta-cuerpo">' +
      '<h3 class="tarjeta-nombre">' + escapar(item.nombre) + "</h3>" +
      (esLibro ? '<p class="tarjeta-autor">' + escapar(item.autor) + "</p>" : "") +
      '<p class="tarjeta-descripcion">' + escapar(item.descripcion) + "</p>" +
      '<div class="tarjeta-compra"><span class="tarjeta-precio">' + dinero(item.precio) + '</span>' +
      '<button class="boton boton-comprar" type="button">Comprar</button></div>' +
    "</div>";
  const imagen = tarjeta.querySelector("img");
  imagen.onerror = () => { imagen.onerror = null; imagen.src = IMAGEN_VACIA; };
  tarjeta.querySelector("button").addEventListener("click", () => agregarAlCarrito(item));
  return tarjeta;
}

/* ---------- Buscador (ignora tildes y mayúsculas) ---------- */
function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function filtrar(lista, texto) {
  const busqueda = normalizar(texto);
  return lista.filter((item) =>
    normalizar(item.nombre + " " + (item.autor || "") + " " + item.descripcion).includes(busqueda)
  );
}

function mostrarProductos(texto) {
  const contenedor = $("lista-productos");
  contenedor.innerHTML = "";
  const filtrados = filtrar(productos, texto);
  filtrados.forEach((p) => contenedor.appendChild(crearTarjeta(p, false)));
  $("sin-resultados").hidden = filtrados.length > 0;
}

function mostrarLibros(texto) {
  const contenedor = $("lista-libros");
  contenedor.innerHTML = "";
  const filtrados = filtrar(libros, texto);
  filtrados.forEach((l) => contenedor.appendChild(crearTarjeta(l, true)));
  $("sin-resultados-libros").hidden = filtrados.length > 0;
}

/* ---------- Carrito ---------- */
function guardarCarrito() {
  try { localStorage.setItem("carrito-castro", JSON.stringify(carrito)); } catch (e) {}
}

function agregarAlCarrito(item) {
  const existente = carrito.find((a) => a.nombre === item.nombre);
  if (existente) { existente.cantidad++; }
  else { carrito.push({ nombre: item.nombre, precio: item.precio, imagen: item.imagen, cantidad: 1 }); }
  dibujarCarrito();
  abrirCarrito();
}

function cambiarCantidad(nombre, cambio) {
  const articulo = carrito.find((a) => a.nombre === nombre);
  if (!articulo) return;
  articulo.cantidad += cambio;
  if (articulo.cantidad <= 0) quitarArticulo(nombre); else dibujarCarrito();
}

function quitarArticulo(nombre) {
  carrito = carrito.filter((a) => a.nombre !== nombre);
  dibujarCarrito();
}

function calcularTotal() {
  return carrito.reduce((suma, a) => suma + a.precio * a.cantidad, 0);
}

function dibujarCarrito() {
  const lista = $("carrito-articulos");
  lista.innerHTML = "";
  if (carrito.length === 0) {
    lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío. Agrega productos con el botón Comprar.</p>';
  }
  carrito.forEach((a) => {
    const fila = document.createElement("div");
    fila.className = "articulo";
    fila.innerHTML =
      '<img src="' + escapar(a.imagen || "") + '" alt="">' +
      '<div><div class="articulo-nombre">' + escapar(a.nombre) + '</div>' +
      '<div class="articulo-precio">' + dinero(a.precio) + ' c/u</div>' +
      '<div class="articulo-cantidad"><button type="button" data-accion="menos" aria-label="Quitar uno">−</button><span>' + a.cantidad + '</span><button type="button" data-accion="mas" aria-label="Agregar uno">+</button></div></div>' +
      '<button class="articulo-quitar" type="button" data-accion="quitar">Quitar</button>';
    const imagen = fila.querySelector("img");
    imagen.onerror = () => { imagen.onerror = null; imagen.src = IMAGEN_VACIA; };
    fila.querySelector('[data-accion="menos"]').addEventListener("click", () => cambiarCantidad(a.nombre, -1));
    fila.querySelector('[data-accion="mas"]').addEventListener("click", () => cambiarCantidad(a.nombre, 1));
    fila.querySelector('[data-accion="quitar"]').addEventListener("click", () => quitarArticulo(a.nombre));
    lista.appendChild(fila);
  });
  $("carrito-total").textContent = dinero(calcularTotal());
  $("contador-carrito").textContent = carrito.reduce((suma, a) => suma + a.cantidad, 0);
  guardarCarrito();
}

function abrirCarrito() { $("carrito").classList.add("abierto"); $("fondo-oscuro").hidden = false; }
function cerrarCarrito() { $("carrito").classList.remove("abierto"); $("fondo-oscuro").hidden = true; }

/* ---------- Formulario y mensaje de WhatsApp ---------- */
function abrirFormulario() {
  if (carrito.length === 0) { alert("Tu carrito está vacío. Agrega al menos un producto."); return; }
  $("mensaje-error").hidden = true;
  $("ventana-pedido").hidden = false;
  $("campo-nombre").focus();
}
function cerrarFormulario() { $("ventana-pedido").hidden = true; }

function armarMensaje(nombre, celular, notas) {
  let mensaje = "Hola " + CONFIGURACION.tienda + ", quiero hacer un pedido.\n\n";
  mensaje += "*Nombre:* " + nombre + "\n*Celular:* " + celular + "\n\n*Mi pedido:*\n";
  carrito.forEach((a) => {
    mensaje += "- " + a.cantidad + " x " + a.nombre + " (" + dinero(a.precio) + ") = " + dinero(a.precio * a.cantidad) + "\n";
  });
  mensaje += "\n*Total: " + dinero(calcularTotal()) + "*";
  if (notas) mensaje += "\n\n*Detalles y coordinación:*\n" + notas;
  mensaje += "\n\nQuedo atenta a tu respuesta. ¡Gracias!";
  return mensaje;
}

function enviarPedido(evento) {
  evento.preventDefault();
  const nombre = $("campo-nombre").value.trim();
  const celular = $("campo-celular").value.trim();
  const notas = $("campo-notas").value.trim();
  const error = $("mensaje-error");
  if (!nombre) { error.textContent = "Escribe tu nombre."; error.hidden = false; return; }
  if (celular.replace(/\D/g, "").length < 7) { error.textContent = "Escribe un número de celular válido."; error.hidden = false; return; }
  const enlace = "https://wa.me/" + CONFIGURACION.whatsapp + "?text=" + encodeURIComponent(armarMensaje(nombre, celular, notas));
  window.open(enlace, "_blank", "noopener");
  cerrarFormulario();
}

/* ---------- Inicio ---------- */
$("boton-carrito").addEventListener("click", abrirCarrito);
$("cerrar-carrito").addEventListener("click", cerrarCarrito);
$("fondo-oscuro").addEventListener("click", cerrarCarrito);
$("boton-pedir").addEventListener("click", abrirFormulario);
$("cerrar-formulario").addEventListener("click", cerrarFormulario);
$("formulario-pedido").addEventListener("submit", enviarPedido);
$("buscador").addEventListener("input", (e) => {
  mostrarProductos(e.target.value);
  mostrarLibros(e.target.value);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { cerrarFormulario(); cerrarCarrito(); } });

$("boton-contacto").href = "https://wa.me/" + CONFIGURACION.whatsapp + "?text=" + encodeURIComponent("Hola " + CONFIGURACION.tienda + ", quisiera más información.");
$("anio").textContent = new Date().getFullYear();

mostrarProductos("");
mostrarLibros("");
dibujarCarrito();