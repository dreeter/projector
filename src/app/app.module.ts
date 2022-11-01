import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ActionListComponent } from './action-list/action-list.component';
import { ProjectHeaderComponent } from './project/project-header/project-header.component';
import { ProjectComponent } from './project/project.component';
import { TaskTableComponent } from './task/task-table/task-table.component';
import { TaskComponent } from './task/task.component';
import { TaskHeaderComponent } from './task/task-header/task-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { NavigationService } from './services/navigation.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthModule } from './auth/auth.module';
import { ProjectHeaderListComponent } from './project/project-header-list/project-header-list.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NavTreeComponent } from './nav-tree/nav-tree.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskTreeComponent } from './task/task-tree/task-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { NetworkInterceptor } from './services/network.interceptor.service';

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
    AddTaskComponent,
    NavTreeComponent,
    EditTaskComponent,
    TaskTreeComponent,
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
    MatTreeModule,
  ],
  providers: [
    ProjectService,
    TaskService,
    NavigationService,
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
