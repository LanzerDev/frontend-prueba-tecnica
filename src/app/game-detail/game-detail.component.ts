// game-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../service/games.service';
import { Game } from '../interfaces/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGame(id);
    }
  }

  loadGame(id: string): void {
    this.gameService.getGameById(id).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (error) => {
        console.error('Error fetching game details', error);
      }
    });
  }
}