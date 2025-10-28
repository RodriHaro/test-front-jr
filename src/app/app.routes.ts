import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CharactersListComponent } from './features/characters/characters-list/characters-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - Rick and Morty' },
  { path: 'characters', component: CharactersListComponent, title: 'Personajes - Rick and Morty' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
