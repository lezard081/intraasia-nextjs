import { Product } from '@/app/lib/types/products';

export const products: Product[] = [
  // Kitchen - Commercial Ovens
  {
    id: 'oven-1',
    name: 'Professional Convection Oven',
    image: '/product-images/ovens/convection-oven.jpg',
    category: 'kitchen',
    subcategory: 'ovens',
    definition: 'A high-performance convection oven designed for commercial kitchens, featuring advanced air circulation technology for even cooking.',
    features: [
      'Digital controls with programmable settings',
      'Stainless steel construction for durability',
      'Multiple rack positions for versatile cooking',
      'Energy-efficient design',
    ],
    dateAdded: '2023-05-15T08:00:00Z',
    supplier: 'Acme Supplies'
  },
  {
    id: 'oven-2',
    name: 'Industrial Pizza Oven',
    image: '/product-images/ovens/pizza-oven.jpg',
    category: 'kitchen',
    subcategory: 'ovens',
    definition: 'A heavy-duty pizza oven with stone baking surface, ideal for high-volume pizzerias and restaurants.',
    features: [
      'High-temperature operation up to 500°C',
      'Stone baking surface for authentic pizza crust',
      'Digital temperature control',
      'Large capacity for multiple pizzas at once'
    ],
    dateAdded: '2023-08-22T10:30:00Z',
    supplier: 'KitchenPro'
  },
  
  // Kitchen - Refrigeration
  {
    id: 'fridge-1',
    name: 'Commercial Upright Refrigerator',
    image: '/product-images/refrigeration/upright-fridge.jpg',
    category: 'kitchen',
    subcategory: 'refrigeration',
    definition: 'A spacious upright refrigerator designed for commercial use, featuring adjustable shelving and energy-efficient cooling.',
    features: [
      'Digital temperature display',
      'Adjustable shelves for flexible storage',
      'Self-closing doors with magnetic seals',
      'Energy-efficient compressor'
    ],
    dateAdded: '2023-06-10T09:15:00Z',
    supplier: 'CoolTech'
  },
  {
    id: 'freezer-1',
    name: 'Industrial Chest Freezer',
    image: '/product-images/refrigeration/chest-freezer.jpg',
    category: 'kitchen',
    subcategory: 'refrigeration',
    definition: 'A robust chest freezer with a large capacity, perfect for storing bulk frozen goods in commercial kitchens.',
    features: [
      'Heavy-duty construction for durability',
      'Adjustable temperature control',
      'Removable storage baskets for easy organization',
      'Lockable lid for security'
    ],
    dateAdded: '2023-09-05T14:20:00Z',
    supplier: 'CoolTech'
  },
  
  // Kitchen - Food Processors
  {
    id: 'processor-1',
    name: 'Commercial Food Processor',
    image: '/product-images/food-processors/commercial-processor.jpg',
    category: 'kitchen',
    subcategory: 'food-processors',
    definition: 'A powerful food processor designed for heavy-duty use in commercial kitchens, capable of handling large volumes of food preparation.',
    features: [
      'Multiple attachments for slicing, dicing, and shredding',
      'High-capacity bowl for large batches',
      'Variable speed control for precision processing',
      'Safety interlock system'
    ],
    dateAdded: '2023-07-12T11:45:00Z',
    supplier: 'PrepMaster'
  },
  {
    id: 'mixer-1',
    name: 'Heavy Duty Stand Mixer',
    image: '/product-images/food-processors/stand-mixer.jpg',
    category: 'kitchen',
    subcategory: 'food-processors',
    definition: 'A robust stand mixer designed for commercial baking, featuring a powerful motor and multiple speed settings.',
    features: [
      'Large capacity mixing bowl',
      'Multiple attachments including whisk, dough hook, and paddle',
      'Planetary mixing action for thorough mixing',
      'Durable construction for long-lasting performance'
    ],
    dateAdded: '2023-04-18T13:30:00Z',
    supplier: 'PrepMaster'
  },
  
  // Laundry - Washing Machines
  {
    id: 'washer-1',
    name: 'Industrial Front Load Washer',
    image: '/product-images/washing-machines/front-load-washer.jpg',
    category: 'laundry',
    subcategory: 'washing-machines',
    definition: 'A high-capacity front load washer designed for commercial laundry operations, featuring advanced washing technology for optimal cleaning.',
    features: [
        'Large capacity drum for heavy loads',
        'Multiple wash programs for different fabrics',
        'Energy-efficient design with low water consumption',
        'Digital display with programmable settings'
    ],
    dateAdded: '2023-03-20T09:00:00Z',
    supplier: 'LaundryPro'
  },
  {
    id: 'washer-2',
    name: 'Commercial Top Load Washer',
    image: '/product-images/washing-machines/top-load-washer.jpg',
    category: 'laundry',
    subcategory: 'washing-machines',
    definition: 'A robust top load washer designed for commercial use, featuring a large capacity and user-friendly controls.',
    features: [
      'High-speed spin cycle for faster drying',
      'Multiple wash cycles for various fabrics',
      'Heavy-duty construction for durability',
      'Easy-to-use control panel with LED indicators'
    ],
    dateAdded: '2023-10-08T15:45:00Z',
    supplier: 'LaundryPro'
  },
  
  // Laundry - Dryers
  {
    id: 'dryer-1',
    name: 'Commercial Tumble Dryer',
    image: '/product-images/dryers/tumble-dryer.jpg',
    category: 'laundry',
    subcategory: 'dryers',
    definition: 'A compact tumble dryer designed for commercial use, featuring a large capacity and user-friendly controls.',
    features: [
      'High-efficiency drying with multiple heat settings',
      'Large capacity drum for heavy loads',
      'Digital display with programmable drying cycles',
      'Stainless steel drum for durability'
    ],
    dateAdded: '2023-02-14T10:20:00Z',
    supplier: 'LaundryPro'
  },
  {
    id: 'dryer-2',
    name: 'Industrial Stack Dryer',
    image: '/product-images/dryers/stack-dryer.jpg',
    category: 'laundry',
    subcategory: 'dryers',
    definition: 'A space-saving stack dryer designed for commercial laundry operations, featuring high-capacity drying and energy-efficient performance.',
    features: [
      'Stackable design for space efficiency',
      'High-capacity drum for large loads',
      'Multiple drying cycles for different fabrics',
      'Energy-efficient operation with low heat loss'
    ],
    dateAdded: '2023-11-30T08:30:00Z',
    supplier: 'LaundryPro'
  },
  
  // Laundry - Ironing Equipment
  {
    id: 'iron-1',
    name: 'Commercial Steam Iron',
    image: '/product-images/ironing/steam-iron.jpg',
    category: 'laundry',
    subcategory: 'ironing',
    definition: 'A professional steam iron designed for commercial use, featuring a powerful steam output and ergonomic design for efficient ironing.',
    features: [
      'High steam output for quick wrinkle removal',
      'Ergonomic handle for comfortable use',
      'Adjustable temperature control for different fabrics',
      'Durable soleplate for smooth gliding'
    ],
    dateAdded: '2023-01-25T11:10:00Z',
    supplier: 'IronMaster'
  },
  {
    id: 'press-1',
    name: 'Industrial Garment Press',
    image: '/product-images/ironing/garment-press.jpg',
    category: 'laundry',
    subcategory: 'ironing',
    definition: 'A space-saving garment press designed for commercial use, featuring a large capacity and ergonomic design for efficient ironing.',
    features: [
      'Large pressing surface for efficient ironing',
      'Adjustable temperature and steam settings',
      'Ergonomic design for comfortable use',
      'Heavy-duty construction for durability'
    ],
    dateAdded: '2023-12-05T13:15:00Z',
    supplier: 'IronMaster'
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
    case 'supplier':
      return productsCopy.sort((a, b) => a.supplier.localeCompare(b.supplier));
    default:
      return productsCopy;
  }
}