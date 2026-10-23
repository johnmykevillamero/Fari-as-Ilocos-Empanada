let bag = [];

function toggleBag() {
    document.getElementById('bagDrawer').classList.toggle('translate-x-full');
}

function toggleLoginModal() {
    document.getElementById('loginModal').classList.toggle('hidden');
}

function toggleAdminDrawer() {
    document.getElementById('adminDrawer').classList.toggle('translate-x-full');
}

function addToBag(name, price) {
    bag.push({ name, price });
    updateBagUI();
    toggleBag();
}

function removeFromBag(index) {
    bag.splice(index, 1);
    updateBagUI();
}

function updateBagUI() {
    const container = document.getElementById('bagItems');
    const totalEl = document.getElementById('bagTotal');
    const countEl = document.getElementById('bag-count');

    if(!container || !totalEl || !countEl) return;

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
            <div class="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded border border-gray-200">
                <div>
                    <p class="font-bold text-gray-800">${item.name}</p>
                    <p class="text-brand-orange font-semibold">₱${item.price}</p>
                </div>
                <button onclick="removeFromBag(${i})" class="text-red-500 font-bold text-sm">&times;</button>
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
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.dataset.name.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function openCheckoutModal() {
    if (bag.length === 0) return alert('Your bag is empty!');
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
    `;

    document.getElementById('receiptContentBox').innerHTML = receiptHTML;
    document.getElementById('receiptModal').classList.remove('hidden');
}

function closeReceiptModal() {
    document.getElementById('receiptModal').classList.add('hidden');
    bag = [];
    updateBagUI();
}

function copyReceiptText() {
    const boxText = document.getElementById('receiptContentBox').innerText;
    navigator.clipboard.writeText(boxText);
    alert('Receipt copied to clipboard!');
}
