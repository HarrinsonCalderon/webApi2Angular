import { TestBed } from '@angular/core/testing';

import { ServicioImagenService } from './servicio-imagen.service';

describe('ServicioImagenService', () => {
  let service: ServicioImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
