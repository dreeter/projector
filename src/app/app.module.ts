import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import { ActionListComponent } from './action-list/action-list.component';
import { ProjectHeaderComponent } from './project/project-header/project-header.component';
import { ProjectComponent } from './project/project.component';
import { TaskTableComponent } from './task/task-table/task-table.component';
import { TaskComponent } from './task/task.component';
import { TaskHeaderComponent } from './task/task-header/task-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthModule } from './auth/auth.module';
import { ProjectHeaderListComponent } from './project/project-header-list/project-header-list.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

const appRoutes: Routes = [
  {
    path: 'home',
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
        // pathMatch: 'full',
      },
      {
        path: 'editproject/:id',
        component: AddEditProjectComponent,
        // pathMatch: 'full',
      },
    ],
  },

  // { path: 'newtask', component: NewTaskComponent, pathMatch: 'full' },
  // { path: 'project/:id', component: ProjectComponent, pathMatch: 'full' },
  // { path: 'task', component: ProjectComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ActionListComponent,
    ProjectHeaderComponent,
    ProjectComponent,
    TaskTableComponent,
    TaskComponent,
    TaskHeaderComponent,
    ProjectHeaderListComponent,
    AddEditProjectComponent,
    AddEditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AuthModule,
    AngularMaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: { appearance: 'fill' },
    // },
    ProjectService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
