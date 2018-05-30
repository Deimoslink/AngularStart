import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {
  words = [];

  constructor(private api: ApiService) { }

  getWords() {
    this.api.getWords().subscribe(res => {
      this.words = res.map(word => {
        return Object.assign({id: word.key}, word.payload.val());
      })
    });
  }

  deleteWordByKey(key) {
    this.api.deleteWordByKey(key).subscribe(res => {})
  }

  refreshNumber(page) {
    console.log(page)
  }

  ngOnInit() {
    this.getWords();
  }

}
