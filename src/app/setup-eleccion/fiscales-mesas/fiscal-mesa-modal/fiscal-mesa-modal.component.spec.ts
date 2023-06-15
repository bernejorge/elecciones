import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalMesaModalComponent } from './fiscal-mesa-modal.component';

describe('FiscalMesaModalComponent', () => {
  let component: FiscalMesaModalComponent;
  let fixture: ComponentFixture<FiscalMesaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalMesaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalMesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
