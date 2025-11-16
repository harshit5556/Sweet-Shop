/**
 * Tailwind Utility Functions
 * Helper functions for dynamic Tailwind class generation
 */

/**
 * Combines multiple class strings, removing duplicates
 * @param {...string} classes - Class strings to combine
 * @returns {string} Combined class string
 */
export const cn = (...classes) => {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
};

/**
 * Conditionally applies classes based on a condition
 * @param {boolean} condition - Condition to check
 * @param {string} trueClass - Classes to apply if condition is true
 * @param {string} falseClass - Classes to apply if condition is false
 * @returns {string} Class string
 */
export const conditionalClass = (condition, trueClass, falseClass = '') => {
  return condition ? trueClass : falseClass;
};

/**
 * Gets stock status classes based on quantity
 * @param {number} quantity - Current stock quantity
 * @returns {string} Tailwind classes for stock status
 */
export const getStockClasses = (quantity) => {
  if (quantity === 0) {
    return 'bg-red-100 text-red-800 border-red-200';
  }
  if (quantity <= 10) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }
  return 'bg-green-100 text-green-800 border-green-200';
};

/**
 * Gets category color classes
 * @param {string} category - Sweet category
 * @returns {string} Tailwind classes for category
 */
export const getCategoryClasses = (category) => {
  const categoryColors = {
    chocolate: 'bg-amber-100 text-amber-800 border-amber-200',
    candy: 'bg-pink-100 text-pink-800 border-pink-200',
    gummy: 'bg-orange-100 text-orange-800 border-orange-200',
    lollipop: 'bg-purple-100 text-purple-800 border-purple-200',
    'hard-candy': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    other: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return categoryColors[category] || categoryColors.other;
};

/**
 * Gets price color classes based on price range
 * @param {number} price - Price value
 * @returns {string} Tailwind classes for price
 */
export const getPriceClasses = (price) => {
  if (price < 1) {
    return 'text-green-600 font-semibold';
  }
  if (price < 5) {
    return 'text-blue-600 font-semibold';
  }
  if (price < 10) {
    return 'text-orange-600 font-semibold';
  }
  return 'text-red-600 font-semibold';
};


