import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ComponentAComponent } from './component-a.component';
import {ComponentAModule} from './component-a.module';
import {TestingDepsModule} from '../shared/testing-deps.module';

describe('ComponentAComponent', () => {
  let component: ComponentAComponent;
  let fixture: ComponentFixture<ComponentAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentAModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
