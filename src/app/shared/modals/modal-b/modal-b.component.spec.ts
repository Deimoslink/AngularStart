import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBComponent } from './modal-b.component';
import {TestingDepsModule} from '../../testing-deps/testing-deps.module';
import {ModalsModule} from '../modals.module';

describe('ModalBComponent', () => {
  let component: ModalBComponent;
  let fixture: ComponentFixture<ModalBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalsModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
