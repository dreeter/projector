import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavBranch, NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css'],
})
export class NavTreeComponent implements OnInit, OnDestroy {
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
