<?php
// PHP Backend Handler for Updating XML
$xmlFile = 'products.xml';
$updateMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action_update_xml'])) {
    if (file_exists($xmlFile)) {
        $xml = simplexml_load_file($xmlFile);
        foreach ($_POST['status'] as $id => $newStatus) {
            foreach ($xml->item as $item) {
                if ((int)$item->id === (int)$id) {
                    $item->status = $newStatus;
                    if (isset($_POST['price'][$id])) {
                        $item->price = $_POST['price'][$id];
                    }
                }
            }
        }
        $xml->asXML($xmlFile);
        $updateMsg = "XML Database updated successfully!";
    }
}

// Load XML Data
$xmlData = file_exists($xmlFile) ? simplexml_load_file($xmlFile) : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fariñas Ilocos Empanada - San Mateo Branch (PHP + XML)</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CONNECTED CUSTOM CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-100 font-sans min-h-screen flex flex-col">

    <!-- HEADER -->
    <header class="bg-white shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=100&q=80" alt="Logo" class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-orange-500 shadow">
                <div>
                    <h1 class="text-base md:text-xl font-bold text-gray-800 leading-tight">Fariñas Ilocos Empanada</h1>
                    <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot text-red-500"></i> San Mateo Branch (PHP + XML Server)</p>
                </div>
            </div>

            <div class="flex items-center space-x-2">
                <button onclick="toggleBag()" class="relative bg-gray-100 p-2.5 rounded-full text-gray-700 hover:bg-gray-200 transition">
                    <i class="fa-solid fa-basket-shopping text-lg"></i>
                    <span id="bag-count" class="absolute -top-1 -right-1 brand-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
                </button>

                <button onclick="toggleAdminDrawer()" class="brand-orange text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition">
                    <i class="fa-solid fa-sliders mr-1"></i> Admin Panel (XML)
                </button>
            </div>
        </div>
    </header>

    <!-- HERO BANNER -->
    <section class="brand-orange text-white py-4 px-4 text-center shadow-inner">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-xl md:text-2xl font-extrabold mb-1">Naimas! Authentic Ilocos Menu</h2>
            <p class="text-xs md:text-sm opacity-90">Live Data loaded directly from XML Server</p>
        </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <?php if ($updateMsg): ?>
            <div class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-xs font-bold">
                <?php echo $updateMsg; ?>
            </div>
        <?php endif; ?>

        <!-- SEARCH & STATUS FILTERS -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
            <div class="relative w-full md:w-80">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
                <input type="text" id="searchInput" onkeyup="filterMenu()" placeholder="Search menu items..." class="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500">
            </div>
            
            <div class="flex space-x-1.5 w-full md:w-auto overflow-x-auto pb-1">
                <button onclick="filterStatus('ALL')" class="status-btn active bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">All Items</button>
                <button onclick="filterStatus('AVAILABLE')" class="status-btn bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">Available</button>
                <button onclick="filterStatus('SOLD_OUT')" class="status-btn bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">Sold Out</button>
            </div>
        </div>

        <!-- PRODUCTS GRID LOADED VIA PHP FROM XML -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <?php if ($xmlData): ?>
                <?php foreach ($xmlData->item as $item): ?>
                    <?php
                        $isSoldOut = (string)$item->status === 'SOLD_OUT';
                        $badgeClass = $isSoldOut ? 'bg-red-100 text-red-800 border-red-300' : 'bg-green-100 text-green-800 border-green-300';
                        $badgeText = (string)$item->status;
                    ?>
                    <div class="product-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition" data-status="<?php echo $item->status; ?>" data-name="<?php echo strtolower($item->name); ?>">
                        <div>
                            <div class="relative h-40 overflow-hidden bg-gray-100">
                                <img src="<?php echo $item->image; ?>" alt="<?php echo $item->name; ?>" class="w-full h-full object-cover">
                                <span class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border <?php echo $badgeClass; ?> shadow-sm">
                                    <?php echo $badgeText; ?>
                                </span>
                            </div>
                            <div class="p-3">
                                <span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded"><?php echo $item->category; ?></span>
                                <div class="flex justify-between items-start my-1">
                                    <h4 class="font-bold text-gray-800 text-sm"><?php echo $item->name; ?></h4>
                                    <span class="text-brand-orange font-extrabold text-sm">₱<?php echo $item->price; ?></span>
                                </div>
                                <p class="text-xs text-gray-500 line-clamp-2"><?php echo $item->description; ?></p>
                            </div>
                        </div>
                        <div class="p-3 pt-0">
                            <?php if (!$isSoldOut): ?>
                                <button onclick="addToBag('<?php echo addslashes($item->name); ?>', <?php echo $item->price; ?>)" class="w-full brand-orange text-white py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition">
                                    + Add to Bag
                                </button>
                            <?php else: ?>
                                <button disabled class="w-full bg-gray-200 text-gray-400 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed">
                                    Unavailable
                                </button>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="text-xs text-red-500">Error: Unable to load products.xml file.</p>
            <?php endif; ?>
        </div>
    </main>

    <!-- ADMIN DRAWER (PHP POST BACKEND FOR XML EDITING) -->
    <div id="adminDrawer" class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col">
        <div class="p-4 border-b bg-gray-800 text-white flex justify-between items-center">
            <h3 class="font-bold text-sm md:text-base"><i class="fa-solid fa-file-code text-yellow-400 mr-2"></i> XML Database Editor</h3>
            <button onclick="toggleAdminDrawer()" class="text-gray-300 hover:text-white text-xl font-bold">&times;</button>
        </div>
        
        <form method="POST" class="p-4 flex-1 overflow-y-auto space-y-4">
            <input type="hidden" name="action_update_xml" value="1">
            <p class="text-xs text-gray-500">Update item status and price directly inside <b>products.xml</b>:</p>

            <?php if ($xmlData): ?>
                <?php foreach ($xmlData->item as $item): ?>
                    <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-bold text-gray-800"><?php echo $item->name; ?></span>
                            <select name="status[<?php echo $item->id; ?>]" class="text-xs font-bold px-1.5 py-0.5 rounded border">
                                <option value="AVAILABLE" <?php echo $item->status == 'AVAILABLE' ? 'selected':''; ?>>AVAILABLE</option>
                                <option value="SOLD_OUT" <?php echo $item->status == 'SOLD_OUT' ? 'selected':''; ?>>SOLD OUT</option>
                            </select>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-xs font-semibold text-gray-500">Price (₱):</span>
                            <input type="number" name="price[<?php echo $item->id; ?>]" value="<?php echo $item->price; ?>" class="w-full text-xs px-2 py-1 border rounded">
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

            <button type="submit" class="w-full brand-green text-white py-2.5 rounded-lg text-xs font-bold hover:opacity-90 transition shadow">
                Save Changes directly to products.xml
            </button>
        </form>
    </div>

    <!-- SHOPPING BAG DRAWER -->
    <div id="bagDrawer" class="fixed inset-y-0 right-0 w-full md:w-80 bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col">
        <div class="p-4 border-b brand-orange text-white flex justify-between items-center">
            <h3 class="font-bold text-sm md:text-base"><i class="fa-solid fa-basket-shopping mr-2"></i> Selected Items</h3>
            <button onclick="toggleBag()" class="text-white text-xl font-bold">&times;</button>
        </div>
        <div id="bagItems" class="p-4 flex-1 overflow-y-auto space-y-3">
            <p class="text-xs text-gray-400 text-center py-8">Your bag is empty.</p>
        </div>
        <div class="p-4 border-t bg-gray-50 space-y-3">
            <div class="flex justify-between font-bold text-gray-800 text-sm">
                <span>Total:</span>
                <span id="bagTotal" class="text-brand-orange text-base md:text-lg">₱0</span>
            </div>
            <button onclick="openCheckoutModal()" class="w-full brand-green text-white py-2.5 rounded-lg text-xs font-bold hover:opacity-90 transition">
                Proceed to Checkout Form
            </button>
        </div>
    </div>

    <!-- CHECKOUT FORM MODAL -->
    <div id="checkoutModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center px-4">
        <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button onclick="toggleCheckoutModal()" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            <h3 class="text-base font-bold text-gray-800 mb-1"><i class="fa-solid fa-truck-fast text-orange-500 mr-2"></i> Delivery Checkout Form</h3>
            <form onsubmit="processCheckout(event)" class="space-y-3 mt-3">
                <input type="text" id="dlvName" required placeholder="Full Name" class="w-full px-3 py-2 border rounded-lg text-xs">
                <input type="tel" id="dlvContact" required placeholder="09XXXXXXXXX" class="w-full px-3 py-2 border rounded-lg text-xs">
                <textarea id="dlvAddress" required rows="2" placeholder="Complete Address" class="w-full px-3 py-2 border rounded-lg text-xs resize-none"></textarea>
                <input type="text" id="dlvLandmark" required placeholder="Landmark" class="w-full px-3 py-2 border rounded-lg text-xs">
                <button type="submit" class="w-full brand-orange text-white py-2.5 rounded-lg text-xs font-bold">Generate Receipt</button>
            </form>
        </div>
    </div>

    <!-- RECEIPT POPUP MODAL -->
    <div id="receiptModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center px-4">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button onclick="closeReceiptModal()" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            <div id="receiptContentBox" class="bg-gray-50 border border-dashed border-gray-400 p-4 rounded-lg text-xs font-mono"></div>
            <button onclick="copyReceiptText()" class="w-full brand-green text-white py-2 rounded-lg text-xs font-bold mt-4">Copy Receipt</button>
        </div>
    </div>

    <!-- CONNECTED CUSTOM JAVASCRIPT FILE -->
    <script src="script.js"></script>
</body>
</html>
