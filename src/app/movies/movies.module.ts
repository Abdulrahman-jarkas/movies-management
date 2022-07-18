import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesService } from './service/movies.service';

@NgModule({
  declarations: [MoviesListComponent, MovieDetailsComponent],
  imports: [CommonModule, MoviesRoutingModule],
  providers: [MoviesService],
})
export class MoviesModule {}
