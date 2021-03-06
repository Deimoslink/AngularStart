import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ModalAComponent} from './modal-a.component';
import {ModalsModule} from '../modals.module';
import {TestingDepsModule} from '../../testing-deps.module';

describe('ModalAComponent', () => {
  let component: ModalAComponent;
  let fixture: ComponentFixture<ModalAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalsModule, TestingDepsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
