import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu-bar-admin',
  templateUrl: './menu-bar-admin.component.html',
  styleUrls: ['./menu-bar-admin.component.scss']
})
export class MenuBarAdminComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
