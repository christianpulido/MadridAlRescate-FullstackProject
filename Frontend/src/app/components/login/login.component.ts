import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = ""; //Creamos elemento

  //Inyectamos servicios
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void { }


  //Creamos funcion getDataForm (Recibir y validar datos formulario log In)
  async getDataForm(pForm: any): Promise<void> {

    let response = await this.userService.login(pForm.value);


    if (response.success) {

      localStorage.setItem('token_madrid_rescate', response.token); //--> Guardo token una vez que se valida el login
      this.router.navigate(['/cuadro-mandos']); // --> Redirigimos a la página de cuadro de mandos
    } else {
      this.error = response.error;
    }
    pForm.resetForm();
  }
  
}


