import {TaskType} from '../enums/task-type.enum';

/**
 * This interface represents a task.
 */
export interface Task {
  id: number;
  name: string;
  color: string;
  type: TaskType;
  startDate?: Date;
  endDate?: Date;
}
