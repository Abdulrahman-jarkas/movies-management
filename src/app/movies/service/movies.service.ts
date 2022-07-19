import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateSerivce } from 'src/app/shared/helper/state';
import { MovieModel } from '../models/movie';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable()
export class MoviesService extends StateSerivce<MovieModel & { id: number }> {
  override api = environment.domain + '/api/movies';
  apiMoviesByCategory = environment.domain + '/api/moviesByCategory/';

  constructor(public override http: HttpClient) {
    super(http);
  }

  getMoviesByCategory(catId: number) {
    return this.http
      .get<{
        message: (MovieModel & { id: number })[];
        status: 'success' | 'failed';
      }>(this.apiMoviesByCategory + catId)
      .pipe(
        tap((res) => {
          this.dataSubject.next([...res.message]);
        })
      );
  }

  // override add(payload: Omit<MovieModel & { id: number }, 'id'>) {
  //   const formData = new FormData();

  //   formData.append('name', payload.name);
  //   formData.append('image', payload?.image);
  //   formData.append('description', payload.description);
  //   formData.append('category_id', payload.category_id);

  //   return this.http.post<{
  //     message: MovieModel & { id: number };
  //     status: 'success' | 'failed';
  //   }>(this.api, formatDate).pipe(tap(res => {
  //     const newState = addToState<MovieModel>()
  //   }));
  // }
}
