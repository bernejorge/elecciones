import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasElectoralesComponent } from './listas-electorales.component';

describe('ListasElectoralesComponent', () => {
  let component: ListasElectoralesComponent;
  let fixture: ComponentFixture<ListasElectoralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasElectoralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasElectoralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
