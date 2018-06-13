import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditWordCategoriesModalComponent} from './modal-a.component';
import {ModalsModule} from '../modals.module';
import {TestingDepsModule} from '../../testing-deps/testing-deps.module';

describe('EditWordCategoriesModalComponent', () => {
  let component: EditWordCategoriesModalComponent;
  let fixture: ComponentFixture<EditWordCategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalsModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
