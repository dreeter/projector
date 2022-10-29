import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PRIORITY, STATUS, TaskInfo } from '../models/taskinfo.model';
import { NavigationService } from '../services/navigation.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  taskUpdateErrorSub: Subscription = {} as Subscription;
  taskUpdatedSub: Subscription = {} as Subscription;

  task: Task = {} as Task;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    owner: new FormControl(''),
    status: new FormControl(''),
    due: new FormControl(''),
    priority: new FormControl(''),
  });

  priorities = PRIORITY;
  statuses = STATUS;
  priorityKeys: any;
  statusKeys: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    this.priorityKeys = Object.keys(this.priorities).filter((key) =>
      isNaN(Number(key))
    );
    this.statusKeys = Object.keys(this.statuses).filter((key) =>
      isNaN(Number(key))
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      console.log(params['id']);

      this.taskService.getTask(params['id']).subscribe((task) => {
        this.task = task;

        this.taskForm.controls['title'].setValue(this.task.title);
        this.taskForm.controls['description'].setValue(this.task.description);
        this.taskForm.controls['owner'].setValue(this.task.owner_id);
        this.taskForm.controls['status'].setValue(this.task.status);
        this.taskForm.controls['due'].setValue(this.task.due);
        this.taskForm.controls['priority'].setValue(this.task.priority);
      });
    });

    this.taskUpdatedSub = this.taskService.taskUpdated.subscribe(() => {
      this.navigationService.back();
    });

    this.taskUpdateErrorSub = this.taskService.taskUpdateError.subscribe(
      (error: Error) => {
        //TODO: give user an error message
      }
    );
  }

  onSubmit() {
    this.task.title = this.taskForm.get('title')!.value;
    this.task.description = this.taskForm.get('description')!.value;
    this.task.priority = this.taskForm.get('priority')!.value;
    this.task.due = this.taskForm.get('due')!.value;
    this.task.status = this.taskForm.get('status')!.value;

    console.log('Updating task with this as task: ');
    console.log(this.task);

    this.taskService.updateTask(this.task);
  }

  onCancel() {
    this.navigationService.back();
  }

  ngOnDestroy(): void {
    this.taskUpdateErrorSub.unsubscribe();
    this.taskUpdatedSub.unsubscribe();
  }
}
