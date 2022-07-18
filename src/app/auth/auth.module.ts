import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthContainerComponent } from './auth-container/auth-container.component';
// material
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

const MATERIAL = [
  MatCardModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthContainerComponent],
  imports: [CommonModule, ...MATERIAL, AuthRoutingModule, FormsModule],
})
export class AuthModule {}
