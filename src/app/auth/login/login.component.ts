import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { prepareErrosList } from 'src/app/shared/helper/error-helper';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ClearSubscriptionsComponent {
  errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  login(form: any) {
    this.authService
      .login(form.email, form.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        if ((res.status = 'success')) {
          this.router.navigateByUrl('');
          return;
        }
        this.errors = prepareErrosList(res.message);
      });
  }
}
