import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyService } from './rick-morty.service';
import { ApiResponse } from '../models/character';

describe('RickMortyService', () => {
  let service: RickMortyService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://rickandmortyapi.com/api/character';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickMortyService],
    });
    service = TestBed.inject(RickMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('debe obtener personajes de la página 1 por defecto', () => {
      const mockResponse: ApiResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth', url: '' },
            location: { name: 'Earth', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '',
          },
        ],
      };

      service.getCharacters().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne(`${API_URL}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('debe obtener personajes de una página específica', () => {
      const mockResponse: ApiResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=3',
          prev: 'https://rickandmortyapi.com/api/character?page=1',
        },
        results: [],
      };

      service.getCharacters(2).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_URL}?page=2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('searchCharacters', () => {
    it('debe buscar personajes por nombre', () => {
      const searchTerm = 'Rick';
      const mockResponse: ApiResponse = {
        info: {
          count: 107,
          pages: 6,
          next: 'https://rickandmortyapi.com/api/character?page=2&name=Rick',
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth', url: '' },
            location: { name: 'Earth', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '',
          },
        ],
      };

      service.searchCharacters(searchTerm).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.results[0].name).toContain('Rick');
      });

      const req = httpMock.expectOne(`${API_URL}?name=${searchTerm}&page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('debe buscar personajes por nombre en una página específica', () => {
      const searchTerm = 'Morty';
      const mockResponse: ApiResponse = {
        info: {
          count: 107,
          pages: 6,
          next: null,
          prev: 'https://rickandmortyapi.com/api/character?page=1&name=Morty',
        },
        results: [],
      };

      service.searchCharacters(searchTerm, 2).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_URL}?name=${searchTerm}&page=2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getCharactersByUrl', () => {
    it('debe obtener personajes desde una URL específica', () => {
      const url = 'https://rickandmortyapi.com/api/character?page=3';
      const mockResponse: ApiResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=4',
          prev: 'https://rickandmortyapi.com/api/character?page=2',
        },
        results: [],
      };

      service.getCharactersByUrl(url).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('Manejo de errores', () => {
    it('debe manejar error 404 cuando no se encuentran resultados', () => {
      service.getCharacters(999).subscribe({
        next: () => fail('Debería haber fallado'),
        error: error => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(`${API_URL}?page=999`);
      req.flush({ error: 'Not found' }, { status: 404, statusText: 'Not Found' });
    });

    it('debe manejar error de red', () => {
      service.searchCharacters('Invalid').subscribe({
        next: () => fail('Debería haber fallado'),
        error: error => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`${API_URL}?name=Invalid&page=1`);
      req.flush({ error: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
