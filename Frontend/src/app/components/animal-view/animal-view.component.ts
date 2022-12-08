import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.css']
})
export class AnimalViewComponent implements OnInit {

  animal: any;
  baseUrl: string = "http://localhost:3000/images/";
  check: boolean = false


  constructor(
    private activatedRoute: ActivatedRoute,
    private animalsServices: AnimalsService
  ) { }

  ngOnInit(): void {
    this.animal = {
      nombre: '',
      edad: '',
      tipo: '',
      raza: '',
      tamaño: '',
      sexo: '',
      salud: '',
      descripcion: '',
      urgencia: '',
      fechaEntrada: '',
      status: '',
      imagenes: '',
      isActive: '',
    }
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.id);
      this.animal = await this.animalsServices.getById(id);
    })
  }

  setActiveImg(): void {
    let activeImg = document.querySelector('.carousel-item');
    activeImg?.classList.add('active');
  }
}
