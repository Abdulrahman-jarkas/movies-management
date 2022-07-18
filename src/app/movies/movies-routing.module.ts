import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: 'list-movies',
    component: MoviesListComponent,
  },
  {
    path: 'add-movie',
    component: MovieDetailsComponent,
  },
  {
    path: 'edit-movie/:id',
    component: MovieDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'list-movies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
