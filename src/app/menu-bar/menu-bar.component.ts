import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { RestartGameComponent } from '../restart-game/restart-game.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  menuOpen: boolean = false;
  @Input() gameId: string;

  constructor(private clipboard: Clipboard, public dialog: MatDialog, private elementRef: ElementRef) {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
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
    const dialogRef = this.dialog.open(RestartGameComponent, {
      data: {
        id: this.gameId
      }
    });
    this.menuOpen = false;
  }
}
