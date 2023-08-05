import { Component } from '@angular/core';

@Component({
  selector: 'app-player-picture',
  templateUrl: './player-picture.component.html',
  styleUrls: ['./player-picture.component.scss']
})
export class PlayerPictureComponent {

  playerPictures: string[] = ['person.png', 'player_one_f.png', 'player_one_m.png', 'player_two_f.png', 'player_two_m.png', 'player_three_f.png', 'player_three_m.png'];

}
