import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateSerivce } from 'src/app/shared/helper/state';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends StateSerivce<CategoryModel> {
  override api = environment.domain + '/api/category';
  constructor(public override http: HttpClient) {
    super(http);
  }
}
