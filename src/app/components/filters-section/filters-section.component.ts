import {Component, OnInit} from '@angular/core';
import {FilterStateService} from '../../services/filter-state.service';

@Component({
  selector: 'app-filters-section',
  templateUrl: './filters-section.component.html',
  styleUrls: ['./filters-section.component.css'],
})
export class FiltersSectionComponent implements OnInit {
  constructor(public filterState: FilterStateService) {
  }

  ngOnInit() {

  }
}
