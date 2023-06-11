import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalesGeneralesComponent } from './fiscales-generales.component';

describe('FiscalesGeneralesComponent', () => {
  let component: FiscalesGeneralesComponent;
  let fixture: ComponentFixture<FiscalesGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalesGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalesGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
