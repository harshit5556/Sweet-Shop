import Sweet from '../models/Sweet.js';

export const sweetService = {
  async createSweet(sweetData, userId) {
    const sweet = await Sweet.create({
      ...sweetData,
      createdBy: userId
    });
    return sweet;
  },

  async getAllSweets() {
    const sweets = await Sweet.find().populate('createdBy', 'name email');
    return sweets;
  },

  async getSweetById(id) {
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  },

  async searchSweets(filters) {
    const { name, category, minPrice, maxPrice } = filters;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    return sweets;
  },

  async updateSweet(id, updateData) {
    const sweet = await Sweet.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    return sweet;
  },

  async deleteSweet(id) {
    const sweet = await Sweet.findByIdAndDelete(id);
    
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    return sweet;
  },

  async checkAvailability(id, quantity) {
    const sweet = await this.getSweetById(id);
    return sweet.quantity >= quantity;
  }
};