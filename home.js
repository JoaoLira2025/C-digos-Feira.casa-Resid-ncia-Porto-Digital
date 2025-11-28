// home.js (Sistema de Carrinho Unificado)
document.addEventListener('DOMContentLoaded', function() {

    console.log('Inicializando Home...');

    // ================================
    //     SISTEMA DE CARRINHO REAL
    // ================================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const total = cart.reduce((t, i) => t + i.quantity, 0);
        cartCount.textContent = total;
        cartCount.style.display = total > 0 ? "flex" : "none";
    }

    function addToCart(product) {
        const index = cart.findIndex(i => i.id === product.id);

        if (index >= 0) {
            cart[index].quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        updateCartCount();
        showMessage(`✔ ${product.name} adicionado ao carrinho!`, "success");
    }

    // Mensagem Bonita
    function showMessage(text, type) {
        const msg = document.createElement("div");
        msg.className = "cart-message";
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: bold;
            background: ${type === "success" ? "#28a745" : "#dc3545"};
            color: white;
            animation: fadeIn .3s;
            z-index: 99999;
        `;
        msg.textContent = text;
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.style.animation = "fadeOut .3s";
            setTimeout(() => msg.remove(), 300);
        }, 2500);
    }

    // ================================
    //         BOTÕES ADD TO CART
    // ================================
    function setupCartButtons() {
        const buttons = document.querySelectorAll(".add-to-cart-exact");

        buttons.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();

                const product = JSON.parse(btn.dataset.product);
                addToCart(product);
            });
        });
    }

    // ================================
    //           DROPDOWNS
    // ================================
    function setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(d => {
            const btn = d.querySelector('.dropdown-btn');
            const menu = d.querySelector('.dropdown-menu');

            btn.addEventListener("click", e => {
                e.stopPropagation();
                menu.classList.toggle("show");
            });
        });

        document.addEventListener("click", () => {
            document.querySelectorAll(".dropdown-menu.show")
                .forEach(m => m.classList.remove("show"));
        });
    }

    // ================================
    //        INICIALIZAÇÃO
    // ================================
    function init() {
        updateCartCount();
        setupCartButtons();
        setupDropdowns();
    }

    init();
});
