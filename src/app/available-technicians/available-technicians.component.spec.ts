import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTechniciansComponent } from './available-technicians.component';

describe('AvailableTechniciansComponent', () => {
  let component: AvailableTechniciansComponent;
  let fixture: ComponentFixture<AvailableTechniciansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableTechniciansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
