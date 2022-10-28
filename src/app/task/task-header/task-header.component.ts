import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css'],
})
export class TaskHeaderComponent implements OnInit, OnDestroy {
  @Input() task: Task = {} as Task;

  deleteTaskErrorSub: Subscription = {} as Subscription;
  taskAddedSub: Subscription = {} as Subscription;

  addTaskMode: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.deleteTaskErrorSub = this.taskService.taskDeleteError.subscribe(
      (error: Error) => {
        //TODO: show user an error response, could not delete
      }
    );

    this.taskAddedSub = this.taskService.taskAdded.subscribe(() => {
      this.toggleAddMode();
    });
  }

  onDelete() {
    if (this.task.id) {
      this.taskService.deleteTask(this.task.id);
    }
  }

  toggleAddMode() {
    this.addTaskMode = !this.addTaskMode;
  }

  ngOnDestroy() {
    this.deleteTaskErrorSub.unsubscribe();
    this.taskAddedSub.unsubscribe();
  }
}
