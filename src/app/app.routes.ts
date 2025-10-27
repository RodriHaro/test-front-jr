import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CharactersListComponent } from './features/characters/characters-list/characters-list.component';
import { ContactFormComponent } from './features/contact/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - Rick and Morty' },
  { path: 'characters', component: CharactersListComponent, title: 'Characters - Rick and Morty' },
  { path: 'contact', component: ContactFormComponent, title: 'Contact - Rick and Morty' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
