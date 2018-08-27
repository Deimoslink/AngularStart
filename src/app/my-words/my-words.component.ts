import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {switchMap, takeUntil} from 'rxjs/internal/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditWordCategoriesModalComponent} from '../shared/modals/edit-word-categories-modal/edit-word-categories.modal.component';
import {PARTS_OF_SPEECH} from '../shared/constants';
import {SetSearchCategoriesModalComponent} from '../shared/modals/set-search-categories-modal/set-search-categories.modal.component';
import {SpeechSynthService} from '../shared/services/speech-synth.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit, OnDestroy {
  private requestSubject = new Subject<any>();
  private ngUnsubscribe = new Subject<void>();
  words;
  loadingInProgress;
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
  modals = {
    addCategories: EditWordCategoriesModalComponent,
    setSearchCategories: SetSearchCategoriesModalComponent
  };
  partsOfSpeech = PARTS_OF_SPEECH;
  searchState = {
    categories: {},
    speechparts: {}
  };
  queryValue = '';

  @HostListener('click', ['$event.target'])
  private onEditBlur(targetElement: HTMLElement) {
    if (targetElement.tagName !== 'INPUT' &&
        targetElement.tagName !== 'I' &&
        targetElement.tagName !== 'SELECT' &&
        targetElement.tagName !== 'OPTION') {
      this.leaveEditMode();
    }
  }

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private synth: SpeechSynthService,
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

  open(modalName, word, index) {
    const modalRef = this.modalService.open(this.modals[modalName], { size: 'lg' });
    modalRef.componentInstance.data = {categories: this.categories, word: word};
    modalRef.componentInstance.updateCategories.subscribe(($e) => {
      this.words[index].categories = $e;
    });
  }

  showPerPage(num) {
    this.pagination.size = num;
    this.refreshRequest(1);
  }

  getWords(page = 1, size = this.pagination.size) {
    const selectedCategoriesIds = Object.keys(this.searchState.categories).filter(key => this.searchState.categories[key]);
    return this.api.getWords(page, size, selectedCategoriesIds, this.queryValue);
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    });
  }

  deleteWordByKey(key) {
    this.api.deleteWordByKey(key).subscribe(() => {
      this.refreshRequest(this.pagination.currentPage);
    });
  }

  refreshRequest(page) {
    this.pagination.currentPage = page;
    this.requestSubject.next(page);
  }

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

  pronounce(word) {
    this.synth.say(word);
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
    this.api.deleteCategoryFromWord(wordId, categoryId).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.words[index].categories[categoryId] = false;
    });
  }

  removeCategoryFromSearch(categoryId) {
    this.searchState.categories[categoryId] = null;
  }

  applySearch() {
    this.refreshRequest(1);
  }

  applyCategories() {
    const modalRef = this.modalService.open(this.modals['setSearchCategories'], { size: 'lg' });
    modalRef.componentInstance.data = {categories: this.categories, activeCategoriesMap: this.searchState.categories};
    modalRef.componentInstance.updateCategories.subscribe(($e) => {
      this.searchState.categories = $e;
    });
  }

  ngOnInit() {
    this.synth.getVoices();
    this.loadingInProgress = true;
    this.requestSubject.pipe(
      switchMap(page => this.getWords(page, this.pagination.size)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      res.data.map(el => {
        el.categories = el.categories ? el.categories : {};
      });
      this.words = res.data;
      this.pagination.totalPages = res.params.totalPages;
      this.loadingInProgress = false;
    }, () => {
      this.loadingInProgress = false;
    });
    this.requestSubject.next(this.pagination.currentPage);
    this.getCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
