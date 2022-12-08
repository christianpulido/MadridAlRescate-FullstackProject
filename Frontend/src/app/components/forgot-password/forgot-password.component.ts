import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm: FormGroup;
  message1: string = "";
  message2: string = "";

  constructor(
    private userService: UserService
  ) { 
    this.emailForm = new FormGroup({
      email: new FormControl()
    })

  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<any> {
    let response = await this.userService.resetPassword(this.emailForm.value.email);
    if(response.success) {
      this.message2 = "";
      this.message1 = response.success;

    } else {
      this.message1 = "";
      this.message2 = response.error
    }
  }

}
