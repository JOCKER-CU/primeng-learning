import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

interface EventItem {
  status: string;
  date: string;
  icon: string;
  color: string;
  location?: string;
  description?: string;
}

@Component({
  selector: 'app-timeline-examples',
  standalone: true,
  imports: [CommonModule, TimelineModule, CardModule, TagModule],
  templateUrl: './timeline-examples.component.html',
  styleUrl: './timeline-examples.component.scss'
})
export class TimelineExamplesComponent {
  events: EventItem[] = [
    { status: 'Ordered', date: '2024-01-10 10:00', icon: 'pi pi-shopping-cart', color: '#6366f1', location: 'Online', description: 'Order placed successfully.' },
    { status: 'Processing', date: '2024-01-10 12:30', icon: 'pi pi-cog', color: '#22c55e', description: 'Preparing your items.' },
    { status: 'Shipped', date: '2024-01-11 08:15', icon: 'pi pi-truck', color: '#f59e0b', location: 'Distribution Center', description: 'On the way.' },
    { status: 'Delivered', date: '2024-01-12 16:45', icon: 'pi pi-check', color: '#10b981', location: 'Your Address', description: 'Delivered to recipient.' }
  ];

  horizontalEvents: EventItem[] = [
    { status: 'Kickoff', date: 'Q1', icon: 'pi pi-bullseye', color: '#06b6d4', description: 'Project kickoff and planning.' },
    { status: 'Build', date: 'Q2', icon: 'pi pi-wrench', color: '#8b5cf6', description: 'Core features implemented.' },
    { status: 'Beta', date: 'Q3', icon: 'pi pi-send', color: '#f43f5e', description: 'Public beta released.' },
    { status: 'Launch', date: 'Q4', icon: 'pi pi-rocket', color: '#22c55e', description: 'General availability.' }
  ];

  getSeverity(status: string): 'info' | 'warning' | 'success' | 'danger' {
    switch (status) {
      case 'Ordered':
        return 'info';
      case 'Processing':
        return 'warning';
      case 'Shipped':
        return 'info';
      case 'Delivered':
        return 'success';
      default:
        return 'info';
    }
  }
}
