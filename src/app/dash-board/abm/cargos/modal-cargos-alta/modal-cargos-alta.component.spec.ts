import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargosAltaComponent } from './modal-cargos-alta.component';

describe('ModalCargosAltaComponent', () => {
  let component: ModalCargosAltaComponent;
  let fixture: ComponentFixture<ModalCargosAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCargosAltaComponent]
    });
    fixture = TestBed.createComponent(ModalCargosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
