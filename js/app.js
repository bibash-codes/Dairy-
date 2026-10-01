// Gautam Dairy Products Data
const products = [
  {
    id: 1,
    name: "Pure Fresh Milk",
    category: "milk",
    price: 110,
    unit: "per Liter",
    desc: "100% pure organic cow & buffalo milk straight from Okhaldhunga hills.",
    img: "images/milk.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Village Fresh Curd (Dahi)",
    category: "curd",
    price: 140,
    unit: "per Liter",
    desc: "Thick, traditional handmade village dahi full of natural probiotics.",
    img: "images/curd.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Pure Grass-Fed Ghee",
    category: "ghee",
    price: 1400,
    unit: "per Kg",
    desc: "Aromatic, golden, slow-cooked pure clarified butter.",
    img: "images/ghee.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Fresh Soft Paneer",
    category: "paneer",
    price: 800,
    unit: "per Kg",
    desc: "Hygienically prepared, rich, and high-protein fresh paneer blocks.",
    img: "images/paneer.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    name: "Country Cream Butter",
    category: "paneer",
    price: 950,
    unit: "per Kg",
    desc: "Unsalted organic churned butter made from fresh village cream.",
    img: "images/butter.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600"
  }
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalRs = document.getElementById("cartTotalRs");
const filterBtns = document.querySelectorAll(".filter-btn");

// Render Products Grid
function renderProducts(category = "all") {
  productsGrid.innerHTML = "";
  
  const filtered = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null; this.src='${product.fallbackImg}';">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-bottom">
          <div class="product-price">Rs. ${product.price} <span style="font-size:12px; font-weight:normal; color:#64748b;">${product.unit}</span></div>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Filter Button Click Handlers
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

// Cart Functions
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingIndex = cart.findIndex(item => item.id === id);

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  toggleCart(true);
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalItems;
  cartTotalRs.textContent = `Rs. ${totalPrice}`;

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align:center; color:#64748b; margin-top:20px;'>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <span style="font-size:13px; color:#64748b;">Rs. ${item.price} x ${item.qty}</span>
      </div>
      <div>
        <strong style="color:var(--primary)">Rs. ${item.price * item.qty}</strong>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });
}

function toggleCart(open) {
  if (open) {
    cartOverlay.style.display = "block";
    cartDrawer.classList.add("open");
  } else {
    cartOverlay.style.display = "none";
    cartDrawer.classList.remove("open");
  }
}

// Event Listeners for Cart
openCartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! Please call +977 9845678789 to confirm delivery details.");
  cart = [];
  updateCartUI();
  toggleCart(false);
});

// Initial Render
renderProducts();