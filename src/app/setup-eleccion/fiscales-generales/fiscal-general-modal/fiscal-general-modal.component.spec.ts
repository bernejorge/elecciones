import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalGeneralModalComponent } from './fiscal-general-modal.component';

describe('FiscalGeneralModalComponent', () => {
  let component: FiscalGeneralModalComponent;
  let fixture: ComponentFixture<FiscalGeneralModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalGeneralModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalGeneralModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
