document.addEventListener('DOMContentLoaded', () => {
    // --- Shopping Cart Logic (Client-side Simulation) ---
    let cart = JSON.parse(localStorage.getItem('parrotCart')) || [];

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    function saveCart() {
        localStorage.setItem('parrotCart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(productId, productName, productPrice) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: `https://via.placeholder.com/80x80?text=Product+${productId}` // Placeholder image
            });
        }
        saveCart();
        alert(`${productName} added to cart!`);
    }

    // Event listener for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = parseFloat(event.target.dataset.productPrice);
            addToCart(productId, productName, productPrice);
        });
    });

    // --- Cart Page Specific Logic ---
    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotalElement = document.getElementById('cart-total');

        if (!cartItemsContainer || !cartTotalElement) return; // Not on the cart page

        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button class="increase-quantity" data-product-id="${item.id}">+</button>
                    </div>
                    <button class="cart-item-remove" data-product-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }

        cartTotalElement.textContent = total.toFixed(2);
        addCartItemEventListeners();
    }

    function addCartItemEventListeners() {
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity++;
                    saveCart();
                    renderCartItems();
                }
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const item = cart.find(i => i.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                    renderCartItems();
                }
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                cart = cart.filter(item => item.id !== productId);
                saveCart();
                renderCartItems();
            });
        });
    }

    // Call renderCartItems if on the cart page
    if (document.getElementById('cart-items-container')) {
        renderCartItems();
    }

    // --- Chat Modal Logic ---
    const chatModal = document.getElementById('chat-modal');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.querySelector('#chat-modal .close-button');
    const chatInput = document.querySelector('#chat-modal .chat-input');
    const chatSendBtn = document.querySelector('#chat-modal .chat-send-btn');
    const chatWindow = document.querySelector('#chat-modal .chat-window');

    if (openChatBtn && chatModal) {
        openChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatModal.style.display = 'flex'; // Use flex to center
        });
    }

    if (closeChatBtn && chatModal) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });
    }

    // Close modal if clicked outside content
    if (chatModal) {
        window.addEventListener('click', (event) => {
            if (event.target === chatModal) {
                chatModal.style.display = 'none';
            }
        });
    }

    // Simulate sending a message (client-side only)
    if (chatSendBtn && chatInput && chatWindow) {
        const sendMessage = () => {
            const messageText = chatInput.value.trim();
            if (messageText) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', 'sent');
                messageElement.textContent = messageText;
                chatWindow.appendChild(messageElement);
                chatInput.value = ''; // Clear input
                chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

                // Simulate a reply after a short delay
                setTimeout(() => {
                    const replyElement = document.createElement('div');
                    replyElement.classList.add('message', 'received');
                    replyElement.textContent = "Thank you for your message! A representative will be with you shortly.";
                    chatWindow.appendChild(replyElement);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                }, 1500);
            }
        };

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // --- Form Submission Simulation (Login, Register, Create Product) ---
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const createProductForm = document.getElementById('create-product-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login attempt simulated. In a real app, this would send data to a server.');
            // Here you would typically send data to a backend for authentication
            // fetch('/api/login', { method: 'POST', body: new FormData(loginForm) })
            // .then(response => response.json())
            // .then(data => console.log(data));
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Registration attempt simulated. In a real app, this would create a new user on the server.');
        });
    }

    if (createProductForm) {
        createProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Product creation simulated. In a real app, this would upload product data to a server and database.');
            createProductForm.reset(); // Clear form after "submission"
        });
    }

    // Initial cart count update on page load
    updateCartCount();
});

