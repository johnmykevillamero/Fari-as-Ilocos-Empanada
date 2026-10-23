let products = [];
let bag = [];
let feedbacks = [];
let isAdminLoggedIn = false;
let adminAccount = { user: 'admin', pass: 'farinas123' };

// LOAD XML MENU
function loadXMLMenu() {
    fetch('products.xml?t=' + new Date().getTime())
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.getElementsByTagName("item");
            products = [];
            for (let i = 0; i < items.length; i++) {
                products.push({
                    id: parseInt(items[i].getElementsByTagName("id")[0].textContent),
                    category: items[i].getElementsByTagName("category")[0].textContent,
                    name: items[i].getElementsByTagName("name")[0].textContent,
                    price: parseFloat(items[i].getElementsByTagName("price")[0].textContent),
                    status: items[i].getElementsByTagName("status")[0].textContent,
                    description: items[i].getElementsByTagName("description")[0].textContent,
                    image: items[i].getElementsByTagName("image")[0].textContent
                });
            }
            renderMenu();
            renderAdminPanel();
        })
        .catch(err => console.error("Error loading products XML:", err));
}

// LOAD XML FEEDBACKS
function loadXMLFeedbacks() {
    fetch('feedbacks.xml?t=' + new Date().getTime())
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.getElementsByTagName("feedback");
            feedbacks = [];
            for (let i = 0; i < items.length; i++) {
                feedbacks.unshift({
                    id: items[i].getElementsByTagName("id")[0].textContent,
                    name: items[i].getElementsByTagName("name")[0].textContent,
                    comment: items[i].getElementsByTagName("comment")[0].textContent,
                    date: items[i].getElementsByTagName("date")[0].textContent
                });
            }
            renderFeedbacks();
        })
        .catch(err => console.error("Error loading feedbacks XML:", err));
}

// RENDER MENU
function renderMenu() {
    const container = document.getElementById('menuGrid');
    if (!container) return;

    container.innerHTML = products.map(item => {
        const isSoldOut = item.status === 'SOLD_OUT';
        const badgeClass = isSoldOut ? 'bg-red-100 text-red-800 border-red-300' : 'bg-green-100 text-green-800 border-green-300';

        return `
            <div class="product-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between" data-status="${item.status}" data-name="${item.name.toLowerCase()}">
                <div>
                    <div class="relative h-40 overflow-hidden bg-gray-100">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                        <span class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}">
                            ${item.status}
                        </span>
                    </div>
                    <div class="p-3">
                        <span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">${item.category}</span>
                        <div class="flex justify-between items-start my-1">
                            <h4 class="font-bold text-gray-800 text-sm">${item.name}</h4>
                            <span class="text-brand-orange font-extrabold text-sm">₱${item.price}</span>
                        </div>
                        <p class="text-xs text-gray-500 line-clamp-2">${item.description}</p>
                    </div>
                </div>
                <div class="p-3 pt-0">
                    ${!isSoldOut ? 
                        `<button onclick="addToBag('${item.name}', ${item.price})" class="w-full brand-orange text-white py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">
                            + Add to Bag
                        </button>` :
                        `<button disabled class="w-full bg-gray-200 text-gray-400 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed">
                            Unavailable
                        </button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

// ADMIN LOGIN LOGIC
function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (u === adminAccount.user && p === adminAccount.pass) {
        isAdminLoggedIn = true;
        toggleLoginModal();
        document.getElementById('authNav').innerHTML = `
            <button onclick="toggleAdminDrawer()" class="brand-green text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold mr-1">
                <i class="fa-solid fa-sliders"></i> Admin Panel
            </button>
            <button onclick="logoutAdmin()" class="bg-red-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        `;
        renderFeedbacks();
        toggleAdminDrawer();
    } else {
        document.getElementById('loginError').innerText = 'Invalid username or password!';
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('authNav').innerHTML = `
        <button onclick="toggleLoginModal()" class="brand-orange text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            <i class="fa-solid fa-lock mr-1"></i> Admin Login
        </button>
    `;
    renderFeedbacks();
    toggleAdminDrawer();
}

// ADMIN MENU EDIT
function renderAdminPanel() {
    const list = document.getElementById('adminItemsList');
    if (!list) return;

    list.innerHTML = products.map(item => `
        <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-gray-800">${item.name}</span>
                <select id="admin-status-${item.id}" class="text-xs font-bold px-1.5 py-0.5 rounded border">
                    <option value="AVAILABLE" ${item.status === 'AVAILABLE' ? 'selected' : ''}>AVAILABLE</option>
                    <option value="SOLD_OUT" ${item.status === 'SOLD_OUT' ? 'selected' : ''}>SOLD OUT</option>
                </select>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">Price (₱):</span>
                <input type="number" id="admin-price-${item.id}" value="${item.price}" class="w-full text-xs px-2 py-1 border rounded">
            </div>
        </div>
    `).join('');
}

function saveAdminChangesToXML() {
    const updatedItems = products.map(item => ({
        id: item.id,
        status: document.getElementById(`admin-status-${item.id}`).value,
        price: parseFloat(document.getElementById(`admin-price-${item.id}`).value)
    }));

    fetch('update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_menu', items: updatedItems })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Menu changes saved to XML!");
            loadXMLMenu();
            toggleAdminDrawer();
        } else {
            alert("Error: " + data.message);
        }
    });
}

// FEEDBACK SYSTEM
function toggleAnonymous() {
    const isAnon = document.getElementById('isAnonymous').checked;
    const nameInput = document.getElementById('feedbackName');
    if (isAnon) {
        nameInput.value = "";
        nameInput.disabled = true;
        nameInput.placeholder = "Posting as Anonymous";
    } else {
        nameInput.disabled = false;
        nameInput.placeholder = "Your Name";
    }
}

function updateCharCount() {
    const text = document.getElementById('feedbackText').value;
    document.getElementById('charCount').innerText = text.length;
}

function submitFeedback(e) {
    e.preventDefault();
    const isAnon = document.getElementById('isAnonymous').checked;
    let name = document.getElementById('feedbackName').value.trim();
    const comment = document.getElementById('feedbackText').value.trim();

    if (isAnon || !name) name = "Anonymous Customer";

    fetch('update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_feedback', name, comment })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your feedback!');
            document.getElementById('feedbackText').value = "";
            document.getElementById('feedbackName').value = "";
            document.getElementById('isAnonymous').checked = false;
            document.getElementById('feedbackName').disabled = false;
            document.getElementById('charCount').innerText = "0";
            loadXMLFeedbacks();
        }
    });
}

function renderFeedbacks() {
    const list = document.getElementById('feedbackList');
    if (!list) return;

    if (feedbacks.length === 0) {
        list.innerHTML = `<p class="text-xs text-gray-400 text-center py-2">No reviews yet.</p>`;
        return;
    }

    list.innerHTML = feedbacks.map(fb => `
        <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg text-xs space-y-1 relative">
            <div class="flex justify-between items-center font-bold text-gray-700 pr-6">
                <span><i class="fa-solid fa-user-circle text-orange-500 mr-1"></i> ${fb.name}</span>
                <span class="text-[10px] text-gray-400">${fb.date}</span>
            </div>
            <p class="text-gray-600 pl-4 break-words">${fb.comment}</p>
            ${isAdminLoggedIn ? `
                <button onclick="deleteFeedback('${fb.id}')" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold p-1 bg-red-50 rounded border" title="Delete Feedback">
                    <i class="fa-solid fa-trash"></i>
                </button>
            ` : ''}
        </div>
    `).join('');
}

function deleteFeedback(id) {
    if (confirm('Admin: Are you sure you want to delete this customer feedback?')) {
        fetch('update.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete_feedback', id })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Feedback deleted from XML!');
                loadXMLFeedbacks();
            }
        });
    }
}

// CART & MODAL CONTROLS
function toggleBag() { document.getElementById('bagDrawer').classList.toggle('translate-x-full'); }
function toggleLoginModal() { document.getElementById('loginModal').classList.toggle('hidden'); }
function toggleAdminDrawer() { document.getElementById('adminDrawer').classList.toggle('translate-x-full'); }

function addToBag(name, price) {
    bag.push({ name, price });
    updateBagUI();
    toggleBag();
}

function removeFromBag(i) {
    bag.splice(i, 1);
    updateBagUI();
}

function updateBagUI() {
    const container = document.getElementById('bagItems');
    const totalEl = document.getElementById('bagTotal');
    const countEl = document.getElementById('bag-count');
    if (!container) return;

    countEl.innerText = bag.length;
    if (bag.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-8">Your bag is empty.</p>`;
        totalEl.innerText = '₱0';
        return;
    }

    let total = 0;
    container.innerHTML = bag.map((item, i) => {
        total += item.price;
        return `
            <div class="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded border">
                <div>
                    <p class="font-bold text-gray-800">${item.name}</p>
                    <p class="text-brand-orange font-semibold">₱${item.price}</p>
                </div>
                <button onclick="removeFromBag(${i})" class="text-red-500 font-bold">&times;</button>
            </div>
        `;
    }).join('');

    totalEl.innerText = `₱${total}`;
}

function filterStatus(status) {
    document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('bg-gray-800', 'text-white'));
    event.target.classList.add('bg-gray-800', 'text-white');

    document.querySelectorAll('.product-card').forEach(card => {
        if (status === 'ALL' || card.dataset.status === status) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function filterMenu() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.dataset.name.includes(q)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

window.onload = function() {
    loadXMLMenu();
    loadXMLFeedbacks();
};
