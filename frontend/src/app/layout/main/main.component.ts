import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

import { ROUTES } from '../../utils/constants';

import { filter } from 'rxjs/operators';
import { ButtonComponent } from '../../components/button.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: '../../../styles.css',
})
export class MainComponent {
  readonly ROUTES = ROUTES;
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.currentRoute.startsWith(path);
  }
}
