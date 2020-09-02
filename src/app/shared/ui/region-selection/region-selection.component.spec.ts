import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSelectionComponent } from './region-selection.component';

describe('RegionSelectionComponent', () => {
  let component: RegionSelectionComponent;
  let fixture: ComponentFixture<RegionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
