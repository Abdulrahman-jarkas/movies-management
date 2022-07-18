import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
})
export class AuthContainerComponent implements OnInit {
  loader$!: Observable<boolean>;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.loader$;
  }
}
