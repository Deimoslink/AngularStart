import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {
  words = [];
  pagination = {
    size: 10,
    currentPage: 1,
    totalPages: 0
  };


  constructor(private api: ApiService) { }

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

    })
  }

  refreshRequest(page) {
    this.pagination.currentPage = page;
    this.getWords(page);
  }

  ngOnInit() {
    this.getWords(this.pagination.currentPage);
  }

}
