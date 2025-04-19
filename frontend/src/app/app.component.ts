import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
