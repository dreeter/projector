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
import { Project } from '../../models/project.model';

//Component responsible for listing the information about a project
@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css'],
})
export class ProjectHeaderComponent implements OnInit, OnDestroy {
  @Input() project: Project = {} as Project;

  deleteErrorSub: Subscription = {} as Subscription;
  addTaskMode: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.deleteErrorSub = this.projectService.projectDeleteError.subscribe(
      (error: Error) => {
        //TODO: show user an error response, could not delete
      }
    );
  }

  onDelete() {
    if (this.project.id) {
      this.projectService.deleteProject(this.project.id);
    }
  }

  toggleAddMode() {
    this.addTaskMode = !this.addTaskMode;
  }

  ngOnDestroy() {
    this.deleteErrorSub.unsubscribe();
  }
}
