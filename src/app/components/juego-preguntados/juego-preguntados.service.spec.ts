import { TestBed } from '@angular/core/testing';

import { JuegoPreguntadosService } from './juego-preguntados.service';

describe('JuegoPreguntadosService', () => {
  let service: JuegoPreguntadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoPreguntadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
