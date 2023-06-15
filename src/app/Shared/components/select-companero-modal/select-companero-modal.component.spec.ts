import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompaneroModalComponent } from './select-companero-modal.component';

describe('SelectCompaneroModalComponent', () => {
  let component: SelectCompaneroModalComponent;
  let fixture: ComponentFixture<SelectCompaneroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCompaneroModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCompaneroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
