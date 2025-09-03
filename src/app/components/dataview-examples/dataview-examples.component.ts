import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  image: string;
}

@Component({
  selector: 'app-dataview-examples',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataViewModule,
    DropdownModule,
    PaginatorModule,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './dataview-examples.component.html',
  styleUrl: './dataview-examples.component.scss'
})
export class DataviewExamplesComponent {
  products: Product[] = [];
  layout: 'grid' | 'list' = 'grid';
  sortKey = 'name';
  sortOptions = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Price (Low to High)', value: 'price' },
    { label: 'Rating (High to Low)', value: 'rating' },
    { label: 'Category (A-Z)', value: 'category' }
  ];

  constructor() {
    this.products = Array.from({ length: 36 }).map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      category: ['Electronics', 'Accessories', 'Clothing', 'Home'][i % 4],
      price: Math.round(20 + Math.random() * 200),
      rating: Math.floor(3 + Math.random() * 3),
      inventoryStatus: (['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'] as const)[i % 3],
      // Reliable placeholder image per product
      image: `https://picsum.photos/seed/primeng-product-${i + 1}/300/200`
    }));
    this.sortProducts();
  }

  onSortChange() {
    this.sortProducts();
  }

  sortProducts() {
    const key = this.sortKey as keyof Product;
    this.products = [...this.products].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv));
    });
  }

  getInventorySeverity(status: Product['inventoryStatus']): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      default:
        return 'danger';
    }
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/300x200?text=Image+Unavailable';
  }

  onImgLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
}
