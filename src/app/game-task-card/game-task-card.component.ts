import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-task-card',
  templateUrl: './game-task-card.component.html',
  styleUrls: ['./game-task-card.component.scss']
})
export class GameTaskCardComponent {

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks'},
    { title: 'Me', description: 'Congrats! Drink a shot!'},
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!'},
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.'},
    { title: 'Thumbmaster', description: 'The thumbmaster starts. Other players can put their thumbs down at any time. The last player has to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'The quizmaster asks a trivia question. The player who answers wrong has to drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
    ];
  @Input() card: string;
  title = '';
  description = '';

  ngOnChanges() {
    if(this.card) {
      let cardNumber = this.card.split('_')[1];
      this.title = this.cardAction[cardNumber].title;
      this.description = this.cardAction[cardNumber].description;
    }
  }
}
