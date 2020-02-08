import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Task} from '../../classes/task';
import {CacheService} from '../../services/cache.service';
import {TaskType} from '../../enums/task-type.enum';

/**
 * Component to show daily task.
 */
@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyTaskComponent implements OnInit {
  @Input() taskId: number;
  task: Task;
  taskStatus: string;

  constructor(private cacheService: CacheService) {
  }

  ngOnInit() {
    if (this.taskId && this.taskId !== null) {
      this.cacheService.getTaskByTaskId(this.taskId).subscribe(receivedTask => {
        this.task = receivedTask;

        if (receivedTask.type === TaskType.CONTINUOUS) {
          this.setContinuousTaskStatus();
        }
      });
    }
  }

  private setContinuousTaskStatus() {
    const todayDate: Date = new Date();

    if (this.task.startDate.toDateString() === todayDate.toDateString()) {
      this.taskStatus = 'STARTED TODAY';
    } else if (this.task.endDate.toDateString() === todayDate.toDateString()) {
      this.taskStatus = 'LAST DAY';
    } else {
      this.taskStatus = 'ONGOING';
    }
  }
}
