
// Função para adicionar produto ao carrinho
function addToCart(productId, productName, productPrice, productImage) {
    // Recupera o carrinho do localStorage ou cria um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.id === productId);
    
    if(existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    // Atualiza o localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Produto adicionado ao carrinho!');
    updateCartCount();
}

// Função para remover item do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Atualiza a página para mostrar as mudanças
    updateCartCount();
}

// Função para calcular total do carrinho
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Função para exibir o carrinho na página
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrinho vazio</p>';
        totalContainer.textContent = 'R$ 0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <tr>
            <td>
                <img src="${item.image}" alt="${item.name}" width="80">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Preço unitário: R$ ${item.price.toFixed(2)}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart('${item.id}')">Remover</button>
                </div>
            </td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    totalContainer.textContent = `R$ ${calculateTotal().toFixed(2)}`;
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Chama a função displayCart quando a página da sacola é carregada
if (document.getElementById('cart-items')) {
    displayCart();
}

// Atualiza a contagem de itens no carrinho ao carregar a página
updateCartCount();

// Função para pesquisar produtos
function searchProducts() {
    let input = document.querySelector('.search-bar').value.toLowerCase();
    let productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        let productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


