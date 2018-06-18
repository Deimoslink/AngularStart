import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-custom-colorpicker',
  templateUrl: './custom-colorpicker.component.html',
  styleUrls: ['./custom-colorpicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomColorpickerComponent implements OnInit {
  @Input() colors;
  @Input() selectedColor = '';
  @Input() hasError: boolean;
  @Output() transferColor: EventEmitter<any> = new EventEmitter();
  optionsVisible = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      return;
    } else {
      this.hideOptions();
    }
  }

  blurInput(event) {
    event.target.blur();
    this.showOptions();
  }

  showOptions() {
    this.optionsVisible = true;
  }

  hideOptions() {
    this.optionsVisible = false;
  }

  setColor(color) {
    this.selectedColor = color;
    this.hideOptions();
    this.transferColor.emit(this.selectedColor);
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }
}
