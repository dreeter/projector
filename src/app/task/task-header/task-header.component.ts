import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css'],
})
export class TaskHeaderComponent implements OnInit {
  @Input() task: Task = {} as Task;
  @Output() projectDeleted: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();

  addTaskMode: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('Header Initializing');
    console.dir(this.task);
  }

  onDelete() {
    // if (this.task.id) {
    //   this.projectService
    //     .deleteProject(this.task.id)
    //     .subscribe((response) => {
    //       this.projectDeleted.emit(this.task.id);
    //     });
    // }
  }

  toggleAddMode() {
    this.addTaskMode = !this.addTaskMode;
  }
}
