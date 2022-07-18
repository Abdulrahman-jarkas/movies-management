import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { addToState, deleteFromState } from './state-helper';

@Injectable()
export class StateSerivce<T extends { id: number }> {
  api!: string;

  private dataSubject = new BehaviorSubject<T[]>([]);
  data$: Observable<T[]> = this.dataSubject.asObservable();

  private selectedItemSubject = new BehaviorSubject<T | null>(null);
  selectedItem$: Observable<T | null> = this.selectedItemSubject.asObservable();

  constructor(public http: HttpClient) {}

  // populate data here
  getAll() {
    return this.http
      .get<{ message: T[]; status: 'success' | 'failed' }>(this.api)
      .pipe(tap((res) => this.dataSubject.next([...res.message])));
  }

  getBy(id: number) {
    const data = this.dataSubject.value.find((item) => item.id === id);
    if (data) return data;

    return this.http
      .get<{ message: T; status: 'success' | 'failed' }>(this.api + '/' + id)
      .pipe(map((res) => res.message));
  }

  add(payload: T) {
    return this.http
      .post<{ message: T; status: 'success' | 'failed' }>(this.api, {
        payload,
      })
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            const newState = addToState<T>(this.dataSubject.value, {
              ...payload,
              id: res.message.id,
            });
            this.dataSubject.next([...newState]);
          }
        })
      );
  }

  edit(payload: T) {
    return this.http
      .post<{ message: T; status: 'success' | 'failed' }>(this.api, {
        payload,
      })
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            const newState = addToState<T>(this.dataSubject.value, {
              ...payload,
              id: res.message.id,
            });
            this.dataSubject.next([...newState]);
          }
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<{ message: T; status: 'success' | 'failed' }>(this.api + '/' + id)
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            const newState = deleteFromState<T>(this.dataSubject.value, id);
            this.dataSubject.next([...newState]);
          }
        })
      );
  }
}
