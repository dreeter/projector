import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavBranch, NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navtree-bar',
  templateUrl: './navtree-bar.component.html',
  styleUrls: ['./navtree-bar.component.css'],
})
export class NavtreeBarComponent implements OnInit {
  navTree: NavBranch[] = [];
  navTreeUpdated: Subscription = {} as Subscription;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navTreeUpdated = this.navigationService.navTreeUpdated.subscribe(
      (navTree) => {
        this.navTree = navTree;
      }
    );
  }

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy(): void {
    this.navTreeUpdated.unsubscribe();
  }
}
