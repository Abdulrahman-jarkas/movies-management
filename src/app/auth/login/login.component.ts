import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ClearSubscriptionsComponent {
  error: any;

  constructor(private authService: AuthService) {
    super();
  }

  login(form: any) {
    this.authService
      .login(form.email, form.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
