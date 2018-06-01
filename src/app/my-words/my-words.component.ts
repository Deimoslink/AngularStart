import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {
  editWordForm: FormGroup;
  words = [];
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

  constructor(private api: ApiService, private fb: FormBuilder) {
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

  showPerPage(num) {
    this.pagination.size = num;
    this.refreshRequest(1);
  }

  getWords(page = 1, size = this.pagination.size) {
    this.api.getWords(page, size).subscribe(res => {
      this.words = res.data;
      this.pagination.totalPages = res.params.totalPages;
    });
  }

  deleteWordByKey(key) {
    this.api.deleteWordByKey(key).subscribe(res => {
      this.getWords(this.pagination.currentPage);
    })
  }

  refreshRequest(page) {
    this.pagination.currentPage = page;
    this.getWords(page);
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

  leaveEditMode() {
    this.editWord = {
      id: '',
      eng: '',
      rus: '',
      ned: '',
      part: ''
    };
  }

  ngOnInit() {
    this.getWords(this.pagination.currentPage);
  }

}
