import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { Genre } from '../enums/genre';


@Injectable({
  providedIn: 'root'
})

export class GamesService {

  private api = '/api'

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.api}/games`)
  }

  getGamesByGenre(genre: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.api}/games?category=${genre}`)
  }

  getGamesByPlatform(platform: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.api}/games?platform=${platform}`)
  }

  getGamesByGenreAndPlatform(genre: string, platform: string): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.api}/games?platform=${platform}&category=${genre}`)
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.api}/game?id=${id}`);
  }

}
