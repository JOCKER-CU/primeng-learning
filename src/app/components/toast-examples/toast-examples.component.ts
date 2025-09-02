import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast-examples',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    DividerModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './toast-examples.component.html',
  styleUrl: './toast-examples.component.scss'
})
export class ToastExamplesComponent implements OnInit {

  customMessage: string = 'This is a custom message';
  customDuration: number = 3000;
  customSeverity: string = 'info';

  severityOptions = [
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' },
    { label: 'Warn', value: 'warn' },
    { label: 'Error', value: 'error' }
  ];

  constructor(private messageService: MessageService) { }

  ngOnInit() { }

  // Basic toast examples
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed successfully!',
      life: 3000
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'Here is some useful information for you.',
      life: 4000
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please review your input before proceeding.',
      life: 5000
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong. Please try again.',
      life: 6000
    });
  }

  // Toast with custom styling
  showCustomToast() {
    this.messageService.add({
      severity: this.customSeverity as any,
      summary: 'Custom Toast',
      detail: this.customMessage,
      life: this.customDuration,
      key: 'custom'
    });
  }

  // Toast with different positions
  showTopLeft() {
    this.messageService.add({
      severity: 'info',
      summary: 'Top Left',
      detail: 'This toast appears at the top left',
      key: 'tl'
    });
  }

  showTopCenter() {
    this.messageService.add({
      severity: 'info',
      summary: 'Top Center',
      detail: 'This toast appears at the top center',
      key: 'tc'
    });
  }

  showTopRight() {
    this.messageService.add({
      severity: 'info',
      summary: 'Top Right',
      detail: 'This toast appears at the top right',
      key: 'tr'
    });
  }

  showBottomLeft() {
    this.messageService.add({
      severity: 'info',
      summary: 'Bottom Left',
      detail: 'This toast appears at the bottom left',
      key: 'bl'
    });
  }

  showBottomCenter() {
    this.messageService.add({
      severity: 'info',
      summary: 'Bottom Center',
      detail: 'This toast appears at the bottom center',
      key: 'bc'
    });
  }

  showBottomRight() {
    this.messageService.add({
      severity: 'info',
      summary: 'Bottom Right',
      detail: 'This toast appears at the bottom right',
      key: 'br'
    });
  }

  // Toast with actions
  showToastWithActions() {
    this.messageService.add({
      severity: 'info',
      summary: 'Action Required',
      detail: 'Please confirm your action',
      life: 0,
      key: 'actions',
      sticky: true
    });
  }

  // Multiple toasts
  showMultipleToasts() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'First Toast',
        detail: 'This is the first toast message',
        life: 2000
      },
      {
        severity: 'info',
        summary: 'Second Toast',
        detail: 'This is the second toast message',
        life: 3000
      },
      {
        severity: 'warn',
        summary: 'Third Toast',
        detail: 'This is the third toast message',
        life: 4000
      }
    ]);
  }

  // Clear all toasts
  clearAll() {
    this.messageService.clear();
  }

  // Clear specific toast
  clearSpecific(key: string) {
    this.messageService.clear(key);
  }
}
