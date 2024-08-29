import { Component, OnInit } from '@angular/core';
import { GamesService } from '../service/games.service';
import { Game } from '../interfaces/game';
import { Genre } from '../enums/genre';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Platform } from '../enums/platform';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgbDropdownModule, NgFor, NgIf,ReactiveFormsModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit{
 
  games: Game[] = [];
  filteredGames: Game[] = [];
  genres: string[] = Object.values(Genre);
  selectedGenre: string = '';
  platforms: string[] = Object.values(Platform);
  selectedPlatform: string = '';
  searchForm: FormGroup;
  
  constructor(
    private gameService: GamesService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTitle: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadAllGames();
    this.setUpSearch();
  }

  loadAllGames(){
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.games = games;
        this.filteredGames = games;
      },
      error: (error) => {
        console.log('Error fetching games');
      }
    })
  }

  selectGenre(genre: string): void{
    this.selectedGenre = genre;

    if(this.genres.includes(genre)){
      if(this.selectedPlatform){
        this.filterByGenreAndPlatform(this.selectedGenre, this.selectedPlatform)
      } else {
        this.filterByGenre();
      }
    } else {
      this.filterByPlatform();
    }
  }

  selectPlatform(platform: string): void{
    this.selectedPlatform = platform;

    if(this.platforms.includes(platform)){
      if(this.selectedGenre){
        this.filterByGenreAndPlatform(this.selectedGenre, this.selectedPlatform)
      } else {
        this.filterByPlatform();   
      }
    } else {
      this.filterByGenre();
    }
  }

  setUpSearch(): void {
    this.searchForm.get('searchTitle')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterByTitle(searchTerm);
      });
  }

  filterByPlatform(){
    this.gameService.getGamesByPlatform(this.selectedPlatform).subscribe({
      next: (games) => {
        this.filteredGames = games;
        console.log(games)
      },
      error: (error) => {
        console.log('Error fetching games');
      }
    })
  }

  filterByGenre(){
    this.gameService.getGamesByGenre(this.selectedGenre).subscribe({
      next: (games) => {
        this.filteredGames = games;
        console.log(games)
      },
      error: (error) => {
        console.log('Error fetching games');
      }
    })
  }

  filterByTitle(title: string): void {
    if (!title) {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(game =>
        game.title.toLowerCase().includes(title.toLowerCase())
      );
    }
  }

  filterByGenreAndPlatform(genre: string, platform: string){
    this.gameService.getGamesByGenreAndPlatform(genre, platform).subscribe({
      next: (games) => {
        this.filteredGames = games;
        console.log(games)
      },
      error: (error) => {
        console.log('Error fetching games');
      }
    })
  }

}
