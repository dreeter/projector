import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
})
export class TaskTableComponent implements OnInit {
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
    console.log('Calling ngOnInit');

    if (this.parent_id) {
      console.log('Calling to get child tasks');
      this.taskService.getChildTasks(this.parent_id).subscribe((tasks) => {
        this.tasks = tasks;
      });
    }
  }

  onClick(row: HTMLTableRowElement) {
    //navigate to task component route project/:id/task/:id (row.id)

    this.router.navigate(['../../task', row.id], { relativeTo: this.route });
  }
}
