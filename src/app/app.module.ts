import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';
import { ClearSubscriptionsComponent } from './shared/components/clear-subscriptions/clear-subscriptions.component';

// materila
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MATERIAL = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [AppComponent, LayoutComponent, ClearSubscriptionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MATERIAL,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
