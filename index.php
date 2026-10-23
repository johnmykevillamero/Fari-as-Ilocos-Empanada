<?php
// PHP Backend para basahin ang XML
$xmlFile = 'products.xml';
if (file_exists($xmlFile)) {
    $xml = simplexml_load_file($xmlFile);
} else {
    $xml = null;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fariñas Ilocos Empanada - San Mateo Branch (PHP + XML)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans min-h-screen flex flex-col">

    <header class="bg-white shadow-md sticky top-0 z-40 px-4 py-3 flex justify-between items-center">
        <h1 class="text-lg font-bold text-gray-800">Fariñas Ilocos Empanada <span class="text-xs text-red-500">Server Edition</span></h1>
        <a href="admin.php" class="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Admin Panel (PHP)</a>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <h2 class="text-xl font-extrabold mb-4 text-gray-800">Menu Catalog (Loaded from XML)</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <?php if ($xml): ?>
                <?php foreach ($xml->item as $item): ?>
                    <div class="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded"><?php echo $item->category; ?></span>
                            <h3 class="font-bold text-gray-800 text-sm mt-2"><?php echo $item->name; ?></h3>
                            <p class="text-brand-orange font-extrabold text-sm">₱<?php echo $item->price; ?></p>
                            <p class="text-xs text-gray-500 mt-1"><?php echo $item->description; ?></p>
                        </div>
                        <div class="mt-4">
                            <?php if ($item->status == 'AVAILABLE'): ?>
                                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">AVAILABLE</span>
                            <?php else: ?>
                                <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">SOLD OUT</span>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>

</body>
</html>
