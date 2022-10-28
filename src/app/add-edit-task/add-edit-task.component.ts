import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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
  taskAddErrorSub: Subscription = {} as Subscription;
  taskAddedSub: Subscription = {} as Subscription;
  taskUpdateErrorSub: Subscription = {} as Subscription;
  // taskUpdatedSub: Subscription = {} as Subscription;

  isAddMode: boolean = true;
  task: Task = {} as Task;

  @Input() parent_id: number | null = null;

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
    this.taskAddedSub = this.taskService.taskAdded.subscribe(
      (added: boolean) => {}
    );

    this.taskAddErrorSub = this.taskService.taskAddError.subscribe(
      (error: Error) => {
        //TODO: give user an error message
      }
    );

    // this.taskUpdatedSub = this.taskService.taskUpdated.subscribe(
    //   (updated: boolean) => {
    //     this.navigationService.back();
    //   }
    // );

    this.taskUpdateErrorSub = this.taskService.taskUpdateError.subscribe(
      (error: Error) => {
        //TODO: give user an error message
      }
    );
  }

  onSubmit() {
    if (this.isAddMode) {
      this.taskService.addTask(
        new TaskInfo(
          this.parent_id,
          this.taskForm.get('title')!.value,
          this.taskForm.get('description')!.value,
          this.taskForm.get('priority')!.value,
          null,
          null,
          this.taskForm.get('due')!.value,
          this.taskForm.get('status')!.value
        )
      );
    } else {
      this.task.title = this.taskForm.get('title')!.value;
      this.task.description = this.taskForm.get('description')!.value;
      this.task.priority = this.taskForm.get('priority')!.value;
      this.task.due = this.taskForm.get('due')!.value;
      this.task.status = this.taskForm.get('status')!.value;

      this.taskService.updateTask(this.task);
    }
  }

  ngOnDestroy() {
    this.taskAddedSub.unsubscribe();
    this.taskAddErrorSub.unsubscribe();
    // this.taskUpdatedSub.unsubscribe();
    this.taskUpdateErrorSub.unsubscribe();
  }
}
