let adminAccount = JSON.parse(localStorage.getItem('farinas_auth')) || { user: 'admin', pass: 'farinas123' };

let webDetails = JSON.parse(localStorage.getItem('farinas_web_details')) || {
    title: "Fariñas Ilocos Empanada",
    sub: "San Mateo Branch",
    pfp: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=100&q=80"
};

const defaultProducts = [
    { id: 1, category: "Ilocos Empanada", name: "Regular Empanada", price: 65, status: "AVAILABLE", description: "1 Egg, Vegetables", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80" },
    { id: 2, category: "Ilocos Empanada", name: "Special Eggless Empanada", price: 80, status: "AVAILABLE", description: "1 Longganisa, Vegetables", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },
    { id: 3, category: "Ilocos Empanada", name: "Special Empanada", price: 95, status: "AVAILABLE", description: "1 Egg, 1 Longganisa, Vegetables", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&q=80" },
    { id: 4, category: "Ilocos Empanada", name: "Double Egg Empanada", price: 115, status: "AVAILABLE", description: "2 Eggs, 1 Longganisa, Vegetables", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },
    { id: 5, category: "Ilocos Empanada", name: "Extra Special Empanada", price: 130, status: "AVAILABLE", description: "1 Egg, 2 Longganisa, Vegetables", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80" },
    { id: 6, category: "Ilocos Empanada", name: "Super Special Empanada", price: 140, status: "AVAILABLE", description: "2 Eggs, 2 Longganisa, Vegetables", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&q=80" },
    { id: 7, category: "Ilocos Empanada", name: "Ultimate Empanada", price: 160, status: "AVAILABLE", description: "1 Egg, 1 Longganisa, Bagnet, Vegetables", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80" },
    { id: 8, category: "Ilocos Empanada", name: "All Meat Empanada", price: 135, status: "AVAILABLE", description: "3 pcs Longganisa, 1 Egg", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },

    { id: 9, category: "Empanada Box Promo", name: "Box of 5 Special Empanada", price: 430, status: "AVAILABLE", description: "Save ₱45 - Box of 5 Special Empanadas", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&q=80" },
    { id: 10, category: "Empanada Box Promo", name: "Box of 8 Special Empanada", price: 670, status: "AVAILABLE", description: "Save ₱90 - Box of 8 Special Empanadas", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&q=80" },

    { id: 11, category: "Ilocos Rice Meals", name: "Bagnet Rice Meal", price: 180, status: "AVAILABLE", description: "Crispy Bagnet served with Rice & Egg", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
    { id: 12, category: "Ilocos Rice Meals", name: "Longganisa Rice Meal", price: 155, status: "AVAILABLE", description: "Ilocos Longganisa served with Rice & Egg", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
    { id: 13, category: "Ilocos Rice Meals", name: "Bagnet Sisig Rice Meal", price: 185, status: "AVAILABLE", description: "Sizzling Bagnet Sisig with Rice & Egg", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },

    { id: 14, category: "Ilocos Specialties", name: "Dinakdakan", price: 250, status: "AVAILABLE", description: "Traditional Ilocano Pork Specialty", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
    { id: 15, category: "Ilocos Specialties", name: "Pinakbet with Bagnet", price: 285, status: "AVAILABLE", description: "Mixed Vegetables topped with Crispy Bagnet", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },

    { id: 16, category: "Pancit Miki Meals", name: "Special Empanada & Pancit Miki", price: 165, status: "AVAILABLE", description: "Special Empanada served with Hot Pancit Miki Soup", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80" },

    { id: 17, category: "Extras", name: "1 Whole Egg", price: 20, status: "AVAILABLE", description: "Extra Egg", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80" },
    { id: 18, category: "Extras", name: "1 Longganisa", price: 35, status: "AVAILABLE", description: "Extra Ilocos Longganisa", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },
    { id: 19, category: "Extras", name: "Sukang Iloko Bottle", price: 110, status: "AVAILABLE", description: "Signature Ilocos Vinegar Bottle", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80" },

    { id: 20, category: "Drinks", name: "Bottled Water 350ml", price: 22, status: "AVAILABLE", description: "Purified Drinking Water", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
    { id: 21, category: "Drinks", name: "Iced Tea 350ml", price: 40, status: "AVAILABLE", description: "Refreshing House Blend Iced Tea", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" }
];

let products = JSON.parse(localStorage.getItem('farinas_products')) || defaultProducts;
let bag = JSON.parse(localStorage.getItem('farinas_cart')) || [];
let feedbacks = JSON.parse(localStorage.getItem('farinas_feedbacks')) || [];
let isAdminLoggedIn = false;

function applyWebDetails() {
    document.getElementById('webTitle').innerText = webDetails.title;
    document.getElementById('webSub').innerHTML = `<i class="fa-solid fa-location-dot text-red-500"></i> ${webDetails.sub}`;
    document.getElementById('webPfp').src = webDetails.pfp;
    document.getElementById('footerTitle').innerText = webDetails.title + " - " + webDetails.sub;
    
    document.getElementById('editWebTitle').value = webDetails.title;
    document.getElementById('editWebSub').value = webDetails.sub;
}

function renderProducts() {
    applyWebDetails();
    updateBagUI();
    renderFeedbacks();

    const categories = [...new Set(products.map(p => p.category || "General"))];
    
    const catNav = document.getElementById('categoryNav');
    catNav.innerHTML = categories.map(cat => `
        <button onclick="scrollToCategory('${cat}')" class="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap hover:bg-orange-500 hover:text-white transition">
            ${cat}
        </button>
    `).join('');

    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = categories.map(cat => {
        const catItems = products.filter(p => (p.category || "General") === cat);
        return `
            <div id="cat-${cat.replace(/\s+/g, '-')}" class="category-group">
                <h3 class="text-lg font-bold text-gray-800 border-b-2 border-orange-500 pb-1 mb-4 flex items-center">
                    <i class="fa-solid fa-utensils text-brand-orange mr-2"></i> ${cat}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${catItems.map(item => {
                        let badgeClass = 'bg-green-100 text-green-800 border-green-300';
                        let badgeLabel = 'AVAILABLE';
                        let badgeIcon = 'fa-check';

                        if (item.status === 'COOKING') {
                            badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                            badgeLabel = 'COOKING';
                            badgeIcon = 'fa-fire';
                        } else if (item.status === 'SOLD_OUT') {
                            badgeClass = 'bg-red-100 text-red-800 border-red-300';
                            badgeLabel = 'SOLD OUT';
                            badgeIcon = 'fa-xmark';
                        }

                        return `
                            <div class="product-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition" data-status="${item.status}" data-name="${item.name.toLowerCase()}">
                                <div>
                                    <div class="relative h-40 overflow-hidden bg-gray-100">
                                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80'">
                                        <span class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass} shadow-sm">
                                            <i class="fa-solid ${badgeIcon} mr-1"></i> ${badgeLabel}
                                        </span>
                                    </div>
                                    <div class="p-3">
                                        <div class="flex justify-between items-start mb-1">
                                            <h4 class="font-bold text-gray-800 text-sm">${item.name}</h4>
                                            <span class="text-brand-orange font-extrabold text-sm">₱${item.price}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 line-clamp-2">${item.description}</p>
                                    </div>
                                </div>
                                <div class="p-3 pt-0">
                                    ${item.status !== 'SOLD_OUT' ? 
                                        `<button onclick="addToBag('${item.name}', ${item.price})" class="w-full brand-orange text-white py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition">
                                            + Add to Bag
                                        </button>` :
                                        `<button disabled class="w-full bg-gray-200 text-gray-400 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed">
                                            Unavailable
                                        </button>`
                                    }
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    renderAdminDrawer();
}

function scrollToCategory(cat) {
    const el = document.getElementById(`cat-${cat.replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function resetToFullMenu() {
    if(confirm('Are you sure you want to reset the menu to default categories?')) {
        products = defaultProducts;
        localStorage.setItem('farinas_products', JSON.stringify(products));
        renderProducts();
        showAlert('Menu reset successfully!');
    }
}

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

    if (isAnon || !name) {
        name = "Anonymous Customer";
    }

    if (comment.length > 500) {
        alert('Feedback must not exceed 500 characters!');
        return;
    }

    feedbacks.unshift({ name, comment, date: new Date().toLocaleDateString() });
    localStorage.setItem('farinas_feedbacks', JSON.stringify(feedbacks));
    
    document.getElementById('feedbackText').value = "";
    document.getElementById('feedbackName').value = "";
    document.getElementById('isAnonymous').checked = false;
    document.getElementById('feedbackName').disabled = false;
    document.getElementById('charCount').innerText = "0";

    renderFeedbacks();
    showAlert('Thank you for your feedback!');
}

function renderFeedbacks() {
    const list = document.getElementById('feedbackList');
    if (!list) return;

    if (feedbacks.length === 0) {
        list.innerHTML = `<p class="text-xs text-gray-400 text-center py-2">No reviews yet. Be the first to comment!</p>`;
        return;
    }

    list.innerHTML = feedbacks.map((fb, index) => `
        <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg text-xs space-y-1 relative">
            <div class="flex justify-between items-center font-bold text-gray-700 pr-6">
                <span><i class="fa-solid fa-user-circle text-orange-500 mr-1"></i> ${fb.name}</span>
                <span class="text-[10px] text-gray-400">${fb.date}</span>
            </div>
            <p class="text-gray-600 pl-4 break-words">${fb.comment}</p>
            ${isAdminLoggedIn ? `
                <button onclick="deleteFeedback(${index})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold p-1 bg-red-50 rounded border border-red-200" title="Delete Feedback">
                    <i class="fa-solid fa-trash"></i>
                </button>
            ` : ''}
        </div>
    `).join('');
}

function deleteFeedback(index) {
    if (confirm('Admin: Are you sure you want to delete this customer feedback?')) {
        feedbacks.splice(index, 1);
        localStorage.setItem('farinas_feedbacks', JSON.stringify(feedbacks));
        renderFeedbacks();
        showAlert('Feedback deleted by Admin!');
    }
}

function openCheckoutModal() {
    if (bag.length === 0) {
        alert('Your bag is empty!');
        return;
    }
    toggleBag();
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function toggleCheckoutModal() {
    document.getElementById('checkoutModal').classList.toggle('hidden');
}

function processCheckout(e) {
    e.preventDefault();
    const name = document.getElementById('dlvName').value;
    const contact = document.getElementById('dlvContact').value;
    const address = document.getElementById('dlvAddress').value;
    const landmark = document.getElementById('dlvLandmark').value;

    toggleCheckoutModal();

    let total = 0;
    let itemsText = bag.map(item => {
        total += item.price;
        return `- ${item.name} (₱${item.price})`;
    }).join('\n');

    let receiptHTML = `
        <p class="font-bold text-center text-gray-800 border-b pb-1">*** FARIÑAS EMPANADA RECEIPT ***</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Landmark:</b> ${landmark}</p>
        <p class="border-t pt-1 font-bold"><b>Order Items:</b></p>
        <pre class="font-mono text-[11px] whitespace-pre-wrap">${itemsText}</pre>
        <p class="border-t pt-1 font-bold text-brand-orange text-sm">TOTAL: ₱${total}</p>
        <p class="text-[10px] text-center text-gray-400 pt-2">Thank you for ordering!</p>
    `;

    document.getElementById('receiptContentBox').innerHTML = receiptHTML;
    document.getElementById('receiptModal').classList.remove('hidden');
}

function closeReceiptModal() {
    document.getElementById('receiptModal').classList.add('hidden');
    bag = [];
    localStorage.removeItem('farinas_cart');
    updateBagUI();
}

function copyReceiptText() {
    const boxText = document.getElementById('receiptContentBox').innerText;
    navigator.clipboard.writeText(boxText);
    alert('Receipt copied to clipboard! You can now paste or screenshot it.');
}

function renderAdminDrawer() {
    const list = document.getElementById('adminItemsList');
    if (!list) return;

    let html = `
        <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg space-y-2 mb-4">
            <h4 class="text-xs font-bold text-brand-orange uppercase"><i class="fa-solid fa-circle-plus mr-1"></i> Add New Product</h4>
            <input type="text" id="new-cat" placeholder="Category (e.g. Ilocos Rice Meals)" class="w-full text-xs px-2 py-1 border rounded">
            <input type="text" id="new-name" placeholder="Item Name" class="w-full text-xs px-2 py-1 border rounded">
            <input type="number" id="new-price" placeholder="Price (₱)" class="w-full text-xs px-2 py-1 border rounded">
            <input type="text" id="new-desc" placeholder="Description" class="w-full text-xs px-2 py-1 border rounded">
            <label class="block text-[10px] font-bold text-gray-600">Product Image (Phone Gallery):</label>
            <input type="file" id="new-file" accept="image/*" class="w-full text-xs p-1 bg-white border rounded">
            <select id="new-status" class="w-full text-xs font-bold px-2 py-1 border rounded">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="COOKING">COOKING</option>
                <option value="SOLD_OUT">SOLD OUT</option>
            </select>
            <button onclick="addNewProduct()" class="w-full bg-blue-600 text-white py-1.5 rounded text-xs font-bold">+ Add Item</button>
        </div>
        <h4 class="text-xs font-bold text-gray-700 uppercase mb-2">Manage Products</h4>
    `;

    html += products.map((item, index) => `
        <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-2 relative">
            <button onclick="deleteProduct(${index})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold px-1.5 py-0.5 bg-red-50 rounded border">
                <i class="fa-solid fa-trash"></i>
            </button>
            <span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">${item.category || 'General'}</span>
            <div class="flex justify-between items-center pr-8">
                <select id="status-${index}" class="text-xs font-bold px-1.5 py-0.5 rounded border">
                    <option value="AVAILABLE" ${item.status === 'AVAILABLE' ? 'selected' : ''}>AVAILABLE</option>
                    <option value="COOKING" ${item.status === 'COOKING' ? 'selected' : ''}>COOKING</option>
                    <option value="SOLD_OUT" ${item.status === 'SOLD_OUT' ? 'selected' : ''}>SOLD OUT</option>
                </select>
            </div>
            <input type="text" id="name-${index}" value="${item.name}" class="w-full text-xs font-bold px-2 py-1 border rounded">
            <input type="number" id="price-${index}" value="${item.price}" class="w-full text-xs px-2 py-1 border rounded">
            <input type="text" id="desc-${index}" value="${item.description}" class="w-full text-xs font-bold px-2 py-1 border rounded text-gray-600">
            <label class="block text-[10px] font-bold text-gray-500">Change Image (Gallery):</label>
            <input type="file" id="file-${index}" accept="image/*" class="w-full text-xs p-1 bg-white border rounded">
        </div>
    `).join('');

    list.innerHTML = html;
}

function saveWebDetails() {
    webDetails.title = document.getElementById('editWebTitle').value;
    webDetails.sub = document.getElementById('editWebSub').value;
    
    const pfpFile = document.getElementById('editWebPfpFile');
    if (pfpFile && pfpFile.files && pfpFile.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            webDetails.pfp = e.target.result;
            localStorage.setItem('farinas_web_details', JSON.stringify(webDetails));
            renderProducts();
 
