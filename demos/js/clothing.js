// 1. DATABASE
// We arrange this specifically: 2 Shirts first, then 2 Hoodies.
// Ensure you have renamed your images to match: p1.jpg, p2.jpg, p3.jpg, p4.jpg
const products = [
    { id: 1, name: "Girlpower T-Shirt", price: 279, category: "t-shirt", image: "assets/p1.jpg" },
    { id: 2, name: "HNDV2 T-Shirt", price: 279, category: "t-shirt", image: "assets/p2.jpg" },
    { id: 3, name: "Jane 4 Hoodie Red", price: 550, category: "hoodie", image: "assets/p3.jpg" }, 
    { id: 4, name: "Jane 4 Hoodie Blk", price: 550, category: "hoodie", image: "assets/p4.jpg" } 
];

let cart = [];

// 2. PAGE NAVIGATION
function hideAllViews() {
    document.getElementById('view-home').style.display = 'none';
    document.getElementById('view-category').style.display = 'none';
    document.getElementById('view-product').style.display = 'none';
    window.scrollTo(0,0);
}

function goHome() {
    hideAllViews();
    document.getElementById('view-home').style.display = 'block';
}

function openCategory(category) {
    hideAllViews();
    document.getElementById('view-category').style.display = 'block';
    
    // Set Title
    const title = category === 't-shirt' ? "T-SHIRTS" : "HOODIES";
    document.getElementById('cat-title').innerText = title;

    // Render Grid
    const grid = document.getElementById('category-grid');
    grid.innerHTML = "";
    products.filter(p => p.category === category).forEach(p => {
        grid.innerHTML += createProductCard(p);
    });
}

// === SINGLE PRODUCT PAGE ===
function openProduct(id) {
    hideAllViews();
    const p = products.find(item => item.id === id);
    
    // Fill Info
    document.getElementById('detail-img').src = p.image;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = "R " + p.price + ".00";
    
    // Setup 'Add to Bag' Button
    const btn = document.getElementById('detail-add-btn');
    // Remove old listeners to prevent double adds
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.onclick = function() { addToCart(p.id); };
    
    document.getElementById('view-product').style.display = 'block';
}

function scrollToCategories() {
    document.getElementById('categories').scrollIntoView({behavior: 'smooth'});
}

// 3. RENDER HOME PAGE (Featured)
function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = "";
    // Show first 4 items (2 Shirts, 2 Hoodies)
    products.slice(0, 4).forEach(p => {
        grid.innerHTML += createProductCard(p);
    });
}

// Helper: Create HTML Card
function createProductCard(p) {
    return `
        <div class="product-card">
            <div class="p-img-box" onclick="openProduct(${p.id})">
                <img src="${p.image}" class="p-img">
            </div>
            <div class="p-details">
                <h3 onclick="openProduct(${p.id})">${p.name}</h3>
                <div class="price-row">
                    <span class="price">R ${p.price}.00</span>
                    <button class="add-btn" onclick="addToCart(${p.id})">+</button>
                </div>
            </div>
        </div>`;
}

// 4. CART LOGIC
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
    if(document.getElementById('chk-total')) {
         document.getElementById('chk-total').innerText = "R " + (total + 100) + ".00";
    }
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// 5. CHECKOUT LOGIC
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