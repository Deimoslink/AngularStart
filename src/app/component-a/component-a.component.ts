import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  constructor(private api: ApiService) { }

  writeWord(word) {
    this.api.saveNewWord(word).subscribe(res => {
      console.log(res);
    });
  }

  getWords() {
    this.api.getWords().subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
