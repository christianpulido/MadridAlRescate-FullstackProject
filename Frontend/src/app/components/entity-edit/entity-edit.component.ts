import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from 'src/app/interfaces/entity.interface';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css']
})
export class EntityEditComponent implements OnInit {

  editEntity: FormGroup;
  id!: number;
  entityToEdit!: Entity;

  constructor(
    private entitiesService: EntitiesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editEntity = new FormGroup({
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
      descripcion: new FormControl([
        Validators.required
      ]),
      status: new FormControl([
        Validators.required
      ])
    })

  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.editEntity.get(pControlName)?.hasError(pError) && this.editEntity.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.id = parseInt(params['id'])
    })

    this.entityToEdit = await this.entitiesService.getById(this.id);
    this.editEntity = new FormGroup({
      nombre: new FormControl(this.entityToEdit.nombre, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      apellido: new FormControl(this.entityToEdit.apellido, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      edad: new FormControl(this.entityToEdit.edad, [
        Validators.required

      ]),
      dni: new FormControl(this.entityToEdit.dni, []),
      email: new FormControl(this.entityToEdit.email, [
        Validators.required
      ]),
      direccion: new FormControl(this.entityToEdit.direccion, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      telefono: new FormControl(this.entityToEdit.telefono, [
        Validators.required
      ]),
      mascota: new FormControl(this.entityToEdit.mascota, [
        Validators.required
      ]),
      tipoInmueble: new FormControl(this.entityToEdit.tipoInmueble, [
        Validators.required
      ]),
      descripcion: new FormControl(this.entityToEdit.descripcion, [
        Validators.required
      ]),
      status: new FormControl(this.entityToEdit.status, [
        Validators.required
      ])
    })
  }

  async onSubmit(): Promise<any> {
    let response = await this.entitiesService.edit(this.editEntity.value, this.id);

    if (response.affectedRows) {
      this.router.navigate(['/cuadro-mandos/personas'])

    } else {
      console.log(response)
    }

  }

}
