import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Project } from '../models/project.model';
import { TaskInfo } from '../models/taskinfo.model';

@Injectable()
export class ProjectService {
  projectDeleted: Subject<number> = new Subject<number>();
  projectDeleteError: Subject<Error> = new Subject<Error>();
  projectAdded: Subject<boolean> = new Subject<boolean>();
  projectAddError: Subject<Error> = new Subject<Error>();
  projectUpdated: Subject<boolean> = new Subject<boolean>();
  projectUpdateError: Subject<Error> = new Subject<Error>();

  constructor(private http: HttpClient) {}

  addProject(taskInfo: TaskInfo): void {
    this.http.post('http://localhost:3000/project', taskInfo).subscribe({
      next: () => {
        this.projectAdded.next(true);
      },
      error: (error: Error) => {
        this.projectAddError.next(error);
      },
    });
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`http://localhost:3000/project/${id}`, {
      withCredentials: true,
    });
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/project', {
      withCredentials: true,
    });
  }

  updateProject(project: Project): void {
    this.http
      .put(`http://localhost:3000/project/${project.id}`, project)
      .subscribe({
        next: () => {
          this.projectUpdated.next(true);
        },
        error: (error: Error) => {
          this.projectUpdateError.next(error);
        },
      });
  }

  deleteProject(id: number): void {
    this.http.delete(`http://localhost:3000/project/${id}`).subscribe({
      next: () => {
        this.projectDeleted.next(id);
      },
      error: (error: Error) => {
        this.projectDeleteError.next(error);
      },
    });
  }
}
