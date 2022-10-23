import { Task } from './task.model';

export class Project {
  constructor(
    public id: number,
    public task_id: number,
    public task: Task,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
