import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private user: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.user.getUserLoggedIn().map(res => {
      res = res.json();
      if (res.status) {
        // 登录则直接跳转
        return true;
      }
      // 没有登录跳转到登录页面
      this.router.navigate(['/login']);
      return false;
    }).first()
  }
}
