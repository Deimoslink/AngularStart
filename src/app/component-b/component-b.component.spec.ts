import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ComponentBComponent} from './component-b.component';
import {ComponentBModule} from './component-b.module';
import {TestingDepsModule} from '../shared/testing-deps.module';

describe('ComponentBComponent', () => {
  let component: ComponentBComponent;
  let fixture: ComponentFixture<ComponentBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentBModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
