// Lista de productos disponibles
const productos = [
    { id: 1, nombre: "Mochila Wayuu", precio: 120000, descripcion: "Hecha a mano por artesanos colombianos", imagen: "img/mochila1.jpg" },
    { id: 2, nombre: "Sombrero Vueltiao", precio: 95000, descripcion: "Ícono cultural de Colombia", imagen: "img/sombrero.jpg" },
    { id: 3, nombre: "Hamaca Tejida", precio: 150000, descripcion: "Ideal para descansar y relajarse", imagen: "img/hamaca.jpg" }
];

// Mostrar tarjetas de productos
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text fw-bold">$${producto.precio.toLocaleString()}</p>
                    <div class="mt-auto">
                        <input type="number" class="form-control mb-2" id="cantidad-${producto.id}" min="1" value="1">
                        <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    const producto = productos.find(p => p.id === id);
    let carrito = cargarCarrito();

    const existente = carrito.find(p => p.id === id);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
}

// Mostrar productos en el carrito (para compras.html)
function mostrarCarrito() {
    const carrito = cargarCarrito();
    const contenedor = document.getElementById("tabla-carrito");
    let subtotal = 0;
    contenedor.innerHTML = "";

    carrito.forEach(item => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;

        contenedor.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td><img src="${item.imagen}" alt="${item.nombre}" width="60"></td>
                <td>$${item.precio.toLocaleString()}</td>
                <td>${item.cantidad}</td>
                <td>$${totalItem.toLocaleString()}</td>
                <td><button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">X</button></td>
            </tr>
        `;
    });

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById("subtotal").textContent = subtotal.toLocaleString();
    document.getElementById("iva").textContent = iva.toFixed(0).toLocaleString();
    document.getElementById("total").textContent = total.toFixed(0).toLocaleString();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}

// Simular pago
function pagar() {
    if (confirm("¿Desea pagar los productos seleccionados?")) {
        localStorage.removeItem('carrito');
        alert("¡Gracias por su compra!");
        location.reload();
    }
}

// Inicializar si está en página de productos o compras
window.onload = function () {
    if (document.getElementById("contenedor-productos")) {
        mostrarProductos();
    }
    if (document.getElementById("tabla-carrito")) {
        mostrarCarrito();
    }
};
