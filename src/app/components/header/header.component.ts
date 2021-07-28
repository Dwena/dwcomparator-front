import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoginService } from 'src/app/services/login/login.service';
// import { Header } from './header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user : String = localStorage.getItem('currentUser');

  constructor( private loginService: LoginService,
    private router: Router) {

    console.log(this.user);
   }

   async logout(){
     this.loginService.logout()
     let th = this;
     setTimeout(function(){ th.router.navigate(['/login-page']); }, 1000);



   }

   isAuthenticate(){
     return this.loginService.isAuthenticate();
   }

  ngOnInit(): void {


  }

}
