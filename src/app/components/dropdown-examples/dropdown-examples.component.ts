import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

interface Country {
  name: string;
  code: string;
}

interface City {
  name: string;
  code: string;
  country: string;
}

interface Product {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-dropdown-examples',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    MessageModule
  ],
  templateUrl: './dropdown-examples.component.html',
  styleUrl: './dropdown-examples.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropdownExamplesComponent {
  // Basic dropdown
  selectedCountry: Country | null = null;
  countries: Country[] = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ];

  // Multi-select dropdown
  selectedCities: City[] = [];
  cities: City[] = [
    { name: 'New York', code: 'NY', country: 'US' },
    { name: 'Rome', code: 'RM', country: 'IT' },
    { name: 'London', code: 'LDN', country: 'GB' },
    { name: 'Istanbul', code: 'IST', country: 'TR' },
    { name: 'Paris', code: 'PRS', country: 'FR' },
    { name: 'Tokyo', code: 'TKY', country: 'JP' },
    { name: 'Sydney', code: 'SYD', country: 'AU' },
    { name: 'Berlin', code: 'BRL', country: 'DE' },
    { name: 'Madrid', code: 'MAD', country: 'ES' },
    { name: 'Mumbai', code: 'MUM', country: 'IN' }
  ];

  // Filterable dropdown
  selectedProduct: Product | null = null;
  products: Product[] = [
    { name: 'Laptop', category: 'Electronics', price: 999, inStock: true },
    { name: 'Smartphone', category: 'Electronics', price: 699, inStock: true },
    { name: 'Headphones', category: 'Electronics', price: 199, inStock: false },
    { name: 'Coffee Maker', category: 'Appliances', price: 149, inStock: true },
    { name: 'Desk Chair', category: 'Furniture', price: 299, inStock: true },
    { name: 'Bookshelf', category: 'Furniture', price: 199, inStock: false },
    { name: 'Running Shoes', category: 'Sports', price: 129, inStock: true },
    { name: 'Yoga Mat', category: 'Sports', price: 49, inStock: true },
    { name: 'Blender', category: 'Appliances', price: 89, inStock: false },
    { name: 'Tablet', category: 'Electronics', price: 499, inStock: true }
  ];

  // Grouped dropdown
  selectedGroupedItem: any = null;
  groupedItems = [
    {
      label: 'Electronics',
      items: [
        { label: 'Laptop', value: 'laptop' },
        { label: 'Smartphone', value: 'smartphone' },
        { label: 'Tablet', value: 'tablet' }
      ]
    },
    {
      label: 'Furniture',
      items: [
        { label: 'Desk', value: 'desk' },
        { label: 'Chair', value: 'chair' },
        { label: 'Bookshelf', value: 'bookshelf' }
      ]
    },
    {
      label: 'Sports',
      items: [
        { label: 'Running Shoes', value: 'shoes' },
        { label: 'Yoga Mat', value: 'mat' },
        { label: 'Dumbbells', value: 'dumbbells' }
      ]
    }
  ];

  // Disabled dropdown
  selectedDisabled: string | null = null;
  disabledOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2 (Disabled)', value: 'option2', disabled: true },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4 (Disabled)', value: 'option4', disabled: true },
    { label: 'Option 5', value: 'option5' }
  ];

  // Loading dropdown
  selectedLoading: string | null = null;
  loadingOptions = [
    { label: 'Loading Option 1', value: 'loading1' },
    { label: 'Loading Option 2', value: 'loading2' },
    { label: 'Loading Option 3', value: 'loading3' }
  ];
  isLoading = false;

  // Custom template dropdown
  selectedCustom: any = null;
  customOptions = [
    { name: 'John Doe', role: 'Developer', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png' },
    { name: 'Jane Smith', role: 'Designer', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png' },
    { name: 'Mike Johnson', role: 'Manager', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png' },
    { name: 'Sarah Wilson', role: 'Analyst', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png' }
  ];

  // Editable dropdown
  selectedEditable: string | null = null;
  editableOptions = [
    { label: 'Custom Option 1', value: 'custom1' },
    { label: 'Custom Option 2', value: 'custom2' },
    { label: 'Custom Option 3', value: 'custom3' }
  ];

  // Virtual scroll dropdown
  selectedVirtual: any = null;
  virtualOptions: any[] = [];

  constructor() {
    // Generate virtual scroll options
    for (let i = 0; i < 10000; i++) {
      this.virtualOptions.push({
        label: `Option ${i + 1}`,
        value: `option_${i + 1}`
      });
    }
  }

  onCountryChange() {
    console.log('Selected country:', this.selectedCountry);
  }

  onCitiesChange() {
    console.log('Selected cities:', this.selectedCities);
  }

  onProductChange() {
    console.log('Selected product:', this.selectedProduct);
  }

  onGroupedItemChange() {
    console.log('Selected grouped item:', this.selectedGroupedItem);
  }

  onCustomChange() {
    console.log('Selected custom item:', this.selectedCustom);
  }

  onEditableChange() {
    console.log('Selected editable item:', this.selectedEditable);
  }

  onVirtualChange() {
    console.log('Selected virtual item:', this.selectedVirtual);
  }

  simulateLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  clearSelection() {
    this.selectedCountry = null;
    this.selectedCities = [];
    this.selectedProduct = null;
    this.selectedGroupedItem = null;
    this.selectedCustom = null;
    this.selectedEditable = null;
    this.selectedVirtual = null;
  }

  getFlagUrl(countryCode: string): string {
    // Using a reliable flag API service
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
  }
}