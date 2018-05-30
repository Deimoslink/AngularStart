import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddWordComponent } from './add-word.component';
import {AddWordModule} from './add-word.module';
import {TestingDepsModule} from '../shared/testing-deps/testing-deps.module';

describe('AddWordComponent', () => {
  let component: AddWordComponent;
  let fixture: ComponentFixture<AddWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddWordModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
