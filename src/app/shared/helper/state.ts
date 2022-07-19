import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay, tap } from 'rxjs';
import { addToState, deleteFromState, updateState } from './state-helper';

@Injectable()
export class StateSerivce<T extends { id: number }> {
  api!: string;

  dataSubject = new BehaviorSubject<T[]>([]);
  data$: Observable<T[]> = this.dataSubject.asObservable().pipe(shareReplay(2));

  selectedItemSubject = new BehaviorSubject<T | null>(null);
  selectedItem$: Observable<T | null> = this.selectedItemSubject.asObservable().pipe(shareReplay(2));

  constructor(public http: HttpClient) {}

  // populate data here
  getAll() {
    return this.http
      .get<{ message: T[]; status: 'success' | 'failed' }>(this.api)
      .pipe(tap((res) => this.dataSubject.next([...res.message])));
  }

  getBy(id: number) {
    const data = this.dataSubject.value.find((item) => item?.id === id);
    if (data) return of(data);

    return this.http
      .get<{ message: T; status: 'success' | 'failed' }>(this.api + '/' + id)
      .pipe(map((res) => res.message));
  }

  add(payload: Omit<T, 'id'>) {
    return this.http
      .post<{ message: T & { id: number }; status: 'success' | 'failed' }>(
        this.api,
        this.prepareData(payload)
      )
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            const newState = addToState<T>(this.dataSubject.value, {
              ...payload,
              ...res.message,
            });
            this.dataSubject.next([...newState]);
          }
        })
      );
  }

  edit(payload: T) {
    return this.http
      .post<{ message: T & { id: number }; status: 'success' | 'failed' }>(
        this.api + '/' + payload.id,
        this.prepareData({ ...payload, _method: 'put' })
      )
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            const newState = updateState<T>(
              this.dataSubject.value,
              payload.id,
              {
                ...payload,
                ...res.message,
              }
            );
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

  prepareData(data: Omit<T, 'id'>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as any);
    }
    return formData;
  }
}
