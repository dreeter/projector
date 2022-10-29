import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { PRIORITY, STATUS, TaskInfo } from '../models/taskinfo.model';
import { NavigationService } from '../services/navigation.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  taskAddErrorSub: Subscription = {} as Subscription;
  taskAddedSub: Subscription = {} as Subscription;

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

  constructor(private taskService: TaskService) {
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
  }

  onSubmit() {
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
  }

  ngOnDestroy() {
    this.taskAddedSub.unsubscribe();
    this.taskAddErrorSub.unsubscribe();
  }
}
