import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  task: Task = {} as Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      //make a call to get this task
      this.taskService.getTask(params['id']).subscribe((task) => {
        console.log('Logging the task');
        console.log(task);
        this.task = task;
      });
    });
  }
}
