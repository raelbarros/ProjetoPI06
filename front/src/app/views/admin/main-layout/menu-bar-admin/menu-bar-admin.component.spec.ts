import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarAdminComponent } from './menu-bar-admin.component';

describe('MenuBarAdminComponent', () => {
  let component: MenuBarAdminComponent;
  let fixture: ComponentFixture<MenuBarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
