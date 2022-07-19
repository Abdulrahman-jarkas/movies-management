import { Component, OnInit } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { MovieModel } from '../models/movie';
import { MoviesService } from '../service/movies.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent
  extends ClearSubscriptionsComponent
  implements OnInit
{
  movies$!: Observable<MovieModel[]>;

  constructor(private moviesSerive: MoviesService) {
    super();
  }

  ngOnInit(): void {
    this.populateMovies();
    this.initMovies();
  }

  populateMovies() {
    this.moviesSerive.getAll().pipe(takeUntil(this.destroy$)).subscribe();
  }

  initMovies() {
    this.movies$ = this.moviesSerive.data$.pipe(
      map((movies) =>
        movies.map((m) => ({
          ...m,
          image: `${environment.domain}/${m.image}`,
        }))
      )
    );
  }

  deleteMovie(id: number) {
    const res = confirm('are you want to delete this movie?');
    if (!res) return;
    this.moviesSerive.delete(id).pipe(takeUntil(this.destroy$)).subscribe();
  }

  populateMovieByCategory(catId: number) {
    console.log(catId);
    return this.moviesSerive
      .getMoviesByCategory(catId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
