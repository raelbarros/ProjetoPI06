import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCollegeComponent } from './card-college.component';

describe('CardCollegeComponent', () => {
  let component: CardCollegeComponent;
  let fixture: ComponentFixture<CardCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
