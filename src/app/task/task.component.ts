import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Subject, Subscription } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  task: Task = {} as Task;

  taskDeletedSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      //make a call to get this task
      this.taskService.getTask(params['id']).subscribe((task) => {
        this.task = task;

        this.navigationService.addRouteToTree({
          url: this.router.url,
          name: this.task.title,
        });
      });
    });

    this.taskDeletedSub = this.taskService.taskDeleted.subscribe(() => {
      this.navigationService.navUpTree();
    });
  }

  ngOnDestroy() {
    this.taskDeletedSub.unsubscribe();
  }
}
