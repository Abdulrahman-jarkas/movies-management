import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { CategoryModel } from '../models/categorie.model';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'categories-selectors',
  templateUrl: './categories-selectors.component.html',
  styleUrls: ['./categories-selectors.component.scss'],
})
export class CategoriesSelectorsComponent
  extends ClearSubscriptionsComponent
  implements OnInit
{
  categories$!: Observable<CategoryModel[]>;

  @Output() onSelect = new EventEmitter<number>();

  constructor(private categoriesService: CategoriesService) {
    super();
  }

  ngOnInit(): void {
    this.populateCategories();
    this.initCategories();
  }

  populateCategories() {
    this.categoriesService.getAll().pipe(takeUntil(this.destroy$)).subscribe();
  }

  initCategories() {
    this.categories$ = this.categoriesService.data$;
  }

  onChange(event: any) {
    this.onSelect.emit(event.value);
  }
}
