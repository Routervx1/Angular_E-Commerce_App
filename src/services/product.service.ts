import { Injectable, computed, signal } from '@angular/core';
import { Product, PetCategory } from '../models/product.model';

const CATALOG: Product[] = [
  {
    id: 'p1',
    name: 'Cozy Cloud Dog Bed',
    category: 'Dogs',
    price: 49.99,
    rating: 4.8,
    reviewCount: 312,
    description:
      'A plush, machine-washable bed with memory foam support for dogs of all sizes. Keeps joints comfortable through every nap.',
    emoji: '🛏️',
    color: '#f6c99b',
    tags: ['bed', 'comfort', 'bestseller'],
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Adventure Harness',
    category: 'Dogs',
    price: 34.5,
    rating: 4.6,
    reviewCount: 198,
    description: 'No-pull, padded harness built for hiking trails and city walks alike. Reflective stitching keeps evening walks safe.',
    emoji: '🦺',
    color: '#a7c7e7',
    tags: ['walking', 'safety'],
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Squeaky Bone Trio',
    category: 'Dogs',
    price: 12.99,
    rating: 4.3,
    reviewCount: 540,
    description: 'Three durable rubber bones in fun flavors. Great for chewers who need something that lasts.',
    emoji: '🦴',
    color: '#f7e08a',
    tags: ['toy', 'chew'],
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Feather Wand Deluxe',
    category: 'Cats',
    price: 9.99,
    rating: 4.7,
    reviewCount: 421,
    description: 'An irresistible feather wand toy that brings out every cat’s inner hunter. Replaceable feather tips included.',
    emoji: '🪶',
    color: '#d9b8f2',
    tags: ['toy', 'interactive'],
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Skyline Cat Tree',
    category: 'Cats',
    price: 119.0,
    rating: 4.9,
    reviewCount: 267,
    description: 'A five-level scratching tower with hideaway condo and sunny perch. Sturdy base keeps it stable during zoomies.',
    emoji: '🐈',
    color: '#c6e2c6',
    tags: ['furniture', 'scratching'],
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Self-Cleaning Litter Box',
    category: 'Cats',
    price: 89.99,
    rating: 4.4,
    reviewCount: 156,
    description: 'Rake system automatically clumps and clears waste, cutting down on daily scooping duty.',
    emoji: '🧹',
    color: '#eec9c0',
    tags: ['essentials'],
    inStock: false,
  },
  {
    id: 'p7',
    name: 'Betta Fish Starter Tank',
    category: 'Fish',
    price: 64.0,
    rating: 4.5,
    reviewCount: 98,
    description: '5-gallon tank kit with quiet filter, LED light, and a heater sized right for a happy betta.',
    emoji: '🐠',
    color: '#9fd8dc',
    tags: ['tank', 'starter kit'],
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Aquatic Plant Bundle',
    category: 'Fish',
    price: 18.5,
    rating: 4.2,
    reviewCount: 74,
    description: 'Six low-maintenance live plants that oxygenate the tank and give shy fish plenty of cover.',
    emoji: '🌿',
    color: '#bfe3c4',
    tags: ['decor', 'live plants'],
    inStock: true,
  },
  {
    id: 'p9',
    name: 'Colorful Parrot Swing',
    category: 'Birds',
    price: 15.75,
    rating: 4.6,
    reviewCount: 133,
    description: 'A bright wooden swing with natural fibers safe for beaks. Fits most standard cage bar spacing.',
    emoji: '🦜',
    color: '#f5b7c4',
    tags: ['toy', 'perch'],
    inStock: true,
  },
  {
    id: 'p10',
    name: 'Songbird Seed Mix (5 lb)',
    category: 'Birds',
    price: 21.25,
    rating: 4.7,
    reviewCount: 210,
    description: 'A nutrient-rich blend of seeds, dried fruit, and nuts loved by cockatiels, parakeets, and finches.',
    emoji: '🌾',
    color: '#f2d98d',
    tags: ['food'],
    inStock: true,
  },
  {
    id: 'p11',
    name: 'Cozy Hideout Hut',
    category: 'Small Pets',
    price: 14.25,
    rating: 4.5,
    reviewCount: 88,
    description: 'A wooden hideaway for hamsters, guinea pigs, and rabbits to burrow and feel safe.',
    emoji: '🐹',
    color: '#e3c9a8',
    tags: ['habitat', 'comfort'],
    inStock: true,
  },
  {
    id: 'p12',
    name: 'Exercise Wheel Silent Spin',
    category: 'Small Pets',
    price: 27.0,
    rating: 4.4,
    reviewCount: 152,
    description: 'A whisper-quiet running wheel with a solid track, gentle on tiny paws and nighttime ears alike.',
    emoji: '🎡',
    color: '#c9d6f2',
    tags: ['exercise'],
    inStock: true,
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = signal<Product[]>(CATALOG);
  private readonly searchTerm = signal('');
  private readonly activeCategory = signal<PetCategory | 'All'>('All');

  readonly categories: (PetCategory | 'All')[] = ['All', 'Dogs', 'Cats', 'Fish', 'Birds', 'Small Pets'];

  readonly search = this.searchTerm.asReadonly();
  readonly category = this.activeCategory.asReadonly();

  readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.activeCategory();

    return this.products().filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesTerm =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesTerm;
    });
  });

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setCategory(category: PetCategory | 'All'): void {
    this.activeCategory.set(category);
  }

  getById(id: string): Product | undefined {
    return this.products().find((product) => product.id === id);
  }
}
