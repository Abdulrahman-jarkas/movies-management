import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loader$!: Observable<boolean>;

  constructor(
    public authSerive: AuthService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.loader$;
  }

  // @TODO: workaround
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
}
