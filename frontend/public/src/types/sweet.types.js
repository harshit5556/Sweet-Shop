/**
 * Sweet type definition
 * @typedef {Object} Sweet
 * @property {string} _id - Sweet ID
 * @property {string} name - Sweet name
 * @property {string} category - Sweet category
 * @property {number} price - Sweet price
 * @property {number} quantity - Available quantity
 * @property {string} [description] - Sweet description (optional)
 * @property {string|Object} createdBy - Creator user ID or populated user object
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Update timestamp
 */

/**
 * Sweet filter type
 * @typedef {Object} SweetFilters
 * @property {string} [name] - Filter by name (partial match)
 * @property {string} [category] - Filter by exact category
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 */

/**
 * Sweet creation data
 * @typedef {Object} SweetCreateData
 * @property {string} name - Sweet name (required)
 * @property {string} category - Sweet category (required)
 * @property {number} price - Sweet price (required)
 * @property {number} quantity - Initial quantity (required)
 * @property {string} [description] - Sweet description (optional)
 */

/**
 * Sweet update data
 * @typedef {Object} SweetUpdateData
 * @property {string} [name] - Updated name
 * @property {string} [category] - Updated category
 * @property {number} [price] - Updated price
 * @property {number} [quantity] - Updated quantity
 * @property {string} [description] - Updated description
 */

// Sweet categories enum
export const SweetCategories = {
  CHOCOLATE: 'chocolate',
  CANDY: 'candy',
  GUMMY: 'gummy',
  LOLLIPOP: 'lollipop',
  HARD_CANDY: 'hard-candy',
  OTHER: 'other'
};

// Sweet category labels for display
export const SweetCategoryLabels = {
  [SweetCategories.CHOCOLATE]: 'Chocolate',
  [SweetCategories.CANDY]: 'Candy',
  [SweetCategories.GUMMY]: 'Gummy',
  [SweetCategories.LOLLIPOP]: 'Lollipop',
  [SweetCategories.HARD_CANDY]: 'Hard Candy',
  [SweetCategories.OTHER]: 'Other'
};

// Array of all category values
export const SweetCategoryList = Object.values(SweetCategories);
