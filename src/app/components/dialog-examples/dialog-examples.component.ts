import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  notes: string;
}

@Component({
  selector: 'app-dialog-examples',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    SidebarModule,
    OverlayPanelModule,
    TooltipModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dialog-examples.component.html',
  styleUrl: './dialog-examples.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogExamplesComponent {
  // Dialog visibility states
  basicDialogVisible = false;
  formDialogVisible = false;
  dynamicContentDialogVisible = false;
  sidebarVisible = false;

  // Form data
  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    notes: ''
  };

  // Dropdown options
  roles = ['Admin', 'User', 'Manager', 'Editor', 'Viewer'];
  departments = ['IT', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations'];

  // Dynamic content
  currentStep = 1;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  // Basic Dialog Methods
  showBasicDialog() {
    this.basicDialogVisible = true;
  }

  closeBasicDialog() {
    this.basicDialogVisible = false;
  }

  saveBasicDialog() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Basic dialog saved successfully!'
    });
    this.closeBasicDialog();
  }

  // Confirmation Dialog Methods
  showConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Item deleted successfully!'
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Delete operation cancelled.'
        });
      }
    });
  }

  showConfirmAction() {
    this.confirmationService.confirm({
      message: 'Do you want to proceed with this action?',
      header: 'Action Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Action completed successfully!'
        });
      }
    });
  }

  // Form Dialog Methods
  showFormDialog() {
    this.formDialogVisible = true;
  }

  closeFormDialog() {
    this.formDialogVisible = false;
    this.resetForm();
  }

  saveUser() {
    if (this.isFormValid()) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `User ${this.newUser.firstName} ${this.newUser.lastName} saved successfully!`
      });
      this.closeFormDialog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields.'
      });
    }
  }

  resetForm() {
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      notes: ''
    };
  }

  isFormValid(): boolean {
    return !!(this.newUser.firstName && this.newUser.lastName && this.newUser.email);
  }

  // Dynamic Dialog Methods
  showDynamicDialog() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Dynamic dialog functionality would be implemented here.'
    });
  }

  // Sidebar Methods
  showSidebar() {
    this.sidebarVisible = true;
  }

  // Dynamic Content Dialog Methods
  showDynamicContentDialog() {
    this.dynamicContentDialogVisible = true;
    this.currentStep = 1;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  completeSteps() {
    this.messageService.add({
      severity: 'success',
      summary: 'Completed',
      detail: 'All steps completed successfully!'
    });
    this.dynamicContentDialogVisible = false;
    this.currentStep = 1;
  }

  // Toast Methods
  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'This is a success message!'
    });
  }

  showInfoToast() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'This is an information message!'
    });
  }

  showWarningToast() {
    this.messageService.add({
      severity: 'warning',
      summary: 'Warning',
      detail: 'This is a warning message!'
    });
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'This is an error message!'
    });
  }
}
