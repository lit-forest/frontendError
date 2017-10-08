import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-logon',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class Login {

  passwordErr: boolean = false;

  loginForm: FormGroup;
  private email: string = '';
  private username: string = '';
  private password: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  handleLogin(userInfo) {
    this.loginService.login(userInfo).subscribe(res => {
      if (res.status) {
        this.passwordErr = false;
        this.router.navigate(['/preview']);
      } else {
        this.passwordErr = true;
      }
    })
  }
}
