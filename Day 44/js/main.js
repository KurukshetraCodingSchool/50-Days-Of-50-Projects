// Interactions for My Factory Website

document.addEventListener('DOMContentLoaded', () => {

  // Global State
  let cart = JSON.parse(localStorage.getItem('sf_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('sf_wishlist')) || [];
  let currentCategory = 'all';
  let currentPrice = 'all';
  let isLoading = true; // Stage 8: Loading State

  // Theme State
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sf_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.querySelector('i').className = 'ri-moon-line';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('sf_theme', isLight ? 'light' : 'dark');
      themeToggle.querySelector('i').className = isLight ? 'ri-moon-line' : 'ri-sun-line';
    });
  }

  // --- 1. RENDER PRODUCTS (Stage 2, 3, 5, 6 & 8) ---
  const productGrid = document.getElementById('productGrid');

  const renderSkeletons = () => {
    if (productGrid) {
      productGrid.innerHTML = Array(4).fill(0).map(() => `
                <div class="product-card" style="pointer-events: none;">
                    <div class="skeleton" style="width: 100%; height: 250px; margin-bottom: 20px;"></div>
                    <div class="product-info">
                        <div class="skeleton" style="width: 40%; height: 15px; margin-bottom: 10px;"></div>
                        <div class="skeleton" style="width: 80%; height: 24px; margin-bottom: 15px;"></div>
                        <div class="skeleton" style="width: 100%; height: 40px;"></div>
                    </div>
                </div>
            `).join('');
    }
  };

  const renderProducts = (productsToRender = products) => {
    if (productGrid && typeof products !== 'undefined') {
      if (productsToRender.length === 0) {
        // No Results UI (Stage 6)
        productGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                        <i class="ri-search-line" style="font-size: 3rem; color: var(--text-muted);"></i>
                        <p style="color: var(--text-muted); margin-top: 10px;">No products found matching your criteria.</p>
                        <button class="btn-primary" id="clearFiltersBtn" style="margin-top: 20px;">Clear Filters</button>
                    </div>
                `;
        document.getElementById('clearFiltersBtn')?.addEventListener('click', resetFilters);
        return;
      }

      productGrid.innerHTML = productsToRender.map(product => {
        // Generate Stars
        const stars = Array(5).fill(0).map((_, i) => {
          if (i < Math.floor(product.rating)) return '<i class="ri-star-fill"></i>';
          if (i < product.rating) return '<i class="ri-star-half-fill"></i>';
          return '<i class="ri-star-line"></i>';
        }).join('');

        // Generate Sizes
        const sizesHtml = product.sizes.map(size =>
          `<button class="size-btn" data-size="${size}">${size}</button>`
        ).join('');

        // Wishlist State
        const isWishlisted = wishlist.includes(product.id);
        const heartClass = isWishlisted ? 'ri-heart-fill' : 'ri-heart-line';
        const heartColor = isWishlisted ? '#ff4757' : 'var(--text-main)';

        return `
                <div class="product-card" data-id="${product.id}">
                    <div class="img-container">
                        <img src="${product.image}" 
                             alt="${product.name}" 
                             class="main-img"
                             onmouseover="this.src='${product.hoverImage}'" 
                             onmouseout="this.src='${product.image}'">
                        <button class="wishlist-btn" data-id="${product.id}" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); color: ${heartColor}; font-size: 1.2rem; transition: 0.3s; z-index: 10;">
                            <i class="${heartClass}"></i>
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="rating" style="color: #ffc107; font-size: 0.9rem; margin-bottom: 5px;">
                            ${stars} <span style="color: var(--text-muted); font-size: 0.8rem;">(${product.reviews})</span>
                        </div>
                        <h3>${product.name}</h3>
                        
                        <!-- Stage 3: Size Selector -->
                        <div class="size-selector">
                            ${sizesHtml}
                        </div>

                        <div class="card-footer">
                            <span class="price">$${product.price.toFixed(2)}</span>
                            <button class="btn-icon add-cart-btn" data-id="${product.id}" title="Add to Cart">
                                <i class="ri-add-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `;
      }).join('');
    }
  };

  // Initial Load with Skeletons
  renderSkeletons();

  // Simulate Fetch Delay
  setTimeout(() => {
    isLoading = false;
    renderProducts();
  }, 1500);

  // --- FILTER LOGIC (Stage 6) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const priceFilter = document.getElementById('priceFilter');
  const resetBtn = document.getElementById('resetFilters');

  const applyFilters = () => {
    // Show skeletons briefly for realism on filter change
    renderSkeletons();

    setTimeout(() => {
      let filtered = products;

      // Category Filter
      if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.tags.includes(currentCategory));
      }

      // Price Filter
      if (currentPrice === 'low') filtered = filtered.filter(p => p.price < 100);
      if (currentPrice === 'mid') filtered = filtered.filter(p => p.price >= 100 && p.price <= 150);
      if (currentPrice === 'high') filtered = filtered.filter(p => p.price > 150);

      renderProducts(filtered);
    }, 500);
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      applyFilters();
    });
  });

  if (priceFilter) {
    priceFilter.addEventListener('change', (e) => {
      currentPrice = e.target.value;
      applyFilters();
    });
  }

  const resetFilters = () => {
    currentCategory = 'all';
    currentPrice = 'all';
    filterBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
    if (priceFilter) priceFilter.value = 'all';
    applyFilters();
  };

  if (resetBtn) resetBtn.addEventListener('click', resetFilters);


  // --- 2. GLOBAL EVENT LISTENERS & LOGIC ---

  // Size Selection & Wishlist Logic
  if (productGrid) {
    productGrid.addEventListener('click', (e) => {
      // Ignore clicks if loading
      if (productGrid.querySelector('.skeleton')) return;

      // Size Selection
      if (e.target.classList.contains('size-btn')) {
        const card = e.target.closest('.product-card');
        const buttons = card.querySelectorAll('.size-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
      }

      // Wishlist Toggle
      const wishlistBtn = e.target.closest('.wishlist-btn');
      if (wishlistBtn) {
        const id = parseInt(wishlistBtn.dataset.id);
        const index = wishlist.indexOf(id);

        if (index > -1) {
          wishlist.splice(index, 1);
          showToast('Removed from Wishlist', 'error');
        } else {
          wishlist.push(id);
          showToast('Added to Wishlist!', 'success');
        }

        localStorage.setItem('sf_wishlist', JSON.stringify(wishlist));

        // For wishlist toggle, we can just update the icon directly instead of full re-render
        // to avoid losing skeletons/filter state if we were in that mode, 
        // but re-render is safer for syncing.
        // Let's just manually toggle class for now to be smoother
        const heartIcon = wishlistBtn.querySelector('i');
        heartIcon.className = index > -1 ? 'ri-heart-line' : 'ri-heart-fill';
        wishlistBtn.style.color = index > -1 ? 'var(--text-main)' : '#ff4757';
      }
    });
  }

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container); // Just append to body
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '<i class="ri-check-line"></i>' : '<i class="ri-error-warning-line"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // --- 3. CART SYSTEM (Stage 4) ---
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartToggle = document.getElementById('cartToggle');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalCount = document.getElementById('cartTotalCount');
  const cartCountBadge = document.getElementById('cartCount');
  const cartTotalPrice = document.getElementById('cartTotalPrice');

  const toggleCart = () => {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  };

  if (cartToggle) cartToggle.addEventListener('click', toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
  if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

  const updateCartUI = () => {
    // Update Counts
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cartTotalCount) cartTotalCount.innerText = `(${totalItems})`;
    if (cartCountBadge) {
      cartCountBadge.innerText = totalItems;
      cartCountBadge.style.opacity = totalItems > 0 ? 1 : 0;
    }
    if (cartTotalPrice) cartTotalPrice.innerText = `$${totalPrice.toFixed(2)}`;

    // Render Items
    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="ri-shopping-bag-line" style="font-size: 3rem; color: var(--text-muted);"></i>
                        <p>Your cart is empty</p>
                        <button class="btn-primary" onclick="document.getElementById('closeCart').click()">Start Shopping</button>
                    </div>`;
      } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Size: ${item.size} | Color: Default</p>
                            <div class="item-controls">
                                <span class="price">$${item.price.toFixed(2)}</span>
                                <div class="quantity-control">
                                    <button onclick="updateQuantity(${index}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                                <button class="remove-btn" onclick="removeFromCart(${index})">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
      }
    }

    // Save to LocalStorage
    localStorage.setItem('sf_cart', JSON.stringify(cart));
  };

  // Add to Cart Logic with Validation
  if (productGrid) {
    productGrid.addEventListener('click', (e) => {
      if (productGrid.querySelector('.skeleton')) return;

      const btn = e.target.closest('.add-cart-btn');
      if (btn) {
        const card = btn.closest('.product-card');
        const selectedSizeBtn = card.querySelector('.size-btn.selected');
        const id = btn.dataset.id;
        const product = products.find(p => p.id == id);

        if (!selectedSizeBtn) {
          showToast('Please select a size first!', 'error');

          // Visual shake feedback (optional simple animation)
          const sizeSelector = card.querySelector('.size-selector');
          sizeSelector.style.transform = 'translateX(5px)';
          setTimeout(() => sizeSelector.style.transform = 'translateX(-5px)', 100);
          setTimeout(() => sizeSelector.style.transform = 'translateX(0)', 200);

          return;
        }

        const size = selectedSizeBtn.dataset.size;

        // Add to Cart array
        const existingItemIndex = cart.findIndex(item => item.id == id && item.size == size);
        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity++;
        } else {
          cart.push({
            ...product,
            size: size,
            quantity: 1
          });
        }

        updateCartUI();
        showToast(`Added ${product.name} (Size: ${size}) to cart!`);

        if (!cartSidebar.classList.contains('active')) {
          setTimeout(toggleCart, 500);
        }
      }
    });
  }

  // Expose Cart Functions to Window for HTML calls (onclick)
  window.updateQuantity = (index, change) => {
    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
    } else {
      if (cart[index].quantity === 1 && change === -1) {
        cart.splice(index, 1);
      }
    }
    updateCartUI();
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
    showToast('Item removed from cart', 'error'); // error color for removal
  };

  // Initialize UI
  updateCartUI();


  // Smooth scroll
  const scrollBtn = document.querySelector('header .btn button:first-child');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
