import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateSerivce } from 'src/app/shared/helper/state';
import { MovieModel } from '../models/movie';
import { environment } from 'src/environments/environment';
@Injectable()
export class MoviesService extends StateSerivce<MovieModel> {
  override api = environment.domain + '/api/movies';
  constructor(public override http: HttpClient) {
    super(http);
  }
}
