import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  showLoading() {
    this.isLoading.next(true);
  }

  hideLoading() {
    this.isLoading.next(false);
  }
}
