import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar-admin',
  templateUrl: './menu-bar-admin.component.html',
  styleUrls: ['./menu-bar-admin.component.scss']
})
export class MenuBarAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
