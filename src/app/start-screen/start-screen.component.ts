import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { AttributionWindowComponent } from '../attribution-window/attribution-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore)
  constructor(public dialog: MatDialog, private router: Router) { }

  newGame() {
    let game = new Game();
    const itemCollection = collection(this.firestore, 'games');
    const id = "" + Date.now();
    setDoc(doc(itemCollection, id), game.toJson());
    this.router.navigateByUrl('/game/' + id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AttributionWindowComponent);
    dialogRef.afterClosed().subscribe
  }
}
