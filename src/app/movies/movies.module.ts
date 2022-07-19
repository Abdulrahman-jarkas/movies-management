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
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL = [
  MatCardModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
];
@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent,
    CategoriesSelectorsComponent,
  ],
  imports: [CommonModule, ...MATERIAL, MoviesRoutingModule, FormsModule],
  providers: [MoviesService, StateSerivce],
})
export class MoviesModule {}
