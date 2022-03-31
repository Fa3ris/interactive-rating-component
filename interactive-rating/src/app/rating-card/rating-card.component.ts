import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.scss']
})
export class RatingCardComponent {


  value: number | undefined = undefined;

  readonly ratings = Array.from({length: 5}, (_, i) => i + 1);

  step: 1|2 = 1;

  constructor() { }

  ratingSelected(val: number): void {
    this.value = val;
  }

  submitClicked(): void {
    if (this.value) {
      this.step = 2;
    }
  }

}
