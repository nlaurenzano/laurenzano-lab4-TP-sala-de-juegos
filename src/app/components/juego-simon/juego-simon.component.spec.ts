import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoSimonComponent } from './juego-simon.component';

describe('JuegoSimonComponent', () => {
  let component: JuegoSimonComponent;
  let fixture: ComponentFixture<JuegoSimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoSimonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoSimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
