import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.interface';
import { Entity } from 'src/app/interfaces/entity.interface';
import { AnimalsService } from 'src/app/services/animals.service';
import { DatesService } from 'src/app/services/dates.service';
import { EntitiesService } from 'src/app/services/entities.service';


@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css'],
  providers: [DatePipe]
})
export class AnimalEditComponent implements OnInit {

  editAnimal: FormGroup;
  animalToEdit!: Animal;
  entity!: Entity;
  idEntity!: number;
  arrEntities!: Entity[];
  authorizated!: boolean;

  currentDate!: string;
  arrImages: File[] = [];
  message1!: string;
  message2!: string;

  constructor(
    private animalsService: AnimalsService,
    private entitiesService: EntitiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datesService: DatesService,
    private datePipe: DatePipe
  ) {
    this.editAnimal = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      fechaEntrada: new FormControl('', [Validators.required]),
      raza: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      tipo: new FormControl('', [
        Validators.required
      ]),
      edad: new FormControl('', [
        Validators.required,
        this.ageValidator
      ]),
      tamaño: new FormControl('', [
        Validators.required
      ]),
      salud: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(245)
      ]),
      sexo: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required

      ]),
      urgencia: new FormControl('', [
        Validators.required]),
      status: new FormControl('', [
        Validators.required]),
      fechaEntrega: new FormControl('', []),
      imagenes: new FormControl('', []),
      isActive: new FormControl('', [])
    })
  }

  async ngOnInit(): Promise<void> {
    this.currentDate = this.datesService.getCurrentDate();

    this.activatedRoute.params.subscribe(async (params) => {
      this.animalToEdit = await this.animalsService.getById(params['id']);

      this.animalToEdit.fechaEntrada = this.datePipe.transform(this.animalToEdit.fechaEntrada, 'yyyy-MM-dd');

      if (this.animalToEdit.fechaEntrega) {
        this.animalToEdit.fechaEntrega = this.datePipe.transform(this.animalToEdit.fechaEntrega, 'yyyy-MM-dd');
      }

      this.editAnimal = new FormGroup({
        nombre: new FormControl(this.animalToEdit.nombre, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        fechaEntrada: new FormControl(this.animalToEdit.fechaEntrada, [Validators.required]),
        raza: new FormControl(this.animalToEdit.raza, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ]),
        tipo: new FormControl(this.animalToEdit.tipo, [
          Validators.required
        ]),
        edad: new FormControl(this.animalToEdit.edad, [
          Validators.required,
          this.ageValidator
        ]),
        tamaño: new FormControl(this.animalToEdit.tamaño, [
          Validators.required
        ]),
        salud: new FormControl(this.animalToEdit.salud, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(245)
        ]),
        sexo: new FormControl(this.animalToEdit.sexo, [
          Validators.required
        ]),
        descripcion: new FormControl(this.animalToEdit.descripcion, [
          Validators.required

        ]),
        urgencia: new FormControl(this.animalToEdit.urgencia, [
          Validators.required]),
        status: new FormControl(this.animalToEdit.status, [
          Validators.required]),
        fechaEntrega: new FormControl(this.animalToEdit.fechaEntrega, []),
        imagenes: new FormControl(this.animalToEdit.imagenes, []),
        isActive: new FormControl(this.animalToEdit.isActive, []),
        id_persona: new FormControl(this.animalToEdit.id_persona, [])
      })

      let getEntity = await this.entitiesService.getAll();

      if (getEntity.error) {
        this.authorizated = false;
      } else {
        this.authorizated = true;
        this.arrEntities = getEntity;
        if (this.animalToEdit.id_persona) {
          this.entity = await this.entitiesService.getById(this.animalToEdit.id_persona)
        }
      }
    })

  }

  ageValidator(pControlName: AbstractControl): any {
    const edad: number = parseInt(pControlName.value)

    if (isNaN(edad)) {
      return { 'ageValidator': 'La edad tiene que ser un numero' }
    } else if (edad < 0 || edad > 25) {
      return { 'ageValidator': 'La edad tiene que estar entre 0 y 25 años' }
    }

    return null
  }

  async onSubmit(): Promise<any> {
    if (this.editAnimal.value.isActive) this.editAnimal.value.isActive = 1;
    if (!this.editAnimal.value.isActive) this.editAnimal.value.isActive = 0;

    if (this.idEntity) this.editAnimal.value.id_persona = this.idEntity;

    let fd = new FormData();

    fd.append('nombre', this.editAnimal.value.nombre);
    fd.append('fechaEntrada', this.editAnimal.value.fechaEntrada);
    fd.append('raza', this.editAnimal.value.raza);
    fd.append('tipo', this.editAnimal.value.tipo);
    fd.append('edad', this.editAnimal.value.edad);
    fd.append('tamano', this.editAnimal.value.tamaño);
    fd.append('salud', this.editAnimal.value.salud);
    fd.append('sexo', this.editAnimal.value.sexo);
    fd.append('descripcion', this.editAnimal.value.descripcion);
    fd.append('urgencia', this.editAnimal.value.urgencia);
    fd.append('status', this.editAnimal.value.status);
    fd.append('isActive', this.editAnimal.value.isActive);

    if (this.editAnimal.value.fechaEntrega) fd.append('fechaEntrega', this.editAnimal.value.fechaEntrega);
    if (this.editAnimal.value.id_persona) fd.append('id_persona', this.editAnimal.value.id_persona);

    if (this.arrImages.length > 0) {
      for (let i = 0; i < this.arrImages.length; i++) {
        fd.append("imagenes", this.arrImages[i], this.arrImages[i].name);
      }
    }

    let response = await this.animalsService.edit(fd, this.animalToEdit.id_animal);

    if (response.affectedRows) {
      this.router.navigate(['/cuadro-mandos/animales'])

    } else {
      this.message1 = "Inténtalo de nuevo mas tarde."
    }

  }

  uploadImages(event: any): void {
    this.arrImages = event.target.files;
  }

  async deleteImages(): Promise<void> {
    let response = await this.animalsService.deleteImages(this.animalToEdit.id_animal);

    if (response.affectedRows) {
      location.reload();
    } else {
      this.message2 = "Inténtalo de nuevo mas tarde."
    }
  }

  async deleteEntity(): Promise<void> {
    let response = await this.animalsService.deleteEntity(this.animalToEdit.id_animal);

    if (response.affectedRows) {
      location.reload();
    } else {
      this.message2 = "Inténtalo de nuevo mas tarde."
    }
  }

  setIdEntity(event: any): void {
    let array = event.target.value.split(" ");
    this.idEntity = parseInt(array![0]);
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.editAnimal.get(pControlName)?.hasError(pError) && this.editAnimal.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

}
