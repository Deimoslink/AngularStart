import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {switchMap, takeUntil} from 'rxjs/internal/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditWordCategoriesModalComponent} from '../shared/modals/edit-word-categories-modal/edit-word-categories.modal.component';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit, OnDestroy {
  @HostListener('click', ['$event.target'])
  private onEditBlur(targetElement: HTMLElement) {
    if (targetElement.tagName !== 'INPUT' && targetElement.tagName !== 'I' && targetElement.tagName !== 'SELECT'  && targetElement.tagName !== 'OPTION') {
      this.leaveEditMode();
    }
  }
  private requestSubject = new Subject<any>();
  private ngUnsubscribe = new Subject<void>();
  words;
  categories;
  editWordForm: FormGroup;
  pagination = {
    size: 10,
    currentPage: 1,
    totalPages: 0
  };
  editWord = {
    id: '',
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  partsOfSpeech = ['pronoun', 'noun', 'verb', 'adjective', 'adverb', 'subordinate', 'preposition'];

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
    this.editWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: false},
        Validators.required),
      'rus': new FormControl({value: null, disabled: false},
        Validators.required),
      'ned': new FormControl({value: null, disabled: false},
        Validators.required),
      'part': new FormControl({value: null, disabled: false},
        Validators.required)
    });
  }

  modals = {
    addCategories: EditWordCategoriesModalComponent
  };

  open(modalName, word, index) {
    const modalRef = this.modalService.open(this.modals[modalName], { size: 'lg' });
    modalRef.componentInstance.data = {categories: this.categories, word: word};
    modalRef.componentInstance.updateCategories.subscribe(($e) => {
      this.words[index].categories = $e;
    })
  }

  showPerPage(num) {
    this.pagination.size = num;
    this.refreshRequest(1);
  }

  getWords(page = 1, size = this.pagination.size) {
    return this.api.getWords(page, size);
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    })
  }

  deleteWordByKey(key) {
    this.api.deleteWordByKey(key).subscribe(res => {
      this.refreshRequest(this.pagination.currentPage);
    })
  }

  refreshRequest(page) {
    this.requestSubject.next(page);
  };

  enterEditMode(word) {
    this.editWord = Object.assign({}, word);
  }

  saveEditedWord(index) {
    this.api.updateWordByKey(this.editWord.id, this.editWordForm.value).subscribe(
      res => {
        this.words[index] = Object.assign(this.words[index], res);
        this.leaveEditMode();
      }
    );
  }

  leaveEditMode() {
    this.editWord = {
      id: '',
      eng: '',
      rus: '',
      ned: '',
      part: ''
    };
  }

  removeCategoryFromWord(wordId, categoryId, index) {
    this.api.deleteCategoryFromWord(wordId, categoryId).subscribe(res => {
      this.words[index].categories[categoryId] = false;
    });
  }

  ngOnInit() {
    this.requestSubject.pipe(
      switchMap(page => this.getWords(page, this.pagination.size)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      res.data.map(el => {
        el.categories = el.categories === `'null'` ? {} : el.categories;
      });
      this.words = res.data;
      this.pagination.totalPages = res.params.totalPages;
    });
    this.requestSubject.next(this.pagination.currentPage);
    this.getCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
