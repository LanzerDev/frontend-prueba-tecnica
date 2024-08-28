import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { enviroment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})

export class GamesService {

  private apiUrl = enviroment.apiUrl

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}/games`)
  }

  getGamesByGenre(genre: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}/games?category=${genre}`)
  }

  getGamesByPlatform(platform: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}/games?platform=${platform}`)
  }

  getGamesByGenreAndPlatform(genre: string, platform: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}/games?platform=${platform}&category=${genre}`)
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/game?id=${id}`);
  }

}
