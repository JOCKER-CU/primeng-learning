import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule } from 'primeng/editor';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-examples',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    EditorModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    RadioButtonModule,
    SliderModule,
    RatingModule,
    PasswordModule,
    FileUploadModule,
    ButtonModule,
    CardModule,
    DividerModule,
    MessageModule,
    ToastModule
  ],
  templateUrl: './form-examples.component.html',
  styleUrl: './form-examples.component.scss',
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormExamplesComponent {

  passwordTestForm!: FormGroup<any>;
  passwordtest: any;

  // OTP Input values
  otpValue: string = '';
  customOtpValue: string = '';
  alphaOtpValue: string = '';

  // OTP digit arrays for individual input handling
  otpDigits: string[] = ['', '', '', '', '', ''];
  customOtpDigits: string[] = ['', '', '', ''];
  alphaOtpDigits: string[] = ['', '', '', '', '', '', '', ''];

  // Template-driven form data
  templateForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    gender: '',
    interests: [],
    newsletter: false,
    rating: 0,
    experience: 5,
    bio: ''
  };

  // Reactive form
  reactiveForm: FormGroup;

  // Dropdown options
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer-not' }
  ];

  interestOptions = [
    { label: 'Technology', value: 'technology' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Travel', value: 'travel' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Reading', value: 'reading' }
  ];
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Los Angeles', code: 'LA' },
    { name: 'Chicago', code: 'CH' },
    { name: 'Houston', code: 'HO' },
    { name: 'Phoenix', code: 'PH' }
  ];

  countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' }
  ];
  value2: any;
  value3: any;
  value4: any;
  value1: any;
  value5: any;
  text: string = '';
  selectedCity: any;
  
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.reactiveForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      dateOfBirth: [null, Validators.required],
      gender: ['', Validators.required],
      interests: [[], Validators.required],
      country: ['', Validators.required],
      newsletter: [false],
      rating: [0, [Validators.required, Validators.min(1)]],
      experience: [5, [Validators.required, Validators.min(0), Validators.max(20)]],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    this.passwordTestForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Custom validator for password confirmation
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword && confirmPassword.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  // Template form submission
  onSubmitTemplateForm() {
    console.log('Template Form Data:', this.templateForm);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Template form submitted successfully!'
    });
  }

  // Reactive form submission
  onSubmitReactiveForm() {
    if (this.reactiveForm.valid) {
      console.log('Reactive Form Data:', this.reactiveForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Reactive form submitted successfully!'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fix the form errors before submitting.'
      });
      this.markFormGroupTouched();
    }
  }

  // Mark all form controls as touched to trigger validation display
  markFormGroupTouched() {
    Object.keys(this.reactiveForm.controls).forEach(key => {
      const control = this.reactiveForm.get(key);
      control?.markAsTouched();
    });
  }

  // Reset forms
  resetTemplateForm() {
    this.templateForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: null,
      gender: '',
      interests: [],
      newsletter: false,
      rating: 0,
      experience: 5,
      bio: ''
    };
  }

  resetReactiveForm() {
    this.reactiveForm.reset();
    this.reactiveForm.patchValue({
      experience: 5,
      rating: 0
    });
  }

  // Get form control for validation
  getFormControl(name: string) {
    return this.reactiveForm.get(name);
  }

  // Check if form control is invalid and touched
  isFieldInvalid(name: string): boolean {
    const control = this.getFormControl(name);
    return !!(control && control.invalid && control.touched);
  }

  // Get error message for form control
  getErrorMessage(name: string): string {
    const control = this.getFormControl(name);
    if (control && control.errors) {
      if (control.errors['required']) return 'This field is required.';
      if (control.errors['email']) return 'Please enter a valid email address.';
      if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength} characters.`;
      if (control.errors['min']) return `Minimum value is ${control.errors['min'].min}.`;
      if (control.errors['max']) return `Maximum value is ${control.errors['max'].max}.`;
      if (control.errors['pattern']) return 'Please enter a valid format.';
      if (control.errors['passwordMismatch']) return 'Passwords do not match.';
    }
    return '';
  }
  onSubmitPasswordTestForm() {
    console.log('Password Test Form Data:', this.passwordTestForm.value);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password test form submitted successfully!'
    });
  }
  resetPasswordTestForm() {
    this.passwordTestForm.reset();
  }

  // OTP Input methods
  verifyOtp() {
    if (this.otpValue && this.otpValue.length === 6) {
      this.messageService.add({
        severity: 'success',
        summary: 'OTP Verified',
        detail: `OTP ${this.otpValue} has been verified successfully!`
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid OTP',
        detail: 'Please enter a complete 6-digit OTP code.'
      });
    }
  }

  clearOtpInputs() {
    this.otpValue = '';
    this.customOtpValue = '';
    this.alphaOtpValue = '';

    // Clear digit arrays
    this.otpDigits = ['', '', '', '', '', ''];
    this.customOtpDigits = ['', '', '', ''];
    this.alphaOtpDigits = ['', '', '', '', '', '', '', ''];

    this.messageService.add({
      severity: 'info',
      summary: 'Cleared',
      detail: 'All OTP inputs have been cleared.'
    });
  }

  // OTP input handling methods
  onOtpInput(event: any, index: number) {
    const value = event.target.value;
    if (value && /^[0-9]$/.test(value)) {
      this.otpDigits[index] = value;
      this.otpValue = this.otpDigits.join('');

      // Auto-focus next input
      if (index < 5 && value) {
        const nextInput = event.target.parentElement?.nextElementSibling?.querySelector('input');
        if (nextInput) nextInput.focus();
      }
    }
  }

  onOtpKeydown(event: any, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = event.target.parentElement?.previousElementSibling?.querySelector('input');
      if (prevInput) prevInput.focus();
    }
  }

  onCustomOtpInput(event: any, index: number) {
    const value = event.target.value;
    if (value) {
      this.customOtpDigits[index] = value;
      this.customOtpValue = this.customOtpDigits.join('');

      // Auto-focus next input
      if (index < 3 && value) {
        const nextInput = event.target.parentElement?.nextElementSibling?.querySelector('input');
        if (nextInput) nextInput.focus();
      }
    }
  }

  onCustomOtpKeydown(event: any, index: number) {
    if (event.key === 'Backspace' && !this.customOtpDigits[index] && index > 0) {
      const prevInput = event.target.parentElement?.previousElementSibling?.querySelector('input');
      if (prevInput) prevInput.focus();
    }
  }

  onAlphaOtpInput(event: any, index: number) {
    const value = event.target.value;
    if (value && /^[A-Za-z0-9]$/.test(value)) {
      this.alphaOtpDigits[index] = value;
      this.alphaOtpValue = this.alphaOtpDigits.join('');

      // Auto-focus next input
      if (index < 7 && value) {
        const nextInput = event.target.parentElement?.nextElementSibling?.querySelector('input');
        if (nextInput) nextInput.focus();
      }
    }
  }

  onAlphaOtpKeydown(event: any, index: number) {
    if (event.key === 'Backspace' && !this.alphaOtpDigits[index] && index > 0) {
      const prevInput = event.target.parentElement?.previousElementSibling?.querySelector('input');
      if (prevInput) prevInput.focus();
    }
  }
}

