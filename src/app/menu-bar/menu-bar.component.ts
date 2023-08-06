import { Component } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { RestartGameComponent } from '../restart-game/restart-game.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  menuOpen: boolean = false;

  constructor(private clipboard: Clipboard, public dialog: MatDialog) {
    this.menuOpen = false; 
  }

  ngOnInit() {
  }

  openMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  copyLink() {
    this.clipboard.copy(window.location.href);
  }

  restartGame(): void {
    const dialogRef = this.dialog.open(RestartGameComponent);
    dialogRef.afterClosed().subscribe
    this.menuOpen = false;
  }
}
