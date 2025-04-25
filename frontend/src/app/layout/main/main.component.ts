import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

import { ROUTES } from '../../utils/constants';

import { filter } from 'rxjs/operators';
import { ButtonComponent } from '../../components/button.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterOutlet, ButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: '../../../styles.css',
})
export class MainComponent {
  readonly ROUTES = ROUTES;
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  isButtonActive(path: string): boolean {
    return this.currentRoute.startsWith(path);
  }
}
