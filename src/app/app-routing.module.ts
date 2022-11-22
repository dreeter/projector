import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProjectComponent } from './project/add-edit-project/add-edit-project.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProjectHeaderListComponent } from './project/project-header-list/project-header-list.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: NavigationComponent,
    children: [
      {
        path: 'projects',
        component: ProjectHeaderListComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
      },
      {
        path: 'task/:id',
        component: TaskComponent,
      },
      {
        path: 'editproject',
        component: AddEditProjectComponent,
      },
      {
        path: 'editproject/:id',
        component: AddEditProjectComponent,
      },
      {
        path: 'edittask/:id',
        component: EditTaskComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
