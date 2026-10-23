<?php
$xmlFile = 'products.xml';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && file_exists($xmlFile)) {
    $xml = simplexml_load_file($xmlFile);
    foreach ($_POST['status'] as $id => $status) {
        foreach ($xml->item as $item) {
            if ($item->id == $id) {
                $item->status = $status;
            }
        }
    }
    $xml->asXML($xmlFile);
    $success = "XML Database updated successfully!";
}
$xml = simplexml_load_file($xmlFile);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - Fariñas</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 class="text-lg font-bold mb-4">Admin Panel (PHP + XML Editor)</h2>
        <?php if(isset($success)) echo "<p class='text-green-600 text-xs mb-3 font-bold'>$success</p>"; ?>
        
        <form method="POST" class="space-y-4">
            <?php foreach ($xml->item as $item): ?>
                <div class="border p-3 rounded flex justify-between items-center text-xs">
                    <div>
                        <b><?php echo $item->name; ?></b> (₱<?php echo $item->price; ?>)
                    </div>
                    <select name="status[<?php echo $item->id; ?>]" class="border p-1 font-bold">
                        <option value="AVAILABLE" <?php echo $item->status == 'AVAILABLE' ? 'selected':''; ?>>AVAILABLE</option>
                        <option value="SOLD_OUT" <?php echo $item->status == 'SOLD_OUT' ? 'selected':''; ?>>SOLD OUT</option>
                    </select>
                </div>
            <?php endforeach; ?>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded text-xs font-bold">Save Changes to XML</button>
        </form>
        <div class="mt-4 text-center">
            <a href="index.php" class="text-xs text-blue-500 underline">Back to Main Menu</a>
        </div>
    </div>
</body>
</html>
