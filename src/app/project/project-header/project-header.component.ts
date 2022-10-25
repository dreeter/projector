import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css'],
})
export class ProjectHeaderComponent implements OnInit {
  @Input() project: Project = {} as Project;
  @Output() projectDeleted: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();

  addTaskMode: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('Header Initializing');
    console.dir(this.project);
  }

  onDelete() {
    if (this.project.id) {
      this.projectService
        .deleteProject(this.project.id)
        .subscribe((response) => {
          this.projectDeleted.emit(this.project.id);
        });
    }
  }

  toggleAddMode() {
    this.addTaskMode = !this.addTaskMode;
  }
}
