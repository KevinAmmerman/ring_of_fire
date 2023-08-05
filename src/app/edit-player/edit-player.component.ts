import { Component } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  game: Game;
  name: string = '';
  playerPictures: string[] = ['person.png', 'player_one_f.png', 'player_one_m.png', 'player_two_f.png', 'player_two_m.png', 'player_three_f.png', 'player_three_m.png'];

  deletePlayer(): void {

  }
}
