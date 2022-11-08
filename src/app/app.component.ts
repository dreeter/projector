import { Component, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';
import { ProjectService } from './services/project.service';
import { NetworkInterceptor } from './services/network.interceptor.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Projector';

  constructor(
    private navigationService: NavigationService,
    private spinnerService: NetworkInterceptor,
    private authService: AuthService
  ) {}
}
