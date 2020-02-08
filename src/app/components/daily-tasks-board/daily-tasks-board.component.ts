import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FilterStateService} from '../../services/filter-state.service';

@Component({
  selector: 'app-daily-tasks-board',
  templateUrl: './daily-tasks-board.component.html',
  styleUrls: ['./daily-tasks-board.component.css'],
})
export class DailyTasksBoardComponent implements OnInit {
  constructor(public filterState: FilterStateService) {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<{ title: string, poster: string }[]>) {
    moveItemInArray(this.filterState.allShownTeamMembersList, event.previousIndex, event.currentIndex);
  }
}
