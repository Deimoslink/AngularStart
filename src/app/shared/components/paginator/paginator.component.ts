import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage = 1;
  @Input() totalPages;
  @Output() refreshCurrentPage: EventEmitter<any> = new EventEmitter();
  first: boolean;
  last: boolean;
  sliceBtnsFrom = 1;
  sliceBtnsTo = 6;
  pagesArray = [];

  constructor() { }

  checkIfEdge() {
    this.first = false;
    this.last = false;
    if (this.currentPage === 1) {
      this.first = true;
    }
    if (this.currentPage === this.totalPages) {
      this.last = true;
    }
  }

  refreshView() {
    if (this.totalPages > 5) {
      if (this.currentPage <= 3) {
        this.sliceBtnsFrom = 0;
        this.sliceBtnsTo = 5;
      }
      if (this.currentPage > 3) {
        this.sliceBtnsFrom = this.currentPage - 3;
        this.sliceBtnsTo = this.currentPage + 2;
      }
      if (this.currentPage >= this.totalPages - 1) {
        this.sliceBtnsFrom = this.totalPages - 5;
        this.sliceBtnsTo = this.totalPages;
      }
    } else {
      this.sliceBtnsFrom = 0;
      this.sliceBtnsTo = this.totalPages;
    }
    this.checkIfEdge();
  }


  changePage(num) {
    if (num === this.currentPage) {
      return;
    }
    if (num < 1) {
      this.currentPage = 1;
      return;
    }
    if (num > this.totalPages) {
      this.currentPage = this.totalPages;
      return;
    }
    this.currentPage = num;
    this.refreshView();
    this.refreshCurrentPage.emit(this.currentPage);
  }


  ngOnInit() {
    this.checkIfEdge();
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.currentPage && change.totalPages && change.currentPage.currentValue > change.totalPages.currentValue) {
      this.currentPage = change.totalPages.currentValue;
    }
    if (change.currentPage && change.currentPage.currentValue < 1) {
      this.currentPage = 1;
    }
    this.pagesArray = Array(this.totalPages + 1).fill('').map((x, i) => i).slice(1);
    this.refreshView();
  }

}
