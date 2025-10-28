import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturesGridComponent } from './features-grid/features-grid.component';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturesGridComponent, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
