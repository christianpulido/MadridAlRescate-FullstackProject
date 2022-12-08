import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals-crud',
  templateUrl: './animals-crud.component.html',
  styleUrls: ['./animals-crud.component.css']
})
export class AnimalsCRUDComponent implements OnInit {

  allAnimals: Animal[] = []
  tempAnimals: Animal[] = []
  paginatedAnimals: Animal[] = []
  page: number = 0;
  totalPages!: number;

  type!: string;
  status!: string;
  priority!: string;
  message!: string;

  constructor(
    private animalsService: AnimalsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.allAnimals = await this.animalsService.getAll();
    this.tempAnimals = [...this.allAnimals];
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempAnimals.length / 8);
  }

  // Función Avanzar Página
  next(): void {
    this.page += 8;
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
  }

  // Función Retroceder Página
  prev(): void {
    this.page -= 8;
    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
  }

  // Capturar valores inputs de filtro
  typeSelector($event: any) {
    this.type = $event.target.value
  }

  statusSelector($event: any) {
    this.status = $event.target.value
  }

  prioritySelector($event: any) {
    this.priority = $event.target.value
  }

  // Función de filtrado
  filter() {
    this.tempAnimals = this.allAnimals

    if (this.type) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.tipo.includes(this.type))
    };

    if (this.status) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.status.includes(this.status))
    };

    if (this.priority) {
      this.tempAnimals = this.tempAnimals.filter(animal => animal.urgencia.includes(this.priority))
    }

    this.paginatedAnimals = this.tempAnimals.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempAnimals.length / 8);
    if (this.paginatedAnimals.length < 1) this.message = "No existe ningún animal registrado con esas características."
  }

  // Función Borrado Filtros
  eraser() {
    location.reload();
  }
}
