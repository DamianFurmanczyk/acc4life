import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerksListComponent } from './perks-list.component';

describe('PerksListComponent', () => {
  let component: PerksListComponent;
  let fixture: ComponentFixture<PerksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
