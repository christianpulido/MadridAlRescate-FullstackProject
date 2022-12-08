import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {

    let tryToken = localStorage.getItem('token_madrid_rescate');

    if(!tryToken) {
      this.router.navigate(['/acceso'])
      return false;

    } else {
      let response = await this.userService.getProfile()
  
      if (response.id_user) {
        return true
      } else {
        this.router.navigate(['/acceso'])
        return false;
      }
    }
  }
}
