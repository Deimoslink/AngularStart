import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTS_OF_SPEECH} from '../shared/constants';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  addWordForm: FormGroup;
  partsOfSpeech = PARTS_OF_SPEECH;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.addWordForm = fb.group({
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

  saveNewWord() {
    this.api.saveNewWord(this.addWordForm.value)
      .subscribe(() => {
        this.addWordForm.reset();
      });
  }

  ngOnInit() {
  }

}
