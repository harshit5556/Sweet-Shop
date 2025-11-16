import express from 'express';
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} from '../controllers/sweetController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createSweet);
router.get('/', protect, getAllSweets);
router.get('/search', protect, searchSweets);
router.put('/:id', protect, restrictTo('admin'), updateSweet);
router.delete('/:id', protect, restrictTo('admin'), deleteSweet);

export default router;