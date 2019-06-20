import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  erroMsg: string = null;
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      passwd: [null, Validators.required],
    });
  }

  login() {

    this.submitted = true;
    this.erroMsg = null;
    if (!this.loginForm.invalid) {
      let user: any = {
        username: null,
        passwd: null,
      };

      user.username = this.loginForm.value.username;
      user.passwd = this.loginForm.value.passwd;

      this.auth.login(user).subscribe((user) => {
        localStorage.setItem('token', user.token);
        this.router.navigate(['/admin']);
      },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 403:
              this.erroMsg = "Usuário ou senha inválida!";
              this.loginForm.reset();
              break;
            default:
              this.erroMsg = "Falha ao tentar realizar o login, recarregue a pagina!";
              break;
          }
        })
      this.submitted = false;
    }
  }

  get formLogin() {
    return this.loginForm.controls;
  }


}
