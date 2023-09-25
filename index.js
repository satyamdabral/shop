const apiUrl = 'https://fakestoreapi.com/products';
let products;
let filteredProducts = [];
let count = 0;
const cart = [];

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);
        products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(productsToRender) {
    const allProductsContainer = document.getElementById('all-products');
    allProductsContainer.innerHTML = '';

    productsToRender.forEach((product) => {
        const productCard = createProductCard(product);
        allProductsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;

    productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.id, product.price, product.title);
    });

    return productCard;
}

function addToCart(id, price, title) {
    count++;
    document.getElementById("total-Products").innerText = count;
    cart.push({ id, title, price });
    renderCart();
}

function renderCart() {
    const totalPriceElement = document.getElementById('price');
    const totalAmountPayable = document.getElementById('total');

    let totalPrice = 0;

    cart.forEach((product) => {
        totalPrice += product.price;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
    totalAmountPayable.innerText = (Number(totalPrice) + 20).toFixed(2);
}

document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.trim();
    
    if (searchQuery !== '') {
        filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        renderProducts(filteredProducts);
    } else {
        renderProducts(products);
    }
});

fetchAndDisplayProducts();

