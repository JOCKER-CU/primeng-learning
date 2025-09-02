import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-button-examples',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    BadgeModule,
    MenuModule
  ],
  templateUrl: './button-examples.component.html',
  styleUrl: './button-examples.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonExamplesComponent {
  counter = 0;
  isToggled = false;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  reset() {
    this.counter = 0;
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }

  onSave() {
    console.log('Save clicked');
  }

  onSaveAs() {
    console.log('Save As clicked');
  }

  onExport() {
    console.log('Export clicked');
  }

  onPrint() {
    console.log('Print clicked');
  }

  onAddUser() {
    console.log('Add User clicked');
  }

  onAddFile() {
    console.log('Add File clicked');
  }

  onAddFolder() {
    console.log('Add Folder clicked');
  }
}
