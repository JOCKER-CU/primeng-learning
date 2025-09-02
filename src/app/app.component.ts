import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'primeng-learning';

  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    const currentUrl = this.router.url;
    
    // Handle root route
    if (route === '/buttons' && (currentUrl === '/' || currentUrl === '/buttons')) {
      return true;
    }
    
    // Handle other routes
    return currentUrl === route || currentUrl.startsWith(route + '/');
  }
}
