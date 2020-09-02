import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDotsComponent } from './loader-dots.component';

describe('LoaderDotsComponent', () => {
  let component: LoaderDotsComponent;
  let fixture: ComponentFixture<LoaderDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
