import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionWindowComponent } from './attribution-window.component';

describe('AttributionWindowComponent', () => {
  let component: AttributionWindowComponent;
  let fixture: ComponentFixture<AttributionWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributionWindowComponent]
    });
    fixture = TestBed.createComponent(AttributionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
