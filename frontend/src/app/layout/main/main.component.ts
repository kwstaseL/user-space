import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { ButtonComponent } from '../../components/button.component';
import { ROUTES } from '../../utils/constants';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
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
