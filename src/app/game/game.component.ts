import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';
  game$: Observable<any>;
  firestore: Firestore = inject(Firestore)

  ngOnInit(): void {
    this.newGame()
  }

  constructor(public dialog: MatDialog) {
    const itemCollection = collection(this.firestore, 'games');
    this.game$ = collectionData(itemCollection, {
      idField: 'id'
    });

    this.game$.subscribe((todo) => {
      // for(let todos of todo) {
      //   console.log(todos.id); 
      // }
      for(let todos of todo) {
        console.log(todos);
      }
    });
  }

  newGame() {
    this.game = new Game;
    const itemCollection = collection(this.firestore, 'games');
    setDoc(doc(itemCollection, "" + Date.now()), this.game.toJson());
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.nextPlayer();
        setTimeout(() => this.pickCardAnimation = false, 100);
      }, 1000);
    }
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
