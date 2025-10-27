import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturesGridComponent } from './features-grid/features-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturesGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
