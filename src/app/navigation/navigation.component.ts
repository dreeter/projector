import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import { NetworkInterceptor } from '../services/network.interceptor.service';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  showSpinner: boolean = false;
  loginSuccessSub: Subscription = new Subscription();
  username: string = '';

  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loadingService: LoadingService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.isLoading.subscribe({
      next: (loading: boolean) => {
        this.showSpinner = loading;
        this.changeDetector.detectChanges();
      },
    });

    this.loginSuccessSub = this.authService.loginSuccess.subscribe(() => {
      this.username = this.authService.user.username;
    });
  }

  ngOnDestroy() {
    this.loginSuccessSub.unsubscribe();
  }
}
