import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  firestore: Firestore = inject(Firestore)

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
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
  }

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

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
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }

  updateGame() {
    const itemDoc = doc(this.firestore, 'games', this.gameId);
    updateDoc(itemDoc, this.game.toJson());
  }

}
