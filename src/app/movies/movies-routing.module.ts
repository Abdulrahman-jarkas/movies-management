import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: 'list-movies',
    component: MoviesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-movie',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-movie/:id',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard],
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
