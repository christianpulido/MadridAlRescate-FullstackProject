import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile!: User;

  constructor(
    private userServices: UserService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.profile = await this.userServices.getProfile()
  }

  // Función Log Out
  logout() {
    localStorage.removeItem('token_madrid_rescate');
    this.router.navigate(['/acceso']);

  }
}
