import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GamesService } from './games.service';
import { Game } from '../interfaces/game';
import { environment } from '../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';


describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all games', () => {
    const dummyGames: Game[] = [
      { id: 1, title: 'Game 1' },
      { id: 2, title: 'Game 2' }
    ] as Game[];

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should get games by genre', () => {
    const genre = 'shooter';
    const dummyGames: Game[] = [{ id: 1, title: 'Shooter Game' }] as Game[];

    service.getGamesByGenre(genre).subscribe(games => {
      expect(games.length).toBe(1);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games?category=${genre}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should get games by platform', () => {
    const platform = 'pc';
    const dummyGames: Game[] = [{ id: 1, title: 'PC Game' }] as Game[];

    service.getGamesByPlatform(platform).subscribe(games => {
      expect(games.length).toBe(1);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games?platform=${platform}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should get games by genre and platform', () => {
    const genre = 'rpg';
    const platform = 'pc';
    const dummyGames: Game[] = [{ id: 1, title: 'PC RPG Game' }] as Game[];

    service.getGamesByGenreAndPlatform(genre, platform).subscribe(games => {
      expect(games.length).toBe(1);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games?platform=${platform}&category=${genre}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should get game by id', () => {
    const gameId = '123';
    const dummyGame: Game = { id: 123, title: 'Specific Game' } as Game;

    service.getGameById(gameId).subscribe(game => {
      expect(game).toEqual(dummyGame);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/game?id=${gameId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGame);
  });
});