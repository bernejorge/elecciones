import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEscrutinioComponent } from './sidebar-escrutinio.component';

describe('SidebarEscrutinioComponent', () => {
  let component: SidebarEscrutinioComponent;
  let fixture: ComponentFixture<SidebarEscrutinioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarEscrutinioComponent]
    });
    fixture = TestBed.createComponent(SidebarEscrutinioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
