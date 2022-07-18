import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesService } from './service/movies.service';
// material
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StateSerivce } from '../shared/helper/state';
import { CategoriesSelectorsComponent } from './categories-selectors/categories-selectors.component';
import { MatSelectModule } from '@angular/material/select';

const MATERIAL = [
  MatCardModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
];
@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent,
    CategoriesSelectorsComponent,
  ],
  imports: [CommonModule, ...MATERIAL, MoviesRoutingModule],
  providers: [MoviesService, StateSerivce],
})
export class MoviesModule {}
