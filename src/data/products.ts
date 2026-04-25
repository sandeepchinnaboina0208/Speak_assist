export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 159900,
    originalPrice: 169900,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2456,
    inStock: true,
    description: 'Latest Apple flagship with A17 Pro chip and titanium design',
    category: 'electronics'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 134999,
    originalPrice: 149999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 1823,
    inStock: true,
    description: 'Premium Android phone with S Pen and AI features',
    category: 'electronics'
  },
  {
    id: '3',
    name: 'MacBook Pro 14"',
    price: 199900,
    originalPrice: 209900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 3421,
    inStock: true,
    description: 'M3 Pro chip, stunning Liquid Retina XDR display',
    category: 'electronics'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    price: 29990,
    originalPrice: 34990,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 4567,
    inStock: true,
    description: 'Industry-leading noise cancellation headphones',
    category: 'electronics'
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    price: 12995,
    originalPrice: 14995,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 892,
    inStock: true,
    description: 'Iconic style meets all-day comfort',
    category: 'fashion'
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 23',
    price: 16999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    description: 'Premium running shoes with BOOST cushioning',
    category: 'fashion'
  },
  {
    id: '7',
    name: 'The Psychology of Money',
    price: 399,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 5678,
    inStock: true,
    description: 'Timeless lessons on wealth, greed, and happiness',
    category: 'books'
  },
  {
    id: '8',
    name: 'Atomic Habits',
    price: 449,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 8932,
    inStock: true,
    description: 'An Easy & Proven Way to Build Good Habits',
    category: 'books'
  },
  {
    id: '9',
    name: 'Instant Pot Duo 7-in-1',
    price: 8999,
    originalPrice: 10999,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 2341,
    inStock: true,
    description: 'Electric pressure cooker, 6 quart capacity',
    category: 'home'
  },
  {
    id: '10',
    name: 'Dyson V15 Detect',
    price: 62900,
    originalPrice: 69900,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1567,
    inStock: true,
    description: 'Cordless vacuum with laser dust detection',
    category: 'home'
  },
  {
    id: '11',
    name: 'Cricket Bat - MRF Genius',
    price: 15999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 456,
    inStock: true,
    description: 'English willow bat, Virat Kohli edition',
    category: 'sports'
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 789,
    inStock: true,
    description: 'Extra thick, non-slip exercise mat',
    category: 'sports'
  },
  {
    id: '13',
    name: 'OnePlus 12',
    price: 64999,
    originalPrice: 69999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    description: 'Flagship killer with Snapdragon 8 Gen 3',
    category: 'electronics'
  },
  {
    id: '14',
    name: 'iPad Pro 12.9"',
    price: 112900,
    originalPrice: 119900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 2345,
    inStock: true,
    description: 'M2 chip, Liquid Retina XDR display',
    category: 'electronics'
  },
  {
    id: '15',
    name: 'Levi\'s 501 Original Jeans',
    price: 3999,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 3456,
    inStock: true,
    description: 'Classic straight leg, 100% cotton',
    category: 'fashion'
  },
  {
    id: '16',
    name: 'Ray-Ban Aviator Classic',
    price: 8990,
    originalPrice: 10990,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 2789,
    inStock: true,
    description: 'Iconic sunglasses with G-15 lenses',
    category: 'fashion'
  },
  {
    id: '17',
    name: 'Philips Air Fryer XXL',
    price: 24999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 1890,
    inStock: true,
    description: 'Rapid Air technology, 7.3L capacity',
    category: 'home'
  },
  {
    id: '18',
    name: 'Deep Work',
    price: 349,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 4567,
    inStock: true,
    description: 'Rules for Focused Success by Cal Newport',
    category: 'books'
  },
  {
    id: '19',
    name: 'Dumbbell Set 20kg',
    price: 4999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 678,
    inStock: true,
    description: 'Adjustable rubber-coated dumbbells',
    category: 'sports'
  },
  {
    id: '20',
    name: 'Apple Watch Series 9',
    price: 41900,
    originalPrice: 44900,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 3456,
    inStock: true,
    description: 'Advanced health features, S9 chip',
    category: 'electronics'
  },
  {
    id: '21',
    name: 'Budget Wireless Earbuds',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    rating: 4.2,
    reviews: 5678,
    inStock: true,
    description: 'True wireless with 24hr battery life',
    category: 'electronics'
  },
  {
    id: '22',
    name: 'Portable Bluetooth Speaker',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 2345,
    inStock: true,
    description: 'Waterproof, 12hr battery, deep bass',
    category: 'electronics'
  },
  {
    id: '23',
    name: 'Canvas Sneakers',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 890,
    inStock: true,
    description: 'Classic casual shoes, multiple colors',
    category: 'fashion'
  },
  {
    id: '24',
    name: 'Water Bottle 1L',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 3456,
    inStock: true,
    description: 'Insulated stainless steel, keeps cold 24hrs',
    category: 'sports'
  }
];

export const categories = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'home', name: 'Home', slug: 'home' },
  { id: 'sports', name: 'Sports', slug: 'sports' }
];

export interface SearchFilters {
  maxPrice?: number;
  minPrice?: number;
  category?: string;
}

export const searchProducts = (query: string, filters?: SearchFilters): Product[] => {
  const searchTerm = query.toLowerCase().trim();
  
  let results = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);
    
    return matchesSearch;
  });

  // Apply price filters
  if (filters?.maxPrice !== undefined) {
    results = results.filter(product => product.price <= filters.maxPrice!);
  }
  
  if (filters?.minPrice !== undefined) {
    results = results.filter(product => product.price >= filters.minPrice!);
  }

  // Apply category filter
  if (filters?.category && filters.category !== 'all') {
    results = results.filter(product => product.category === filters.category);
  }

  return results;
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
