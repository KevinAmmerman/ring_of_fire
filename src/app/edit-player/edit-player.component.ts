import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  @Input() playerIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EditPlayerComponent>) {}

  ngOnInit() {
    this.playerIndex = this.data.playerIndex; 
    this.game = this.data.game;
  }

  deletePlayer(): void {
    this.game.players.splice(this.playerIndex, 1);
    this.game.players_picture.splice(this.playerIndex, 1);
    this.game.currentPlayer--;
    this.data.update();
    this.dialogRef.close();
  }
}
