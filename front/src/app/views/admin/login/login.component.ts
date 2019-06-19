import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(){
    let user:any = {
      username: null,
      passwd: null,
    };

    user.username = this.loginForm.value.username;
    user.passwd = this.loginForm.value.password;

    this.auth.login(user).subscribe((user) => {
      localStorage.setItem('token', user.token);
      this.router.navigate(['/admin']);
    });
  }

}
