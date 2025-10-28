import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Character } from '../models/character';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';
  private http = inject(HttpClient);

  getCharacters(page = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/character?page=${page}`);
  }

  searchCharacters(name: string, page = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/character?name=${name}&page=${page}`);
  }

  getCharactersByUrl(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }
}
