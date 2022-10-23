import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../models/task.model';
import { PRIORITY, STATUS, TaskInfo } from '../models/taskinfo.model';
import { NavigationService } from '../services/navigation.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
})
export class AddEditTaskComponent {
  isAddMode: boolean = true;
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
      this.isAddMode = false;

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
  }
  onSubmit() {
    if (this.isAddMode) {
      const taskInfo: TaskInfo = new TaskInfo(
        null,
        this.taskForm.controls['title'].value,
        this.taskForm.controls['description'].value,
        this.taskForm.controls['priority'].value,
        null,
        null,
        this.taskForm.controls['due'].value,
        this.taskForm.controls['status'].value
      );
      this.taskService.addTask(taskInfo);
    } else {
      (this.task.title = this.taskForm.controls['title'].value),
        (this.task.description = this.taskForm.controls['description'].value),
        (this.task.priority = this.taskForm.controls['priority'].value),
        (this.task.due = this.taskForm.controls['due'].value),
        (this.task.status = this.taskForm.controls['status'].value),
        this.taskService.updateTask(this.task);
    }
  }
  onCancel() {
    this.navigationService.back();
  }
}
