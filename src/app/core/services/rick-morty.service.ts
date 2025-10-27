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

  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  searchCharacters(name: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}`);
  }

  getCharactersByUrl(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
