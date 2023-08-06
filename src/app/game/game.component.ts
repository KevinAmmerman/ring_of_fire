import { Component, Input, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerPictureComponent } from '../player-picture/player-picture.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playerPictures: string[] = ['person.png', 'player_one_f.png', 'player_one_m.png', 'player_two_f.png', 'player_two_m.png', 'player_three_f.png', 'player_three_m.png'];
  game: Game;
  gameId: string;
  firestore: Firestore = inject(Firestore)

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newGame()
    this.route.params.subscribe((params) => {
      console.log(params['id'])
      this.gameId = params['id'];
      const itemDoc = doc(this.firestore, 'games', this.gameId);
      docData(itemDoc).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.players_picture = game.players_picture
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
  }


  newGame() {
    this.game = new Game;
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.updateGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.nextPlayer();
        this.game.pickCardAnimation = false, 100
        this.updateGame();
      }, 1000);
    }
  }


  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.updateGame();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.openDialogForPicture(name);
      }
    });
  }


  openDialogForPicture(name: string): void {
    const dialogRef = this.dialog.open(PlayerPictureComponent);
    dialogRef.afterClosed().subscribe(picture => {
      if (picture == undefined) {
        this.setPlayer(name, 'person.png');
      } else {
        this.setPlayer(name, picture);
      }
    });
  }


  setPlayer(name: string, picture: string) {
    this.game.players.push(name);
    this.game.players_picture.push(picture);
    this.updateGame();
  }


  openDialogEditPlayer(i: number): void {
    const dialogRef = this.initiateEditPlayerDialog(i)
    dialogRef.afterClosed().subscribe((edit) => {
      this.updatePlayerFromEditDialog(edit, i);
    });
    this.updateGame();
  }


  initiateEditPlayerDialog(i: number) {
    return this.dialog.open(EditPlayerComponent, {
      data: {
        playerIndex: i,
        game: this.game,
        update: () => this.updateGame()
      }
    });
  }


  updatePlayerFromEditDialog(edit: any, i: number) {
    if (!edit) return;
      else if (edit.name == '' && edit.picture.length > 0) {
        this.game.players_picture[i] = edit.picture;
      } else if (edit.picture == undefined && edit.length > 0) {
        this.game.players[i] = edit;
      } else if (edit.name.length > 0 && edit.picture.length > 0) {
        this.game.players[i] = edit.name;
        this.game.players_picture[i] = edit.picture;
      }
  }


  updateGame() {
    const itemDoc = doc(this.firestore, 'games', this.gameId);
    updateDoc(itemDoc, this.game.toJson());
  }

}