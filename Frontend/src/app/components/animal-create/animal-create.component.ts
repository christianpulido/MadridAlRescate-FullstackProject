import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

  createAnimal: FormGroup;
  arrImages: File[] = [];
  // errors!: any;

  message!: string;


  constructor(
    private animalsService: AnimalsService,
    private router: Router
  ) {
    this.createAnimal = new FormGroup({
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
      status: new FormControl('Disponible', [
        Validators.required]),
      fechaEntrega: new FormControl('', []),
      imagenes: new FormControl('', [
        Validators.required]),
      isActive: new FormControl('1', [
        Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.message = "";

    let fd = new FormData();

    fd.append('nombre', this.createAnimal.value.nombre);
    fd.append('fechaEntrada', this.createAnimal.value.fechaEntrada);
    fd.append('raza', this.createAnimal.value.raza);
    fd.append('tipo', this.createAnimal.value.tipo);
    fd.append('edad', this.createAnimal.value.edad);
    fd.append('tamano', this.createAnimal.value.tamaño);
    fd.append('salud', this.createAnimal.value.salud);
    fd.append('sexo', this.createAnimal.value.sexo);
    fd.append('descripcion', this.createAnimal.value.descripcion);
    fd.append('urgencia', this.createAnimal.value.urgencia);
    fd.append('status', this.createAnimal.value.status);
    fd.append('isActive', this.createAnimal.value.isActive);

    for (let i = 0; i < this.arrImages.length; i++) {
      fd.append("imagenes", this.arrImages[i], this.arrImages[i].name);
    }

    let response = await this.animalsService.create(fd);

    if (response.id_animal) {
      this.router.navigate(['/cuadro-mandos/animales']);

    } else {
      this.message = "Algo ha salido mal, intentalo de nuevo mas tarde.";
    }
  }

  uploadImages(event: any): void {
    this.arrImages = event.target.files;
  }

  ageValidator(pControlName: AbstractControl): any {
    const edad: number = parseInt(pControlName.value)

    if (isNaN(edad)) {
      return { 'agevalidator': 'La edad tiene que ser un numero' }
    } else if (edad < 0 || edad > 25) {
      return { 'agevalidator': 'La edad tiene que estar entre 0 y 25 años' }
    }

    return null
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.createAnimal.get(pControlName)?.hasError(pError) && this.createAnimal.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

}
