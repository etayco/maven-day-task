import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-daily-view-container',
  templateUrl: './daily-view-container.component.html',
  styleUrls: ['./daily-view-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyViewContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
