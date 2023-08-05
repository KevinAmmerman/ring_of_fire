import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  name: string = '';
  playerPictures: string[] = ['person.png', 'player_one_f.png', 'player_one_m.png', 'player_two_f.png', 'player_two_m.png', 'player_three_f.png', 'player_three_m.png'];

  constructor() {}

  deletePlayer(): void {
    // let index = this.game.editPlayer;
    // this.game.players.splice(index, 1)
    // this.game.players_picture.splice(index, 1)
  }
}
