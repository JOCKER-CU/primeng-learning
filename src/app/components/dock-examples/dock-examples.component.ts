import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dock-examples',
  standalone: true,
  imports: [CommonModule, DockModule, CardModule],
  templateUrl: './dock-examples.component.html',
  styleUrl: './dock-examples.component.scss'
})
export class DockExamplesComponent {
  items: MenuItem[] = [];
  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => window.alert('Home clicked')
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => window.alert('Search clicked')
      },
      {
        label: 'Calendar',
        icon: 'pi pi-calendar',
        command: () => window.alert('Calendar clicked')
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => window.alert('Settings clicked')
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        command: () => window.alert('Help clicked')
      }
    ];

    this.leftItems = [
      { label: 'Mail', icon: 'pi pi-envelope' },
      { label: 'Users', icon: 'pi pi-users' },
      { label: 'Chat', icon: 'pi pi-comments' },
      { label: 'Tasks', icon: 'pi pi-check-square' },
    ];

    this.rightItems = [
      { label: 'Download', icon: 'pi pi-download' },
      { label: 'Upload', icon: 'pi pi-upload' },
      { label: 'Share', icon: 'pi pi-share-alt' },
      { label: 'Trash', icon: 'pi pi-trash' },
    ];
  }
}
