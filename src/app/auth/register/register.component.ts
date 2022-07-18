import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ClearSubscriptionsComponent } from 'src/app/shared/components/clear-subscriptions/clear-subscriptions.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends ClearSubscriptionsComponent {
  error: any;
  constructor(private authSerive: AuthService) {
    super();
  }

  register(form: any) {
    this.authSerive
      .register(form.name, form.email, form.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
