import { Component, Inject, Input, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-restart-game',
  templateUrl: './restart-game.component.html',
  styleUrls: ['./restart-game.component.scss']
})
export class RestartGameComponent {

  constructor(private firestore: Firestore = inject(Firestore), @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<RestartGameComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }

  restartGame() {
    let game = new Game;
    const itemDoc = doc(this.firestore, 'games', this.data.id);
    updateDoc(itemDoc, game.toJson());
    this.dialogRef.close();
  }

}
