// Product data
const products = [
    {
        id: 1,
        name: "Premium Ceremonial Matcha",
        category: "matcha",
        price: 4800,
        image: "/placeholder.svg?height=250&width=300",
        description: "Finest grade matcha from Shizuoka's most prestigious tea gardens. Perfect for traditional tea ceremony."
    },
    {
        id: 2,
        name: "Organic Sencha Superior",
        category: "sencha",
        price: 2400,
        image: "/placeholder.svg?height=250&width=300",
        description: "First flush sencha with vibrant green color and refreshing taste. Grown without pesticides."
    },
    {
        id: 3,
        name: "Gyokuro Jade Dew",
        category: "gyokuro",
        price: 6800,
        image: "/placeholder.svg?height=250&width=300",
        description: "Shade-grown gyokuro with intense umami flavor. The pinnacle of Japanese green tea craftsmanship."
    },
    {
        id: 4,
        name: "Roasted Hojicha",
        category: "hojicha",
        price: 1800,
        image: "/placeholder.svg?height=250&width=300",
        description: "Gently roasted tea with nutty aroma and low caffeine. Perfect for evening relaxation."
    },
    {
        id: 5,
        name: "Culinary Grade Matcha",
        category: "matcha",
        price: 2800,
        image: "/placeholder.svg?height=250&width=300",
        description: "High-quality matcha perfect for lattes, desserts, and culinary creations."
    },
    {
        id: 6,
        name: "Daily Sencha Blend",
        category: "sencha",
        price: 1600,
        image: "/placeholder.svg?height=250&width=300",
        description: "Balanced sencha blend for daily enjoyment. Great value without compromising quality."
    },
    {
        id: 7,
        name: "Imperial Gyokuro",
        category: "gyokuro",
        price: 12000,
        image: "/placeholder.svg?height=250&width=300",
        description: "Ultra-premium gyokuro reserved for special occasions. Unparalleled depth and complexity."
    },
    {
        id: 8,
        name: "Genmaicha Comfort",
        category: "hojicha",
        price: 2000,
        image: "/placeholder.svg?height=250&width=300",
        description: "Sencha blended with roasted rice for a nutty, comforting flavor profile."
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.querySelector('.cart-btn');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartUI();
});

// Display products
function displayProducts(productsToShow) {
    productGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">¥${product.price.toLocaleString()}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    displayCartItems();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        displayCartItems();
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();
}

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>¥${item.price.toLocaleString()} each</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Filter products
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.filter);
        });
    });
    
    // Cart modal
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        displayCartItems();
    });
    
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Simple checkout simulation
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const message = `Thank you for your order!\n\nTotal: ¥${total.toLocaleString()}\n\nWe will contact you soon to arrange payment and shipping.`;
        
        alert(message);
        cart = [];
        updateCartUI();
        cartModal.style.display = 'none';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4a7c59;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #2d5016;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);