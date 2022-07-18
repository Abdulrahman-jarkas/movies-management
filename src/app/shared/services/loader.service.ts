import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean>;
  loader$: Observable<boolean>;

  constructor() {
    this.loaderSubject = new BehaviorSubject<boolean>(false);
    this.loader$ = this.loaderSubject.asObservable();
  }

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
}
