import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  constructor(private api: ApiService) { }

  simulateError(errCode) {
    this.api.simulateError(errCode)
      .subscribe(res => console.log(res));
  }

  fetchData() {
    this.api.fetchData()
      .subscribe(res => console.log(res));
  }

  recordData() {
    this.api.recordData()
      .subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
