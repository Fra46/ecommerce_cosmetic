// script.js para JMAL Cosméticos

// Lista de productos disponibles para JMAL
const productosJMAL = [
    {
        id: 1,
        nombre: "Labial Líquido Matte 'Rosa Pasión'",
        precio: 35000,
        descripcion: "Larga duración y color intenso para unos labios irresistibles. Acabado matte aterciopelado.",
        imagen: "ecommerce_cosmetic/imagenes/labial_rosa_pasion.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 2,
        nombre: "Base de Maquillaje 'Piel Perfecta'",
        precio: 55000,
        descripcion: "Cobertura media-alta con acabado natural. Unifica el tono y minimiza imperfecciones.",
        imagen: "ecommerce_cosmetic/imagenes/base_piel_perfecta.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 3,
        nombre: "Paleta de Sombras 'Mirada Encantadora'",
        precio: 72000,
        descripcion: "12 tonos versátiles entre mates y brillantes para crear looks de día y de noche.",
        imagen: "ecommerce_cosmetic/imagenes/paleta_mirada_encantadora.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 4,
        nombre: "Máscara de Pestañas 'Volumen Extremo'",
        precio: 42000,
        descripcion: "Define y alarga tus pestañas al instante, aportando un volumen espectacular sin grumos.",
        imagen: "ecommerce_cosmetic/imagenes/mascara_volumen_extremo.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 5,
        nombre: "Sérum Facial Hidratante 'Juventud Radiante'",
        precio: 85000,
        descripcion: "Con ácido hialurónico y vitamina C para una piel hidratada, luminosa y rejuvenecida.",
        imagen: "ecommerce_cosmetic/imagenes/serum_juventud_radiante.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 6,
        nombre: "Rubor Compacto 'Mejillas Sonrojadas'",
        precio: 38000,
        descripcion: "Aporta un toque de color natural y saludable a tus mejillas. Textura sedosa.",
        imagen: "ecommerce_cosmetic/imagenes/rubor_mejillas_sonrojadas.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 7,
        nombre: "Delineador Líquido 'Precisión Felina'",
        precio: 32000,
        descripcion: "Punta fina para trazos precisos y definidos. Color negro intenso y de larga duración.",
        imagen: "ecommerce_cosmetic/imagenes/delineador_precision_felina.jpg" // Reemplaza con el nombre de tu imagen
    },
    {
        id: 8,
        nombre: "Crema Hidratante Corporal 'Seda Floral'",
        precio: 48000,
        descripcion: "Nutrición profunda con un delicado aroma floral. Piel suave y tersa todo el día.",
        imagen: "ecommerce_cosmetic/imagenes/crema_seda_floral.jpg" // Reemplaza con el nombre de tu imagen
    }
];

/**
 * Muestra las tarjetas de productos en la página de productos.
 */
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) {
        console.warn("El contenedor de productos no fue encontrado en esta página.");
        return;
    }

    contenedor.innerHTML = ""; // Limpiar contenedor antes de añadir nuevos productos

    productosJMAL.forEach((producto) => {
        const card = document.createElement("div");
        // Clases de Bootstrap para la responsividad de las tarjetas
        card.className = "col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch";
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/300x300/F8C8DC/FFF?text=${encodeURIComponent(producto.nombre)}';">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <p class="card-text fw-bold mt-2">$${producto.precio.toLocaleString('es-CO')}</p>
                    <div class="mt-auto text-center">
                        <label for="cantidad-${producto.id}" class="form-label visually-hidden">Cantidad</label>
                        <input type="number" class="form-control mb-2 mx-auto" id="cantidad-${producto.id}" min="1" value="1" style="max-width: 80px;">
                        <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill me-1" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
                            </svg>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

/**
 * Agrega un producto al carrito de compras.
 * @param {number} id - El ID del producto a agregar.
 */
function agregarAlCarrito(id) {
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    if (!cantidadInput) {
        console.error(`Input de cantidad para el producto ID ${id} no encontrado.`);
        return;
    }
    const cantidad = parseInt(cantidadInput.value);
    if (isNaN(cantidad) || cantidad < 1) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const producto = productosJMAL.find(p => p.id === id);
    if (!producto) {
        console.error(`Producto con ID ${id} no encontrado.`);
        return;
    }

    let carrito = cargarCarrito();
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem('carritoJMAL', JSON.stringify(carrito));
    // Pequeña notificación visual (se puede mejorar con un modal o toast)
    mostrarNotificacion('¡Producto agregado al carrito!', 'success');
    actualizarContadorCarrito();
}

/**
 * Carga el carrito desde localStorage.
 * @returns {Array} - El carrito de compras.
 */
function cargarCarrito() {
    return JSON.parse(localStorage.getItem('carritoJMAL') || '[]');
}

/**
 * Muestra los productos en la página del carrito (compras.html).
 */
function mostrarCarrito() {
    const carrito = cargarCarrito();
    const contenedorTabla = document.getElementById("tabla-carrito");
    const subtotalElem = document.getElementById("subtotal");
    const ivaElem = document.getElementById("iva");
    const totalElem = document.getElementById("total");
    const accionesCarritoElem = document.getElementById("acciones-carrito"); // Div para botones

    if (!contenedorTabla || !subtotalElem || !ivaElem || !totalElem || !accionesCarritoElem) {
        console.warn("Algunos elementos del DOM para el carrito no fueron encontrados.");
        return;
    }

    contenedorTabla.innerHTML = ""; // Limpiar tabla antes de actualizar
    let subtotalCalculado = 0;

    if (carrito.length === 0) {
        contenedorTabla.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tu carrito está vacío. <a href="productos.html">¡Empieza a comprar!</a></td></tr>`;
        subtotalElem.textContent = "0";
        ivaElem.textContent = "0";
        totalElem.textContent = "0";
        accionesCarritoElem.classList.add('d-none'); // Ocultar botones si el carrito está vacío
        return;
    }

    accionesCarritoElem.classList.remove('d-none'); // Mostrar botones si hay items

    carrito.forEach(item => {
        const totalItem = item.precio * item.cantidad;
        subtotalCalculado += totalItem;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td><img src="${item.imagen}" alt="${item.nombre}" width="60" class="rounded" onerror="this.onerror=null;this.src='https://placehold.co/60x60/F8C8DC/FFF?text=JM';"></td>
            <td>$${item.precio.toLocaleString('es-CO')}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" class="form-control form-control-sm mx-auto" style="width: 70px;" onchange="actualizarCantidad(${item.id}, this.value)">
            </td>
            <td>$${totalItem.toLocaleString('es-CO')}</td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </button></td>
        `;
        contenedorTabla.appendChild(fila);
    });

    const ivaCalculado = subtotalCalculado * 0.19; // IVA del 19%
    const totalCalculado = subtotalCalculado + ivaCalculado;

    subtotalElem.textContent = subtotalCalculado.toLocaleString('es-CO');
    ivaElem.textContent = ivaCalculado.toFixed(0).toLocaleString('es-CO');
    totalElem.textContent = totalCalculado.toFixed(0).toLocaleString('es-CO');
    actualizarContadorCarrito();
}

/**
 * Actualiza la cantidad de un item en el carrito.
 * @param {number} id - El ID del producto.
 * @param {number} nuevaCantidad - La nueva cantidad.
 */
function actualizarCantidad(id, nuevaCantidad) {
    let carrito = cargarCarrito();
    const cantidadNum = parseInt(nuevaCantidad);

    if (isNaN(cantidadNum) || cantidadNum < 1) {
        mostrarNotificacion("Cantidad inválida.", "danger");
        mostrarCarrito(); // Recargar para restaurar valor anterior si es inválido
        return;
    }

    const itemIndex = carrito.findIndex(p => p.id === id);
    if (itemIndex > -1) {
        carrito[itemIndex].cantidad = cantidadNum;
        localStorage.setItem('carritoJMAL', JSON.stringify(carrito));
        mostrarCarrito(); // Recargar la tabla del carrito con los nuevos totales
    }
}


/**
 * Elimina un producto del carrito.
 * @param {number} id - El ID del producto a eliminar.
 */
function eliminarDelCarrito(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carritoJMAL', JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar la vista del carrito
    mostrarNotificacion('Producto eliminado del carrito.', 'info');
    actualizarContadorCarrito();
}

/**
 * Vacía todo el carrito de compras.
 */
function vaciarCarrito() {
    // Usar un modal personalizado en lugar de confirm()
    const modalVaciar = new bootstrap.Modal(document.getElementById('confirmarVaciarModal'));
    if (modalVaciar) {
        modalVaciar.show();
        // El evento de confirmación se maneja en el HTML del modal
    } else { // Fallback si el modal no está listo (aunque debería)
        if (confirm("¿Estás segura de vaciar todo el carrito?")) {
            localStorage.removeItem('carritoJMAL');
            mostrarCarrito();
            mostrarNotificacion('Carrito vaciado.', 'warning');
            actualizarContadorCarrito();
        }
    }
}

/**
 * Simula el proceso de pago.
 */
function pagar() {
    const carrito = cargarCarrito();
    if (carrito.length === 0) {
        mostrarNotificacion("Tu carrito está vacío. Agrega productos antes de pagar.", "warning");
        return;
    }

    // Usar un modal personalizado en lugar de confirm()
    const modalPagar = new bootstrap.Modal(document.getElementById('confirmarPagarModal'));
    if (modalPagar) {
        modalPagar.show();
        // El evento de confirmación se maneja en el HTML del modal
    } else { // Fallback
        if (confirm("¿Deseas proceder con el pago de los productos seleccionados?")) {
            localStorage.removeItem('carritoJMAL');
            mostrarNotificacion("¡Gracias por tu compra en JMAL Cosméticos!", "success", 5000);
            mostrarCarrito(); // Actualiza la vista, ahora vacía
            actualizarContadorCarrito();
            // Opcionalmente redirigir a una página de agradecimiento
            // window.location.href = 'gracias.html';
        }
    }
}

/**
 * Muestra notificaciones personalizadas.
 * @param {string} mensaje - El mensaje a mostrar.
 * @param {string} tipo - El tipo de notificación (success, danger, info, warning).
 * @param {number} duracion - Duración en milisegundos.
 */
function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
    const contenedorNotificaciones = document.getElementById('notificaciones-toast');
    if (!contenedorNotificaciones) {
        // Fallback a alert si el contenedor no existe
        alert(mensaje);
        return;
    }

    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${tipo} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    contenedorNotificaciones.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: duracion });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

/**
 * Actualiza el contador de ítems en el ícono del carrito en la barra de navegación.
 */
function actualizarContadorCarrito() {
    const carrito = cargarCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contadorElemento = document.getElementById('contador-carrito-nav');

    if (contadorElemento) {
        contadorElemento.textContent = totalItems;
        if (totalItems > 0) {
            contadorElemento.classList.remove('d-none');
        } else {
            contadorElemento.classList.add('d-none');
        }
    }
}


// Inicialización cuando la ventana se carga
window.onload = function () {
    if (document.getElementById("contenedor-productos")) {
        mostrarProductos();
    }
    if (document.getElementById("tabla-carrito")) {
        mostrarCarrito();
    }
    actualizarContadorCarrito(); // Actualizar contador al cargar cualquier página

    // Event listener para el botón de confirmación de vaciar carrito en el modal
    const btnConfirmarVaciar = document.getElementById('btn-confirmar-vaciar');
    if (btnConfirmarVaciar) {
        btnConfirmarVaciar.addEventListener('click', () => {
            localStorage.removeItem('carritoJMAL');
            mostrarCarrito();
            mostrarNotificacion('Carrito vaciado.', 'warning');
            actualizarContadorCarrito();
            const modalVaciar = bootstrap.Modal.getInstance(document.getElementById('confirmarVaciarModal'));
            if (modalVaciar) modalVaciar.hide();
        });
    }

    // Event listener para el botón de confirmación de pagar en el modal
    const btnConfirmarPagar = document.getElementById('btn-confirmar-pagar');
    if (btnConfirmarPagar) {
        btnConfirmarPagar.addEventListener('click', () => {
            localStorage.removeItem('carritoJMAL');
            mostrarNotificacion("¡Gracias por tu compra en JMAL Cosméticos!", "success", 5000);
            mostrarCarrito();
            actualizarContadorCarrito();
            const modalPagar = bootstrap.Modal.getInstance(document.getElementById('confirmarPagarModal'));
            if (modalPagar) modalPagar.hide();
            // Opcionalmente redirigir: window.location.href = 'gracias.html';
        });
    }
};
