import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Helpers from 'src/app/libs/Helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  arrErrors: any[] = []
  register: FormGroup; // registramos elemento
  nombreError: any;
  apellidoError: any;
  emailError: any;
  passwordError: any;
  repeatPasswordError: any;
  message!: string;

  constructor(
    //Inyectamos servicios
    private userService: UserService,
    private router: Router
  ) {

    //Inserción
    this.register = new FormGroup({
      nombre: new FormControl("", []),
      apellido: new FormControl("", []),
      email: new FormControl("", []),
      password: new FormControl("", []),
      repeatPassword: new FormControl("", [Validators.required]),
      isAdmin: new FormControl("0", []),
      isActive: new FormControl("1", [])
    }, [this.passwordValidator]);
  }

  // Función De Validación De Password
  passwordValidator(pForm: AbstractControl): any {
    const password: string = pForm.get('password')?.value;
    const repeatPassword: string = pForm.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      return { 'passwordvalidator': true }
    }
    return null;
  }

  ngOnInit(): void { }


  //Promesa getDataForm (Hacemos petición y respuesta)
  async getDataForm() {
    this.message = "";
    try {
      let response = await this.userService.register(this.register.value);

      if (response.insertId) {
        this.router.navigate(['/cuadro-mandos', 'usuarios'])
      } else {
        this.message = response.error
      }
    }
    catch (reject: any) {
      this.arrErrors = reject.error;
      this.nombreError = this.arrErrors.find(error => error.param === 'nombre');
      this.apellidoError = this.arrErrors.find(error => error.param === 'apellido');
      this.emailError = this.arrErrors.find(error => error.param === 'email')
    }
    this.passwordError = this.arrErrors.find(error => error.param === 'password')
    this.repeatPasswordError = this.arrErrors.find(error => error.param === 'repeatPassword')
  }
}
