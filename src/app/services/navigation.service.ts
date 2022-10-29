import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

export interface NavBranch {
  url: string;
  name: string;
}

@Injectable()
export class NavigationService {
  private routeHistory: string[] = [];
  private navTree: NavBranch[] = [];

  navTreeUpdated: Subject<NavBranch[]> = new Subject<NavBranch[]>();

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.routeHistory.push(event.urlAfterRedirects);
      });
  }

  resetNavTree() {
    this.navTree = [];
  }

  navUpTree() {
    this.router.navigateByUrl(this.navTree[this.navTree.length - 2].url);
  }

  addRouteToTree(navBranch: NavBranch) {
    const index: number = this.navTree.findIndex((route) => {
      return route.url === navBranch.url;
    });

    if (index === -1) {
      this.navTree.push(navBranch);
    } else {
      this.navTree = this.navTree.slice(0, index + 1);
    }

    this.navTreeUpdated.next(this.navTree);
  }

  back(): void {
    this.routeHistory.pop();
    if (this.routeHistory.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
