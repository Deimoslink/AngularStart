import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  constructor(private http: HttpClient) { }

  simulateError(errCode) {
    this.http.get('http://localhost:3000/get-error?error=' + errCode)
      .subscribe(res => console.log(res));
  }

  fetchData() {
    this.http.get('http://localhost:3000/posts')
      .subscribe(res => console.log(res));
  }

  recordData() {
    this.http.post('http://localhost:3000/posts', {fromClient: 'value from client'})
      .subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
