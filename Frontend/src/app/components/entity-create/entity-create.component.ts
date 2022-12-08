import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.css']
})
export class EntityCreateComponent implements OnInit {

  createEntity: FormGroup;

  constructor(
    private entitiesService: EntitiesService,
    private router: Router
  ) {
    this.createEntity = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      edad: new FormControl('', [
        Validators.required

      ]),
      dni: new FormControl('', []),
      email: new FormControl('', [
        Validators.required
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      telefono: new FormControl('', [
        Validators.required
      ]),
      mascota: new FormControl('', [
        Validators.required
      ]),
      tipoInmueble: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      status: new FormControl([
        Validators.required
      ])
    })

  }



  ngOnInit(): void {
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.createEntity.get(pControlName)?.hasError(pError) && this.createEntity.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }


  async onSubmit(): Promise<any> {
    let response = await this.entitiesService.create(this.createEntity.value);

    if (response.id_persona) {
      this.router.navigate(['/cuadro-mandos/personas']);

    } else {
      console.log(response);
    }
  }

}
