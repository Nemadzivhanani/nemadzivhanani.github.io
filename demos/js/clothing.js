// 1. DATABASE (Added Hoodies)
const products = [
    { id: 1, name: "Girlpower T-Shirt", price: 279, category: "t-shirt", image: "assets/p1.jpg" },
    { id: 2, name: "HNDV2 T-Shirt", price: 279, category: "t-shirt", image: "assets/p2.jpg" },
    { id: 3, name: "Esoweto T-Shirt", price: 365, category: "t-shirt", image: "assets/p3.jpg" },
    { id: 4, name: "Mandate T-Shirt", price: 365, category: "t-shirt", image: "assets/p4.jpg" },
    // Adding 2 Hoodies (You need to ensure images exist for these or reuse existing)
    { id: 5, name: "Jane 4 Hoodie Red", price: 550, category: "hoodie", image: "assets/p1.jpg" }, 
    { id: 6, name: "Jane 4 Hoodie Blk", price: 550, category: "hoodie", image: "assets/p2.jpg" } 
];

let cart = [];

// 2. PAGE NAVIGATION
function goHome() {
    document.getElementById('view-home').style.display = 'block';
    document.getElementById('view-category').style.display = 'none';
    window.scrollTo(0,0);
}

function openCategory(category) {
    document.getElementById('view-home').style.display = 'none';
    document.getElementById('view-category').style.display = 'block';
    
    // Set Title
    const title = category === 't-shirt' ? "T-SHIRTS" : "HOODIES";
    document.getElementById('cat-title').innerText = title;

    // Render Items
    const grid = document.getElementById('category-grid');
    grid.innerHTML = "";
    
    const items = products.filter(p => p.category === category);
    items.forEach(p => {
        grid.innerHTML += createProductCard(p);
    });
    window.scrollTo(0,0);
}

function scrollToCategories() {
    document.getElementById('categories').scrollIntoView({behavior: 'smooth'});
}

// 3. RENDER FEATURED (Home Page)
function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = "";
    
    // Pick first 4 items as featured
    const featured = products.slice(0, 4); 
    featured.forEach(p => {
        grid.innerHTML += createProductCard(p);
    });
}

// Helper to make card HTML
function createProductCard(p) {
    return `
        <div class="product-card">
            <div class="p-img-box"><img src="${p.image}" class="p-img"></div>
            <div class="p-details">
                <h3>${p.name}</h3>
                <div class="price-row">
                    <span class="price">R ${p.price}.00</span>
                    <button class="add-btn" onclick="addToCart(${p.id})">+</button>
                </div>
            </div>
        </div>`;
}

// 4. CART LOGIC (Same as before)
function addToCart(id) {
    cart.push(products.find(p => p.id === id));
    updateCartUI();
    toggleCart(); 
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    let total = 0;
    
    if (cart.length === 0) list.innerHTML = '<p class="empty-msg">Your bag is empty.</p>';
    else {
        list.innerHTML = "";
        cart.forEach(item => {
            total += item.price;
            list.innerHTML += `<div class="cart-item"><img src="${item.image}" class="cart-img"><div class="item-info"><h4>${item.name}</h4><span>R ${item.price}.00</span></div></div>`;
        });
    }
    document.getElementById('cart-total').innerText = "R " + total + ".00";
    document.getElementById('chk-total').innerText = "R " + (total + 100) + ".00";
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// 5. CHECKOUT (Same as before)
function openCheckout() {
    if (cart.length === 0) return alert("Your bag is empty.");
    toggleCart();
    document.getElementById('checkout-modal').classList.add('active');
    document.getElementById('checkout-step-1').style.display = 'block';
    document.getElementById('checkout-step-2').style.display = 'none';
}

function closeCheckout() { document.getElementById('checkout-modal').classList.remove('active'); }

function processPayment() {
    const btn = document.getElementById('pay-btn');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('checkout-step-1').style.display = 'none';
        document.getElementById('checkout-step-2').style.display = 'block';
        cart = []; updateCartUI();
        btn.innerText = originalText; btn.style.opacity = "1"; btn.disabled = false;
    }, 2000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
});