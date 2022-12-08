import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  nombre = "";
  telefono = "";
  asunto = "";
  email = "";
  mensaje = "";

  datos: FormGroup;

  confirmacion: string = "";


  constructor(
    private animalsService: AnimalsService
  ) {
    this.datos = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      telefono: new FormControl('', [
        Validators.required
      ]),
      asunto: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      mensaje: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(245)
      ])
    })
  }

  async envioCorreo(): Promise<any> {
    this.confirmacion = ""
    let params = {
      nombre: this.datos.value.nombre,
      telefono: this.datos.value.telefono,
      asunto: this.datos.value.asunto,
      email: this.datos.value.email,
      mensaje: this.datos.value.mensaje

    }

    let response = await this.animalsService.sendEmail(params)
    if (response.success) {
      this.confirmacion = response.success
    }

  }

  ngOnInit(): void {
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.datos.get(pControlName)?.hasError(pError) && this.datos.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

}