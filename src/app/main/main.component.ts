import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api/api.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  categories;

  constructor(private api: ApiService) { }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    })
  }

  ngOnInit() {

  }

}
