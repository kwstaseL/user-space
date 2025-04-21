import { Component } from '@angular/core';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
