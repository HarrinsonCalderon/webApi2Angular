import { TestBed } from '@angular/core/testing';

import { ServicioMenuService } from './servicio-menu.service';

describe('ServicioMenuService', () => {
  let service: ServicioMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
