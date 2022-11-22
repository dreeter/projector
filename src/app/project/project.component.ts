import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../models/project.model';
import { NavigationService } from '../services/navigation.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  @Input() project: Project = {} as Project;

  projectDeletedSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private navigationService: NavigationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      //make a call to get this project
      this.projectService.getProject(params['id']).subscribe((project) => {
        this.project = project;
        // this.changeDetector.detach();
        // this.changeDetector.detectChanges();
        // this.changeDetector.reattach();
        console.dir(this.project);

        //reset the navigation tree
        this.navigationService.resetNavTree();

        //inform navigation about this
        this.navigationService.addRouteToTree({
          url: this.router.url,
          name: this.project.task.title,
        });
      });
    });

    this.projectDeletedSub = this.projectService.projectDeleted.subscribe(
      () => {
        this.router.navigateByUrl('/home/projects');
      }
    );
  }

  ngOnDestroy(): void {
    this.projectDeletedSub.unsubscribe();
  }
}
