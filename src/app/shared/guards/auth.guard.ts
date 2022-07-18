import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authSerive: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.check();
  }

  canLoad(): boolean {
    return this.check();
  }

  private check(): boolean {
    if (this.authSerive.isLoggedIn) return true;
    this.router.navigate(['../auth']);
    return false;
  }
}
