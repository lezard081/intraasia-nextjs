import { Product } from '@/app/lib/types/products';

export const products: Product[] = [
  // Kitchen - Commercial Ovens
  {
    id: 'oven-1',
    name: 'Professional Convection Oven',
    image: '/product-images/ovens/convection-oven.jpg',
    category: 'kitchen',
    subcategory: 'ovens',
    specifications: [
      { name: 'Dimensions', value: '36" x 40" x 72"' },
      { name: 'Power', value: '220V / 6000W' },
      { name: 'Capacity', value: '6 Trays' },
      { name: 'Temperature Range', value: '50°C - 300°C' },
      { name: 'Features', value: 'Digital controls, Steam injection, Timer' }
    ],
    dateAdded: '2023-05-15T08:00:00Z'
  },
  {
    id: 'oven-2',
    name: 'Industrial Pizza Oven',
    image: '/product-images/ovens/pizza-oven.jpg',
    category: 'kitchen',
    subcategory: 'ovens',
    specifications: [
      { name: 'Dimensions', value: '48" x 36" x 24"' },
      { name: 'Power', value: '380V / 12000W' },
      { name: 'Capacity', value: '4 Large Pizzas' },
      { name: 'Temperature Range', value: '100°C - 450°C' },
      { name: 'Features', value: 'Stone base, Dual temperature zones' }
    ],
    dateAdded: '2023-08-22T10:30:00Z'
  },
  
  // Kitchen - Refrigeration
  {
    id: 'fridge-1',
    name: 'Commercial Upright Refrigerator',
    image: '/product-images/refrigeration/upright-fridge.jpg',
    category: 'kitchen',
    subcategory: 'refrigeration',
    specifications: [
      { name: 'Dimensions', value: '29" x 32" x 82"' },
      { name: 'Power', value: '220V / 350W' },
      { name: 'Capacity', value: '23 Cubic Feet' },
      { name: 'Temperature Range', value: '0°C - 10°C' },
      { name: 'Features', value: 'Digital thermostat, Auto defrost, 4 adjustable shelves' }
    ],
    dateAdded: '2023-06-10T09:15:00Z'
  },
  {
    id: 'freezer-1',
    name: 'Industrial Chest Freezer',
    image: '/product-images/refrigeration/chest-freezer.jpg',
    category: 'kitchen',
    subcategory: 'refrigeration',
    specifications: [
      { name: 'Dimensions', value: '65" x 29" x 34"' },
      { name: 'Power', value: '220V / 500W' },
      { name: 'Capacity', value: '18 Cubic Feet' },
      { name: 'Temperature Range', value: '-18°C to -24°C' },
      { name: 'Features', value: 'Fast freeze function, Interior light, Lock' }
    ],
    dateAdded: '2023-09-05T14:20:00Z'
  },
  
  // Kitchen - Food Processors
  {
    id: 'processor-1',
    name: 'Commercial Food Processor',
    image: '/product-images/food-processors/commercial-processor.jpg',
    category: 'kitchen',
    subcategory: 'food-processors',
    specifications: [
      { name: 'Dimensions', value: '12" x 8" x 16"' },
      { name: 'Power', value: '110V / 750W' },
      { name: 'Capacity', value: '4 Liters' },
      { name: 'Speed Settings', value: '5 Speeds + Pulse' },
      { name: 'Features', value: 'Multiple blade attachments, Safety lock system' }
    ],
    dateAdded: '2023-07-12T11:45:00Z'
  },
  {
    id: 'mixer-1',
    name: 'Heavy Duty Stand Mixer',
    image: '/product-images/food-processors/stand-mixer.jpg',
    category: 'kitchen',
    subcategory: 'food-processors',
    specifications: [
      { name: 'Dimensions', value: '14" x 14" x 16"' },
      { name: 'Power', value: '220V / 1200W' },
      { name: 'Capacity', value: '10 Liters' },
      { name: 'Speed Settings', value: '10 Speeds' },
      { name: 'Features', value: 'Planetary mixing action, Timer, Bowl guard' }
    ],
    dateAdded: '2023-04-18T13:30:00Z'
  },
  
  // Laundry - Washing Machines
  {
    id: 'washer-1',
    name: 'Industrial Front Load Washer',
    image: '/product-images/washing-machines/front-load-washer.jpg',
    category: 'laundry',
    subcategory: 'washing-machines',
    specifications: [
      { name: 'Dimensions', value: '32" x 34" x 40"' },
      { name: 'Power', value: '220V / 2000W' },
      { name: 'Capacity', value: '25 kg' },
      { name: 'Spin Speed', value: '1200 RPM' },
      { name: 'Features', value: 'Programmable cycles, High efficiency, Low water consumption' }
    ],
    dateAdded: '2023-03-20T09:00:00Z'
  },
  {
    id: 'washer-2',
    name: 'Commercial Top Load Washer',
    image: '/product-images/washing-machines/top-load-washer.jpg',
    category: 'laundry',
    subcategory: 'washing-machines',
    specifications: [
      { name: 'Dimensions', value: '27" x 28" x 43"' },
      { name: 'Power', value: '110V / 1500W' },
      { name: 'Capacity', value: '15 kg' },
      { name: 'Spin Speed', value: '800 RPM' },
      { name: 'Features', value: 'Coin operated, Heavy duty suspension, Auto-balance' }
    ],
    dateAdded: '2023-10-08T15:45:00Z'
  },
  
  // Laundry - Dryers
  {
    id: 'dryer-1',
    name: 'Commercial Tumble Dryer',
    image: '/product-images/dryers/tumble-dryer.jpg',
    category: 'laundry',
    subcategory: 'dryers',
    specifications: [
      { name: 'Dimensions', value: '30" x 33" x 45"' },
      { name: 'Power', value: '220V / 5000W' },
      { name: 'Capacity', value: '20 kg' },
      { name: 'Temperature Settings', value: '3 Heat Levels' },
      { name: 'Features', value: 'Reversing drum action, Moisture sensor, Lint filter' }
    ],
    dateAdded: '2023-02-14T10:20:00Z'
  },
  {
    id: 'dryer-2',
    name: 'Industrial Stack Dryer',
    image: '/product-images/dryers/stack-dryer.jpg',
    category: 'laundry',
    subcategory: 'dryers',
    specifications: [
      { name: 'Dimensions', value: '31" x 33" x 76"' },
      { name: 'Power', value: '220V / 9000W' },
      { name: 'Capacity', value: '2 x 15 kg' },
      { name: 'Temperature Settings', value: 'Variable Control' },
      { name: 'Features', value: 'Dual independent dryers, Space saving design' }
    ],
    dateAdded: '2023-11-30T08:30:00Z'
  },
  
  // Laundry - Ironing Equipment
  {
    id: 'iron-1',
    name: 'Commercial Steam Iron',
    image: '/product-images/ironing/steam-iron.jpg',
    category: 'laundry',
    subcategory: 'ironing',
    specifications: [
      { name: 'Dimensions', value: '12" x 6" x 8"' },
      { name: 'Power', value: '220V / 1800W' },
      { name: 'Water Tank', value: '1.2 Liters' },
      { name: 'Steam Pressure', value: '4 Bar' },
      { name: 'Features', value: 'Continuous steam, Anti-scale system, Auto shut-off' }
    ],
    dateAdded: '2023-01-25T11:10:00Z'
  },
  {
    id: 'press-1',
    name: 'Industrial Garment Press',
    image: '/product-images/ironing/garment-press.jpg',
    category: 'laundry',
    subcategory: 'ironing',
    specifications: [
      { name: 'Dimensions', value: '48" x 15" x 20"' },
      { name: 'Power', value: '220V / 2500W' },
      { name: 'Pressing Surface', value: '42" x 12"' },
      { name: 'Steam Pressure', value: '5 Bar' },
      { name: 'Features', value: 'Foot pedal operation, Adjustable pressure, Steam injection' }
    ],
    dateAdded: '2023-12-05T13:15:00Z'
  }
];

// Helper function to get products by category and subcategory
export function getProductsByCategory(category: string, subcategory?: string): Product[] {
  return products.filter(product => 
    product.category === category && 
    (subcategory ? product.subcategory === subcategory : true)
  );
}

// Helper function to get a product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Helper function to sort products
export function sortProducts(products: Product[], sortOption: string): Product[] {
  const productsCopy = [...products];
  
  switch(sortOption) {
    case 'alphabetical':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return productsCopy.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    case 'oldest':
      return productsCopy.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    default:
      return productsCopy;
  }
}