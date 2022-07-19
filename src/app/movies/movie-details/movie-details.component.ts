import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { MovieModel } from '../models/movie';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent
  extends ClearSubscriptionsComponent
  implements OnInit
{
  movie: MovieModel = {
    name: '',
    description: '',
    category_id: '',
    image: '',
  };
  movie$!: Observable<MovieModel>;
  imageSrc: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieSerive: MoviesService
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    if (id) {
      this.getMovie(parseInt(id));
      this.movie.id = id;
    }
  }

  setCategoryId(catId: number) {
    this.movie = { ...this.movie, category_id: catId.toString() };
  }

  setImage(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(file);

    // // Create form data
    // const formData = new FormData();
    // // Store form name as "file" with file data
    // formData.append("file", file, file.name);

    this.movie.image = file;
  }

  getMovie(id: number) {
    console.log(id);
    this.movieSerive
      .getBy(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.movie = res;
      });
  }

  submit() {
    console.log(this.movie);
    const { id, ...rest } = this.movie;
    const obs$ = this.movie?.id
      ? this.movieSerive.edit({ ...this.movie } as MovieModel & { id: number })
      : this.movieSerive.add({ ...rest });

    obs$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
