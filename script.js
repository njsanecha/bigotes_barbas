//SLIDESHOW
let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  Array.from(slides).forEach(slide => slide.style.display = "none");
  Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//VARIABLES
let carrito = [];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
    mostrarNotificacion("Producto añadido al carrito.");
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion("Carrito vaciado.");
}

function actualizarCarrito() {
    const items = document.querySelector(".carrito-items");
    const contador = document.querySelectorAll(".carrito-count");
    const total = document.querySelector(".carrito-total span");

    items.innerHTML = "";
    let suma = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        items.appendChild(div);
        suma += producto.precio;
    });

    total.textContent = `Total: $${suma}`;
    contador.forEach(c => c.textContent = carrito.length);
    items.style.display = carrito.length > 0 ? "block" : "none";
    total.parentElement.style.display = carrito.length > 0 ? "block" : "none";
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    mostrarNotificacion("Producto eliminado del carrito.");
}

function toggleCarrito() {
    document.querySelector(".carrito-modal").classList.toggle("visible");
}

// Notificación visual
function mostrarNotificacion(mensaje) {
    const notif = document.createElement("div");
    notif.className = "notificacion mostrar";
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.remove("mostrar");
        notif.remove();
    }, 3000);
}

// Cerrar modales si se hace clic fuera
window.onclick = function(event) {
    const registerModal = document.getElementById("id01");
    const loginModal = document.getElementById("id02");
    const productosModal = document.getElementById("modalProductos");
    const carritoModal = document.getElementById("carritoModal"); 

    if (event.target == loginModal) loginModal.style.display = "none";
    if (event.target == productosModal) productosModal.style.display = "none";
    if (event.target == carritoModal) carritoModal.style.display = "none";
    if (event.target == registerModal) registerModal.style.display = "none";
};

const productosData = {
  alimento: [
    { imagen: "img/prod_alimentoperro7kg.png", nombre: "Agility para perro 7kg", precio: 135000 },
    { imagen: "img/prod_alimentogato3kg.png", nombre: "Agility para gato 3kg", precio: 77000 },
    { imagen: "img/prod_alimentogato3kg.png", nombre: "Agility para gato 7kg", precio: 169000 },
    { imagen: "img/prod_alimentoperro4kg.jpg", nombre: "Dogurmet para cachorros 4kg", precio: 65000 },
    { imagen: "img/prod_donkatadultos1kg.jpg", nombre: "Don kat para gatos 1kg", precio: 15000 },
    { imagen: "img/prod_donkatgaticos1kg.jpg", nombre: "Don kat para gatos 1kg", precio: 13000 }
  ],
  belleza: [
    { imagen: "img/prod_Shampoocanamor.jpg", nombre: "Shampoo CanAmor", precio: 22000 },
    { imagen: "img/prod_shampoopelooscuro.webp", nombre: "Shampoo para pelo oscuro", precio: 20000 },
    { imagen: "img/prod_baño.jpg", nombre: "Baño y corte de pelo", precio: 35000 }
  ],
   accesorios:[
    { imagen: "img/prod_correa.jpg", nombre: "Correa Perro", precio: 15000 },
    { imagen: "img/prod_collar.jpg", nombre: "Collar", precio: 12000 },
    { imagen: "img/prod_cama.jpg", nombre: "Cama acolchada", precio: 45000 },
    { imagen: "img/prod_comederodoble.jpg", nombre: "Comedero doble", precio: 35000 },
    { imagen: "img/prod_comederosencillo.jpg", nombre: "Comedero sencillo", precio: 20000 },
    { imagen: "img/prod_juguete.webp", nombre: "Juguete interactivo", precio: 18000 }
  ]
};

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  showSlides(slideIndex);

  document.querySelectorAll('.btn-secundario').forEach(boton => {
    boton.addEventListener('click', function (e) {
      e.preventDefault();
      const categoria = this.closest('.producto-card').querySelector('h3').textContent.toLowerCase();
      mostrarProductos(categoria);
    });
  });

  document.querySelector('.carrito-btn').addEventListener('click', toggleCarrito);
  actualizarCarrito();
});

//FUNCIONES PRINCIPALES
function mostrarProductos(categoria) {
  const modal = document.getElementById("modalProductos");
  const lista = modal.querySelector(".productos-lista");
  lista.innerHTML = "";

  if (productosData[categoria]) {
    productosData[categoria].forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "producto-item";
      item.innerHTML = `
        <div>
          <img src=${producto.imagen} alt="" style="width: 300px;">
        </div>
        <p style="font-weight: 400;"><strong>${producto.nombre}</strong>: <br>$${producto.precio.toLocaleString()}</p>
        <button onclick="agregarAlCarrito('${categoria}', ${index})" class="btn-primario">Agregar al carrito</button>
      `;
      lista.appendChild(item);
    });
  }

  modal.style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalProductos").style.display = "none";
  document.getElementById("carritoModal").style.display = "none";
  document.getElementById("id01").style.display = "none";
  document.getElementById("id02").style.display = "none";
}

function agregarAlCarrito(categoria, index) {
  const producto = productosData[categoria][index];
  carrito.push(producto);
  actualizarCarrito();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`);

  const dropdown = document.getElementById("carritoDropdown");
}

function actualizarCarrito() {
  const carritoItems = document.querySelector(".carrito-items");
  const carritoCount = document.querySelector(".carrito-count");
  const carritoTotal = document.querySelector(".carrito-total span");

  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, i) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "carrito-item";
    itemDiv.innerHTML = `
      <p style="font-weight:400; width:70%; margin-right:2px;">${item.nombre}
      <br> $${item.precio.toLocaleString()}</p>
      <button onclick="eliminarDelCarrito(${i})" class="btn-secundario" style="justify-content:end; border: none; font-family: inherit; height: 40px;">Eliminar</button>
    `;
    carritoItems.appendChild(itemDiv);
    total += item.precio;
  });

  carritoTotal.textContent = `${total.toLocaleString()}`;
  carritoCount.textContent = carrito.length;
  carritoCount.style.display = carrito.length ? "inline-block" : "none";
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function toggleCarrito() {
  const dropdown = document.getElementById("carritoDropdown");
}

function mostrarNotificacion(mensaje) {
 const notif = document.createElement("div");
  notif.className = "notificacion mostrar";
  notif.textContent = mensaje;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.remove("mostrar");
    notif.remove();
  }, 3000);
}

//Formulario registro
const inputName = document.getElementById("reguname");
const inputEmail = document.getElementById("reguemail");
const inputPassword = document.getElementById("regupsw");
//const fileImagen = document.getElementById("imagen");

var users = [];

function registro(){
    let name = inputName.value;
    let email = inputEmail.value;
    let password = inputPassword.value;
    //let imagen = fileImagen;

    let user = {
        name: name,
        email: email,
        password: password,
        //imagen: imagen
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    
    inputName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    //fileImagen.value = "";
}

//Login
const loginEmail = document.getElementById("uemail");
const loginPassword = document.getElementById("upsw");

function login(loginEmail){
  debugger
    var user = users.find(x => x.email = loginEmail)
    console.log(user.email, user.password)
}
