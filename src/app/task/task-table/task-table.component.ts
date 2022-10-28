import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
})
export class TaskTableComponent implements OnInit, OnDestroy {
  newTaskAddedSub: Subscription = {} as Subscription;

  displayedColumns: string[] = [
    'title',
    'status',
    'owner',
    'priority',
    'due',
    'updatedAt',
  ];
  tasks: Task[] = [];
  @Input() parent_id: number | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.newTaskAddedSub = this.taskService.taskAdded.subscribe(() => {
      this.getTasks();
    });
  }

  ngOnChanges(): void {
    this.getTasks();
  }

  private getTasks() {
    if (this.parent_id) {
      this.taskService.getChildTasks(this.parent_id).subscribe({
        next: (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error: (error: Error) => {
          //TODO: give user an error message, child tasks could not be retrieved
        },
      });
    }
  }

  onClick(row: HTMLTableRowElement) {
    this.router.navigate(['../../task', row.id], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.newTaskAddedSub.unsubscribe();
  }
}
