import express from 'express';
import { purchaseSweet, restockSweet } from '../controllers/inventoryController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, restrictTo('admin'), restockSweet);

export default router;