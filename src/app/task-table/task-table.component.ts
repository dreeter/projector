import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
})
export class TaskTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'owner', 'priority'];
  tasks: Task[] = [];
  @Input() projectID: number = 1;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const childTasks: Task[] | undefined = this.taskService.getChildTasks(
      this.projectID
    );

    if (childTasks) this.tasks = childTasks;
  }
}
