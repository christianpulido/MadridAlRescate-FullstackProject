import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user!: User | any;
  userToken!: string;
  passwordForm: FormGroup;
  message1: string = "";
  message2: string = "";

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.passwordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required

      ])
    }, [this.passwordValidator]);
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.passwordForm.get(pControlName)?.hasError(pError) && this.passwordForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }


  // Función De Vadilación De Password
  passwordValidator(pForm: AbstractControl): any {
    const password: string = pForm.get('password')?.value;
    const confirmPassword: string = pForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordvalidator': true }
    }
    return null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.userToken = params['token'];
      let response = await this.userService.getProfileByLink(this.userToken);

      if (response.id_user) {
        this.user = response
      }
    })
  }

  async onSubmit(): Promise<any> {
    try {

      let response = await this.userService.newPassword(
        this.passwordForm.value,
        this.user.id_user,
        this.userToken
      );

      if (response.affectedRows) {
        this.message1 = "Contraseña reestablecida con exito.";
        this.message2 = "";

        let btn = document.querySelector('.btn-reset');
        btn?.classList.add('disabled');

      } else {
        this.message1 = "Inténtalo de nuevo mas tarde.";
        this.message2 = "";
      }

    } catch (err: any) {
      this.message2 = err.error[0].msg;
    }
  }
}
