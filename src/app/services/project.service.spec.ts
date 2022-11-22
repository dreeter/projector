import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PROJECTS } from 'testdata/projects.db.data';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });
    service = TestBed.get(ProjectService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects', () => {
    service.getProjects().subscribe((projects) => {
      expect(projects).withContext('No projects returned').toBeTruthy();
      expect(projects.length).toBe(3);
      const projectOne = projects.find((project) => {
        return (project.id = 1);
      });
      expect(projectOne!.task.title === 'Project 1');
      const projectTwo = projects.find((project) => {
        return (project.id = 2);
      });
      expect(projectOne!.task.title === 'Project 2');
    });

    const request = httpTestingController.expectOne(
      'http://localhost:3000/project'
    );
    expect(request.request.method).toEqual('GET');
    request.flush(PROJECTS);
  });
});
