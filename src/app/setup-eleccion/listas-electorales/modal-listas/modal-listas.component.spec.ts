import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListasComponent } from './modal-listas.component';

describe('ModalListasComponent', () => {
  let component: ModalListasComponent;
  let fixture: ComponentFixture<ModalListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
