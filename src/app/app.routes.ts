import { Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

export const routes: Routes = [
    { path: '', component: GameListComponent },
    { path: 'game/:id', component: GameDetailComponent },
    { path: '**', redirectTo: '' }
];
