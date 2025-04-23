import { Component, OnInit } from '@angular/core';

import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}
}
