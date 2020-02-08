import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../classes/task';
import {CacheService} from '../../services/cache.service';
import {TaskType} from '../../enums/task-type.enum';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
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
        const todayDate: Date = new Date();

        if (receivedTask.type === TaskType.CONTINUOUS) {
          if (this.task.startDate.toDateString() === todayDate.toDateString()) {
            this.taskStatus = 'STARTED TODAY';
          } else if (this.task.endDate.toDateString() === todayDate.toDateString()) {
            this.taskStatus = 'LAST DAY';
          } else {
            this.taskStatus = 'ONGOING';
          }
        }
      });
    }
  }
}
