import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() data: {
    name: string;
    index: number;
    playersCount: number;
  }
  @Input() playerActive: boolean = false;
}
