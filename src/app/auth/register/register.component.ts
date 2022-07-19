import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { prepareErrosList } from 'src/app/shared/helper/error-helper';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends ClearSubscriptionsComponent {
  errors: string[] = [];
  constructor(private authSerive: AuthService, private router: Router) {
    super();
  }

  register(form: any) {
    this.authSerive
      .register(form.name, form.email, form.password)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          return of({ status: 'failed', message: 'something failed' });
        })
      )
      .subscribe((res) => {
        console.log(res);

        if (res.status === 'success') {
          this.router.navigateByUrl('');
          return;
        }
        this.errors = prepareErrosList(res.message);
      });
  }
}
