# Tailwind CSS Utilities

This folder contains reusable Tailwind CSS utilities and component classes for the Sweet Shop application.

## Structure

- **`components.js`** - Pre-defined Tailwind class combinations for common components (buttons, cards, inputs, badges, etc.)
- **`utilities.js`** - Helper functions for dynamic class generation and conditional styling
- **`index.js`** - Central export file for all utilities

## Usage

### Importing Utilities

```javascript
import { buttonClasses, cardClasses, inputClasses } from '../tailwind';
import { cn, getStockClasses, getCategoryClasses } from '../tailwind';
```

### Using Component Classes

```javascript
// Buttons
<button className={buttonClasses.primary}>Primary Button</button>
<button className={buttonClasses.secondary}>Secondary Button</button>
<button className={buttonClasses.danger}>Danger Button</button>
<button className={buttonClasses.outline}>Outline Button</button>

// Cards
<div className={cardClasses.base}>Card Content</div>
<div className={cardClasses.elevated}>Elevated Card</div>
<div className={cardClasses.bordered}>Bordered Card</div>

// Inputs
<input className={inputClasses.base} />
<input className={inputClasses.error} />
<input className={inputClasses.success} />
```

### Using Utility Functions

```javascript
// Combine classes
<div className={cn('base-class', condition && 'conditional-class')} />

// Stock status classes
<span className={getStockClasses(quantity)}>Stock Status</span>

// Category classes
<span className={getCategoryClasses('chocolate')}>Chocolate</span>

// Price classes
<span className={getPriceClasses(price)}>${price}</span>
```

### Inline Tailwind Classes

You can also use Tailwind classes directly in your components:

```javascript
<div className="bg-white rounded-lg shadow-sweet p-6 hover:shadow-sweet-lg">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

## Custom Colors

The Tailwind configuration includes custom colors:

- **Primary**: Red shades (primary-50 to primary-900)
- **Secondary**: Orange shades (secondary-50 to secondary-900)
- **Sweet Categories**: Custom colors for each sweet category

## Custom Utilities

- `shadow-sweet` - Custom shadow for sweet cards
- `shadow-sweet-lg` - Larger shadow for hover states
- `font-display` - Display font (Poppins)
- `font-sans` - Sans-serif font (Inter)

## Best Practices

1. Use component classes from `components.js` for consistency
2. Use utility functions for dynamic styling
3. Combine with inline classes when needed
4. Keep custom classes in `tailwind.config.js` for reusability


