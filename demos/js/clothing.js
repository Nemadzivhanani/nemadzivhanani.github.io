// 1. DATABASE
const products = [
    { id: 1, name: "Girlpower T-Shirt", price: 279, category: "t-shirt", image: "assets/p1.jpg" },
    { id: 2, name: "HNDV2 T-Shirt", price: 279, category: "t-shirt", image: "assets/p2.jpg" },
    { id: 3, name: "Esoweto T-Shirt", price: 365, category: "t-shirt", image: "assets/p3.jpg" },
    { id: 4, name: "Mandate T-Shirt", price: 365, category: "t-shirt", image: "assets/p4.jpg" },
    { id: 5, name: "Jane 4 Cap", price: 150, category: "headwear", image: "assets/p5.jpg" }
];
let cart = [];

// 2. RENDER
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ""; 
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="p-img-box"><img src="${p.image}" class="p-img"></div>
                <div class="p-details">
                    <h3>${p.name}</h3>
                    <div class="price-row"><span class="price">R ${p.price}.00</span><button class="add-btn" onclick="addToCart(${p.id})">+</button></div>
                </div>
            </div>`;
    });
}
function filterProducts(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(cat);
}

// 3. CART LOGIC
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
    
    // Update Checkout Totals too
    document.getElementById('chk-sub').innerText = "R " + total + ".00";
    document.getElementById('chk-total').innerText = "R " + (total + 100) + ".00"; // +100 Shipping
}
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// 4. CHECKOUT SIMULATION (THE NEW PART)
function openCheckout() {
    if (cart.length === 0) return alert("Your bag is empty.");
    toggleCart(); // Close sidebar
    document.getElementById('checkout-modal').classList.add('active'); // Open Modal
    document.getElementById('checkout-step-1').style.display = 'block';
    document.getElementById('checkout-step-2').style.display = 'none';
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function processPayment() {
    const btn = document.getElementById('pay-btn');
    const originalText = btn.innerText;
    
    // 1. Change button to "Processing..."
    btn.innerText = "Processing...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // 2. Fake Wait Time (2 Seconds)
    setTimeout(() => {
        // 3. Show Success Screen
        document.getElementById('checkout-step-1').style.display = 'none';
        document.getElementById('checkout-step-2').style.display = 'block';
        
        // Reset Cart
        cart = [];
        updateCartUI();
        
        // Reset Button
        btn.innerText = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => { renderProducts(); });