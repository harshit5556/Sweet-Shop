import Sweet from '../models/Sweet.js';

export const inventoryService = {
  async purchaseSweet(sweetId, quantity) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity in stock');
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return sweet;
  },

  async restockSweet(sweetId, quantity) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    sweet.quantity += quantity;
    await sweet.save();

    return sweet;
  },

  async checkStock(sweetId) {
    const sweet = await Sweet.findById(sweetId);
    
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    return {
      sweetId: sweet._id,
      name: sweet.name,
      quantity: sweet.quantity,
      available: sweet.quantity > 0
    };
  },

  async getLowStockItems(threshold = 10) {
    const lowStockSweets = await Sweet.find({
      quantity: { $lte: threshold }
    });

    return lowStockSweets;
  }
};
