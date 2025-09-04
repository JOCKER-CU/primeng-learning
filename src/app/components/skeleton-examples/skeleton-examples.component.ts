import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-skeleton-examples',
    standalone: true,
    imports: [
        CommonModule,
        SkeletonModule,
        CardModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        DropdownModule,
        FormsModule
    ],
    templateUrl: './skeleton-examples.component.html',
    styleUrl: './skeleton-examples.component.scss'
})
export class SkeletonExamplesComponent {
    isLoading = true;
    showContent = false;
    selectedAnimation: 'wave' | 'none' = 'wave';
    selectedBorderRadius: '0' | '4px' | '8px' | '12px' = '4px';

    // Sample data for when content is loaded
    products = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
        { id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99 },
        { id: 3, name: 'Headphones', category: 'Audio', price: 199.99 },
        { id: 4, name: 'Tablet', category: 'Electronics', price: 499.99 },
        { id: 5, name: 'Keyboard', category: 'Accessories', price: 79.99 }
    ];

    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
    ];

    toggleLoading() {
        this.isLoading = !this.isLoading;
        if (!this.isLoading) {
            // Simulate loading delay
            setTimeout(() => {
                this.showContent = true;
            }, 1000);
        } else {
            this.showContent = false;
        }
    }

    resetDemo() {
        this.isLoading = true;
        this.showContent = false;
    }
}
