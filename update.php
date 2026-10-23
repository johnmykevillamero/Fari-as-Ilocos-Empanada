<?php
header('Content-Type: application/json');

$xmlFile = 'products.xml';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['items']) && file_exists($xmlFile)) {
        $xml = simplexml_load_file($xmlFile);

        foreach ($input['items'] as $updatedItem) {
            foreach ($xml->item as $item) {
                if ((int)$item->id === (int)$updatedItem['id']) {
                    $item->status = $updatedItem['status'];
                    $item->price = $updatedItem['price'];
                }
            }
        }

        if ($xml->asXML($xmlFile)) {
            echo json_encode(['success' => true, 'message' => 'Successfully saved to XML!']);
            exit;
        }
    }
}

echo json_encode(['success' => false, 'message' => 'Failed to save changes.']);
?>
