import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore)
  constructor(private router: Router) { }

  newGame() {
    debugger
    let game = new Game();
    const itemCollection = collection(this.firestore, 'games');
    const id = "" + Date.now();
    setDoc(doc(itemCollection, id), game.toJson());
    this.router.navigateByUrl('/game/' + id);
  }
}
