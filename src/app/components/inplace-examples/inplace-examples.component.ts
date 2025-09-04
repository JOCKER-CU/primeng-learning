import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InplaceModule } from 'primeng/inplace';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Product {
    code: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: Date;
}

@Component({
    selector: 'app-inplace-examples',
    standalone: true,
    imports: [
        CommonModule,
        InplaceModule,
        CardModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './inplace-examples.component.html',
    styleUrl: './inplace-examples.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InplaceExamplesComponent {
    // Text editing
    textValue = 'Click to edit this text';
    textareaValue = 'This is a longer text that can be edited inline. Click to modify the content.';

    // Image editing
    imageUrl = 'https://picsum.photos/200/150';
    imageAlt = 'Sample Image';

    // Dropdown editing
    selectedCategory = 'Electronics';
    categories = [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Books', value: 'Books' },
        { label: 'Home & Garden', value: 'Home & Garden' },
        { label: 'Sports', value: 'Sports' }
    ];

    // Date editing
    selectedDate = new Date();

    // Product data
    products: Product[] = [
        { code: 'P001', name: 'Laptop', category: 'Electronics', quantity: 10, price: 999.99, description: 'High-performance laptop for professionals' },
        { code: 'P002', name: 'Smartphone', category: 'Electronics', quantity: 25, price: 699.99, description: 'Latest smartphone with advanced features' },
        { code: 'P003', name: 'Headphones', category: 'Audio', quantity: 50, price: 199.99, description: 'Wireless noise-canceling headphones' },
        { code: 'P004', name: 'Tablet', category: 'Electronics', quantity: 15, price: 499.99, description: 'Portable tablet for work and entertainment' },
        { code: 'P005', name: 'Keyboard', category: 'Accessories', quantity: 30, price: 79.99, description: 'Mechanical keyboard for gaming and typing' }
    ];

    // User data
    users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: new Date('2024-01-15') },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: new Date('2024-01-14') },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: new Date('2024-01-10') }
    ];

    // Editing states
    editingProduct: Product | null = null;
    editingUser: User | null = null;

    // Dialog visibility states
    showProductDialog = false;
    showUserDialog = false;

    // Roles and statuses
    roles = [
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' },
        { label: 'Editor', value: 'Editor' },
        { label: 'Viewer', value: 'Viewer' }
    ];

    statuses = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Suspended', value: 'Suspended' }
    ];

    constructor(private messageService: MessageService) { }

    // Text editing methods
    onTextSave(newValue: string) {
        this.textValue = newValue;
        this.messageService.add({ severity: 'success', summary: 'Text Updated', detail: 'Text has been saved successfully' });
    }

    onTextareaSave(newValue: string) {
        this.textareaValue = newValue;
        this.messageService.add({ severity: 'success', summary: 'Text Updated', detail: 'Textarea content has been saved successfully' });
    }

    // Image editing methods
    onImageSave(newUrl: string) {
        this.imageUrl = newUrl;
        this.messageService.add({ severity: 'success', summary: 'Image Updated', detail: 'Image URL has been updated successfully' });
    }

    // Category editing methods
    onCategorySave(newCategory: string) {
        this.selectedCategory = newCategory;
        this.messageService.add({ severity: 'success', summary: 'Category Updated', detail: `Category changed to ${newCategory}` });
    }

    // Date editing methods
    onDateSave(newDate: Date) {
        this.selectedDate = newDate;
        this.messageService.add({ severity: 'success', summary: 'Date Updated', detail: 'Date has been updated successfully' });
    }

    // Product editing methods
    startEditingProduct(product: Product) {
        this.editingProduct = { ...product };
        this.showProductDialog = true;
    }

    saveProduct() {
        if (this.editingProduct) {
            const index = this.products.findIndex(p => p.code === this.editingProduct!.code);
            if (index !== -1) {
                this.products[index] = { ...this.editingProduct };
                this.messageService.add({ severity: 'success', summary: 'Product Updated', detail: `${this.editingProduct.name} has been updated` });
            }
            this.editingProduct = null;
            this.showProductDialog = false;
        }
    }

    cancelProductEdit() {
        this.editingProduct = null;
        this.showProductDialog = false;
    }

    // User editing methods
    startEditingUser(user: User) {
        this.editingUser = { ...user };
        this.showUserDialog = true;
    }

    saveUser() {
        if (this.editingUser) {
            const index = this.users.findIndex(u => u.id === this.editingUser!.id);
            if (index !== -1) {
                this.users[index] = { ...this.editingUser };
                this.messageService.add({ severity: 'success', summary: 'User Updated', detail: `${this.editingUser.name} has been updated` });
            }
            this.editingUser = null;
            this.showUserDialog = false;
        }
    }

    cancelUserEdit() {
        this.editingUser = null;
        this.showUserDialog = false;
    }

    // Data loading simulation
    loadData() {
        this.messageService.add({ severity: 'info', summary: 'Data Loading', detail: 'Product data has been loaded' });
    }

    loadUserData() {
        this.messageService.add({ severity: 'info', summary: 'Data Loading', detail: 'User data has been loaded' });
    }
}
