import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTaskCardComponent } from './game-task-card.component';

describe('GameTaskCardComponent', () => {
  let component: GameTaskCardComponent;
  let fixture: ComponentFixture<GameTaskCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTaskCardComponent]
    });
    fixture = TestBed.createComponent(GameTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
