import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickMortyService } from '../../../core/services/rick-morty.service';
import { Character, ApiResponse } from '../../../core/models/character';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { ErrorStateComponent } from '../../../shared/error-state/error-state.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    CharacterCardComponent,
    PaginatorComponent,
    LoaderComponent,
    ErrorStateComponent,
    EmptyStateComponent,
  ],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css',
})
export class CharactersListComponent implements OnInit {
  private rickMortyService = inject(RickMortyService);

  characters: Character[] = [];
  loading = false;
  error = false;
  errorMessage = '';
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  nextUrl: string | null = null;
  prevUrl: string | null = null;

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.error = false;

    const request = this.searchTerm.trim()
      ? this.rickMortyService.searchCharacters(this.searchTerm.trim(), this.currentPage)
      : this.rickMortyService.getCharacters(this.currentPage);

    request.subscribe({
      next: (response: ApiResponse) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.nextUrl = response.info.next;
        this.prevUrl = response.info.prev;
        this.loading = false;
      },
      error: err => {
        this.error = true;
        this.errorMessage = err.error?.error || 'Error al cargar personajes';
        this.loading = false;
        this.characters = [];
      },
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadCharacters();
  }

  onPageChange(direction: 'next' | 'prev'): void {
    const url = direction === 'next' ? this.nextUrl : this.prevUrl;

    if (url) {
      this.loading = true;
      this.error = false;

      this.rickMortyService.getCharactersByUrl(url).subscribe({
        next: (response: ApiResponse) => {
          this.characters = response.results;
          this.currentPage = direction === 'next' ? this.currentPage + 1 : this.currentPage - 1;
          this.nextUrl = response.info.next;
          this.prevUrl = response.info.prev;
          this.loading = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: err => {
          this.error = true;
          this.errorMessage = err.error?.error || 'Error al cargar personajes';
          this.loading = false;
        },
      });
    }
  }

  retry(): void {
    this.loadCharacters();
  }

  trackByCharacterId(index: number, character: Character): number {
    return character.id;
  }
}
