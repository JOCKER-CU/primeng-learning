import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  description: string;
  stock: number;
  created: Date;
}

@Component({
  selector: 'app-data-table-examples',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule
  ],
  templateUrl: './data-table-examples.component.html',
  styleUrl: './data-table-examples.component.scss'
})
export class DataTableExamplesComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      status: 'In Stock',
      description: 'High-performance laptop for professionals',
      stock: 15,
      created: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Smartphone',
      category: 'Electronics',
      price: 699.99,
      status: 'In Stock',
      description: 'Latest smartphone with advanced features',
      stock: 25,
      created: new Date('2024-01-20')
    },
    {
      id: 3,
      name: 'Headphones',
      category: 'Electronics',
      price: 199.99,
      status: 'Out of Stock',
      description: 'Wireless noise-canceling headphones',
      stock: 0,
      created: new Date('2024-01-10')
    },
    {
      id: 4,
      name: 'Coffee Maker',
      category: 'Home & Kitchen',
      price: 89.99,
      status: 'In Stock',
      description: 'Automatic coffee maker with timer',
      stock: 8,
      created: new Date('2024-01-25')
    },
    {
      id: 5,
      name: 'Running Shoes',
      category: 'Sports',
      price: 129.99,
      status: 'In Stock',
      description: 'Comfortable running shoes for athletes',
      stock: 12,
      created: new Date('2024-01-18')
    },
    {
      id: 6,
      name: 'Yoga Mat',
      category: 'Sports',
      price: 29.99,
      status: 'Low Stock',
      description: 'Non-slip yoga mat for home workouts',
      stock: 3,
      created: new Date('2024-01-22')
    },
    {
      id: 7,
      name: 'Blender',
      category: 'Home & Kitchen',
      price: 79.99,
      status: 'In Stock',
      description: 'High-speed blender for smoothies',
      stock: 6,
      created: new Date('2024-01-12')
    },
    {
      id: 8,
      name: 'Gaming Mouse',
      category: 'Electronics',
      price: 59.99,
      status: 'In Stock',
      description: 'Precision gaming mouse with RGB',
      stock: 20,
      created: new Date('2024-01-28')
    }
  ];

  virtualProducts: Product[] = [];

  selectedProducts: Product[] = [];

  categories = ['Electronics', 'Home & Kitchen', 'Sports', 'Books', 'Clothing'];
  statuses = ['In Stock', 'Out of Stock', 'Low Stock', 'Discontinued'];

  newProduct: Partial<Product> = {
    name: '',
    category: '',
    price: 0,
    status: ''
  };

  constructor() {
    // Generate virtual products for virtual scrolling demo
    this.generateVirtualProducts();
  }

  generateVirtualProducts() {
    const categories = ['Electronics', 'Home & Kitchen', 'Sports', 'Books', 'Clothing'];
    const statuses = ['In Stock', 'Out of Stock', 'Low Stock'];

    for (let i = 1; i <= 1000; i++) {
      this.virtualProducts.push({
        id: i,
        name: `Product ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: Math.floor(Math.random() * 1000) + 10,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        description: `Description for product ${i}`,
        stock: Math.floor(Math.random() * 50),
        created: new Date()
      });
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Out of Stock':
        return 'danger';
      case 'Low Stock':
        return 'warn';
      case 'Discontinued':
        return 'secondary';
      default:
        return 'info';
    }
  }

  clearSelection() {
    this.selectedProducts = [];
  }

  toggleRow(product: Product) {
    // This would typically be handled by the table's built-in expansion
    console.log('Toggle row for product:', product.name);
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.category && this.newProduct.price && this.newProduct.status) {
      const product: Product = {
        id: this.products.length + 1,
        name: this.newProduct.name,
        category: this.newProduct.category,
        price: this.newProduct.price,
        status: this.newProduct.status,
        description: `Description for ${this.newProduct.name}`,
        stock: Math.floor(Math.random() * 50),
        created: new Date()
      };

      this.products.push(product);
      this.clearNewProduct();
    }
  }

  clearNewProduct() {
    this.newProduct = {
      name: '',
      category: '',
      price: 0,
      status: ''
    };
  }

  getAveragePrice(): number {
    if (this.products.length === 0) return 0;
    const total = this.products.reduce((sum, product) => sum + product.price, 0);
    return total / this.products.length;
  }

  getInStockCount(): number {
    return this.products.filter(product => product.status === 'In Stock').length;
  }

  getOutOfStockCount(): number {
    return this.products.filter(product => product.status === 'Out of Stock').length;
  }
}
