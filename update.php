<?php
header('Content-Type: application/json');

$xmlMenu = 'products.xml';
$xmlFeedback = 'feedbacks.xml';

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['action'])) {
    
    // UPDATE MENU ITEMS
    if ($input['action'] === 'update_menu' && file_exists($xmlMenu)) {
        $xml = simplexml_load_file($xmlMenu);
        foreach ($input['items'] as $updatedItem) {
            foreach ($xml->item as $item) {
                if ((int)$item->id === (int)$updatedItem['id']) {
                    $item->status = $updatedItem['status'];
                    $item->price = $updatedItem['price'];
                }
            }
        }
        if ($xml->asXML($xmlMenu)) {
            echo json_encode(['success' => true, 'message' => 'Menu updated in XML!']);
            exit;
        }
    }

    // SUBMIT NEW FEEDBACK
    if ($input['action'] === 'add_feedback' && file_exists($xmlFeedback)) {
        $xml = simplexml_load_file($xmlFeedback);
        $newFb = $xml->addChild('feedback');
        $newFb->addChild('id', time());
        $newFb->addChild('name', htmlspecialchars($input['name']));
        $newFb->addChild('comment', htmlspecialchars($input['comment']));
        $newFb->addChild('date', date('m/d/Y'));

        if ($xml->asXML($xmlFeedback)) {
            echo json_encode(['success' => true, 'message' => 'Feedback saved to XML!']);
            exit;
        }
    }

    // DELETE FEEDBACK (ADMIN)
    if ($input['action'] === 'delete_feedback' && file_exists($xmlFeedback)) {
        $xml = simplexml_load_file($xmlFeedback);
        $targetId = (string)$input['id'];
        
        $index = 0;
        foreach ($xml->feedback as $fb) {
            if ((string)$fb->id === $targetId) {
                unset($xml->feedback[$index]);
                break;
            }
            $index++;
        }

        if ($xml->asXML($xmlFeedback)) {
            echo json_encode(['success' => true, 'message' => 'Feedback deleted!']);
            exit;
        }
    }
}

echo json_encode(['success' => false, 'message' => 'Invalid action or file missing.']);
?>
