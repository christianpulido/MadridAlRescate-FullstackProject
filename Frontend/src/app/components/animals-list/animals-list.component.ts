import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {

  allAnimals: Animal[] = [];
  tempAnimals: Animal[] = [];
  paginatedAnimals: Animal[] = [];
  page: number = 0;
  totalPages!: number;
  message!: string;

  type!: string;
  gender!: string;
  size!: string;

  constructor(
    private animalsService: AnimalsService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.allAnimals = await this.animalsService.getAllActives();
    this.tempAnimals = [...this.allAnimals];
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempAnimals.length / 8);
  }

  next(): void {
    this.page += 8;
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
  }

  prev(): void {
    this.page -= 8;
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
  }

  // Capturar valores inputs de filtro
  typeSelector($event: any) {
    this.type = $event.target.value
  }

  genderSelector($event: any) {
    this.gender = $event.target.value
  }

  sizeSelector($event: any) {
    this.size = $event.target.value
  }

  // Función filtrar
  filter() {
    this.tempAnimals = [...this.allAnimals];

    if (this.type) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.tipo.includes(this.type))
    };

    if (this.gender) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.sexo.includes(this.gender))
    };

    if (this.size) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.tamaño.includes(this.size))
    }

    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempAnimals.length / 8);

    if(this.paginatedAnimals.length < 1) this.message = "Lo sentimos, no tenemos ningún animal con estas características."
  }

  // Borrar Inputs recargando página
  eraser() {
    location.reload();
  }
}