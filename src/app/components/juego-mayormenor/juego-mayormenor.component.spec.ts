import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMayormenorComponent } from './juego-mayormenor.component';

describe('JuegoMayormenorComponent', () => {
  let component: JuegoMayormenorComponent;
  let fixture: ComponentFixture<JuegoMayormenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoMayormenorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoMayormenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
