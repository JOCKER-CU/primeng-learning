import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

interface Country {
  name: string;
  code: string;
}

interface Skill {
  name: string;
  code: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: Country | null;
  birthDate: Date | null;
  bio: string;
}

@Component({
  selector: 'app-input-examples',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    SliderModule,
    RatingModule,
    ButtonModule
  ],
  templateUrl: './input-examples.component.html',
  styleUrl: './input-examples.component.scss'
})
export class InputExamplesComponent {
  // Dropdown data
  selectedCountry: Country | null = null;
  selectedCity: string | null = null;

  countries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Japan', code: 'JP' },
    { name: 'Australia', code: 'AU' }
  ];

  cities: string[] = [];

  // MultiSelect data
  selectedSkills: Skill[] = [];

  skills: Skill[] = [
    { name: 'Angular', code: 'ANG' },
    { name: 'React', code: 'REA' },
    { name: 'Vue.js', code: 'VUE' },
    { name: 'TypeScript', code: 'TS' },
    { name: 'JavaScript', code: 'JS' },
    { name: 'HTML/CSS', code: 'HC' },
    { name: 'Node.js', code: 'NODE' },
    { name: 'Python', code: 'PY' },
    { name: 'Java', code: 'JAVA' },
    { name: 'C#', code: 'CS' }
  ];

  // Calendar data
  selectedDate: Date | null = null;
  selectedDateTime: Date | null = null;

  // Checkbox & Radio data
  preferences = {
    email: false,
    sms: false,
    push: false
  };

  gender: string = '';

  // Slider data
  age: number = 25;
  rating: number = 3;

  // Rating data
  productRating: number = 0;

  // Form data
  formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: null,
    birthDate: null,
    bio: ''
  };

  constructor() {
    // Initialize cities based on selected country
    this.updateCities();
  }

  updateCities() {
    if (this.selectedCountry) {
      switch (this.selectedCountry.code) {
        case 'US':
          this.cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
          break;
        case 'CA':
          this.cities = ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'];
          break;
        case 'UK':
          this.cities = ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'];
          break;
        case 'DE':
          this.cities = ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'];
          break;
        case 'FR':
          this.cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'];
          break;
        case 'JP':
          this.cities = ['Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka'];
          break;
        case 'AU':
          this.cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];
          break;
        default:
          this.cities = [];
      }
    } else {
      this.cities = [];
      this.selectedCity = null;
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Form submitted successfully! Check console for data.');
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: null,
      birthDate: null,
      bio: ''
    };
  }
}
