import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalesMesasComponent } from './fiscales-mesas.component';

describe('FiscalesMesasComponent', () => {
  let component: FiscalesMesasComponent;
  let fixture: ComponentFixture<FiscalesMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalesMesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalesMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
