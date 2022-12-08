import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged!: boolean;
  // logged1!: boolean;

  constructor( ) { }

  ngOnInit(): any {

  }

  ngDoCheck(): any {
    this.checkLogged();
    // this.checkLoggedWsp();
  }

  // Al loguearse sale el icono de Administración
  async checkLogged(): Promise<void> {
    let tryToken = localStorage.getItem('token_madrid_rescate');

    if (!tryToken) {
      this.logged = false;

    } else {
      this.logged = true;
    }
  }

  // // Al loguearse el icono de whatsapp desaparece
  // async checkLoggedWsp(): Promise<void> {
  //   let tryToken = localStorage.getItem('token_madrid_rescate');

  //   if (!tryToken) {
  //     this.logged1 = true;

  //   } else {
  //     this.logged1 = false;
  //   }
  // }

}
