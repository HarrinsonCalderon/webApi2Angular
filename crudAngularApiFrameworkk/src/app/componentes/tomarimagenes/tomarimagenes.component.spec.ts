import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarimagenesComponent } from './tomarimagenes.component';

describe('TomarimagenesComponent', () => {
  let component: TomarimagenesComponent;
  let fixture: ComponentFixture<TomarimagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomarimagenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarimagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
