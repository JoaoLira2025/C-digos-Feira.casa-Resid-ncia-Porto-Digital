// ============================================
// CARRINHO.JS - Gerenciamento de Carrinho
// ============================================

// Funções de localStorage
function lerCarrinho() {
    try {
        const dados = localStorage.getItem('feiraCart');
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        console.error('Erro ao ler carrinho:', e);
        return [];
    }
}

function salvarCarrinho(carrinho) {
    try {
        localStorage.setItem('feiraCart', JSON.stringify(carrinho));
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
    }
}

function mostrarToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function atualizarBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        const carrinho = lerCarrinho();
        const total = carrinho.reduce((sum, item) => sum + (item.quantity || 1), 0);
        badge.textContent = total;
    }
}

// HOME - Adicionar ao carrinho
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-exact')) {
            const btn = e.target.closest('.add-to-cart-exact');
            const produtoJson = btn.getAttribute('data-product');
            
            if (!produtoJson) return;
            
            try {
                const produto = JSON.parse(produtoJson);

                // Se o objeto não trouxer imagem, tentar obtê-la do DOM próximo ao botão
                if (!produto.image || produto.image.includes('placeholder')) {
                    let imgSrc = null;
                    // procura dentro do cartão do produto
                    const card = btn.closest('.product-card-exact') || btn.closest('.product-card') || btn.closest('.product');
                    if (card) {
                        const imgEl = card.querySelector('.product-image-exact img') || card.querySelector('img');
                        if (imgEl) {
                            imgSrc = imgEl.getAttribute('src');
                            console.log('Imagem encontrada no card:', imgSrc);
                        }
                    }
                    // Se ainda não achou, tenta procurar no elemento pai
                    if (!imgSrc) {
                        const parent = btn.closest('div');
                        if (parent) {
                            const parentImg = parent.parentElement.querySelector('img');
                            if (parentImg) {
                                imgSrc = parentImg.getAttribute('src');
                                console.log('Imagem encontrada no parent:', imgSrc);
                            }
                        }
                    }
                    // último recurso: usar a imagem do data-product se existir
                    if (!imgSrc && produto.image) {
                        imgSrc = produto.image;
                    }
                    produto.image = imgSrc || 'imgs/Container.png';
                    console.log('Imagem final:', produto.image);
                }

                let carrinho = lerCarrinho();
                const existe = carrinho.find(item => item.id === produto.id);

                if (existe) {
                    existe.quantity = (existe.quantity || 1) + 1;
                } else {
                    carrinho.push({...produto, quantity: 1});
                }

                salvarCarrinho(carrinho);
                atualizarBadge();
                mostrarToast(`✓ ${produto.name} adicionado!`);
            } catch (err) {
                console.error('Erro ao adicionar:', err);
            }
        }
    });

    atualizarBadge();
});

// CARRINHO - Página de carrinho
let cartItemsContainer, emptyCartMessage, cartContent, subtotalElement, totalElement, discountElement;

document.addEventListener('DOMContentLoaded', function() {
    // Se não é página de carrinho, sair
    cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    emptyCartMessage = document.getElementById('emptyCartMessage');
    cartContent = document.querySelector('.cart-content');
    subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
    totalElement = document.querySelector('.summary-row.total span:last-child');
    discountElement = document.querySelector('.discount');
    
    const deliveryFee = 8.90;
    
    // Renderizar carrinho
    function renderCart() {
        const cart = lerCarrinho();
        
        if (cart.length === 0) {
            cartContent.style.display = 'none';
            emptyCartMessage.style.display = 'flex';
            return;
        }
        
        cartContent.style.display = 'flex';
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.dataset.id = item.id;
            
            const qtd = item.quantity || 1;
            const total = (item.price * qtd).toFixed(2);
            
            div.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-category">${item.category || ''}</p>
                    <p class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    <span class="quantity">${qtd}</span>
                    <button class="quantity-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-total">
                    <span>R$ ${total.replace('.', ',')}</span>
                </div>
                <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            
            cartItemsContainer.appendChild(div);
        });
        
        // Atualizar resumo
        const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        const desconto = subtotal > 50 ? 5 : 0;
        const total = subtotal + deliveryFee - desconto;
        
        if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        if (discountElement) discountElement.textContent = `- R$ ${desconto.toFixed(2).replace('.', ',')}`;
        if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        // Adicionar eventos
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                let c = lerCarrinho();
                const item = c.find(i => i.id === id);
                if (item) {
                    item.quantity = (item.quantity || 1) + 1;
                    salvarCarrinho(c);
                    renderCart();
                }
            };
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                let c = lerCarrinho();
                const item = c.find(i => i.id === id);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    salvarCarrinho(c);
                    renderCart();
                }
            };
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                if (confirm('Remover item?')) {
                    let c = lerCarrinho();
                    c = c.filter(i => i.id !== id);
                    salvarCarrinho(c);
                    atualizarBadge();
                    renderCart();
                    mostrarToast('✓ Removido!');
                }
            };
        });
    }
    
    // Botões de ação
    const btnContinuar = document.querySelector('.btn-continue');
    if (btnContinuar) {
        btnContinuar.onclick = () => window.location.href = 'home.html';
    }
    
    const btnFinalizar = document.querySelector('.btn-checkout');
    if (btnFinalizar) {
        btnFinalizar.onclick = () => {
            const c = lerCarrinho();
            if (c.length === 0) {
                alert('Carrinho vazio!');
                return;
            }
            alert(`Pedido finalizado! ${totalElement.textContent}`);
            localStorage.removeItem('feiraCart');
            renderCart();
            atualizarBadge();
        };
    }
    
    const btnComprar = document.querySelector('.btn-shopping');
    if (btnComprar) {
        btnComprar.onclick = () => window.location.href = 'home.html';
    }
    
    // Inicializar
    renderCart();
    atualizarBadge();
});