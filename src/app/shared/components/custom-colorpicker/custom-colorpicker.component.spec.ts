import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColorpickerComponent } from './custom-colorpicker.component';

describe('CustomColorpickerComponent', () => {
  let component: CustomColorpickerComponent;
  let fixture: ComponentFixture<CustomColorpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomColorpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
