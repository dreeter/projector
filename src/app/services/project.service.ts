import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { TaskInfo } from '../models/taskinfo.model';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    console.log('Project Service being destroyed');
  }

  addProject(taskInfo: TaskInfo) {
    this.http
      .post('http://localhost:3000/project', taskInfo)
      .subscribe((body) => {});
  }

  getProject(id: number): Observable<Project> {
    return this.http
      .get(`http://localhost:3000/project/${id}`, { withCredentials: true })
      .pipe(
        map((response) => {
          const project: Project = response as Project;
          return project;
        })
      );
  }

  updateProject(project: Project) {
    this.http
      .put(`http://localhost:3000/project/${project.id}`, project)
      .subscribe((body) => {});
  }

  deleteProject(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:3000/project/${id}`);
  }

  getProjects(): Observable<Project[]> {
    return this.http
      .get('http://localhost:3000/project', { withCredentials: true })
      .pipe(
        map((projectData) => {
          const projectArray: Project[] = projectData as Array<Project>;
          return projectArray;
        })
      );
  }
}
