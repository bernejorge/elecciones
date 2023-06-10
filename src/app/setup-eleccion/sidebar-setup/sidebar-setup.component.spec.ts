import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSetupComponent } from './sidebar-setup.component';

describe('SidebarSetupComponent', () => {
  let component: SidebarSetupComponent;
  let fixture: ComponentFixture<SidebarSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
