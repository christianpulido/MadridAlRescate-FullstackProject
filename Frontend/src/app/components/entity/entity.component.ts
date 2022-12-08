import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/interfaces/entity.interface';
import Helpers from 'src/app/libs/Helpers';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  authorizated!: boolean;
  arrEntities: Entity[] = [];
  tempEntities: Entity[] = [];
  paginatedEntities: Entity[] = []

  search!: string;
  page: number = 0;
  totalPages!: number;
  message!: string;
  message1!: string;

  constructor(
    private entitiesService: EntitiesService
  ) { }

  async ngOnInit(): Promise<void> {
    let response = await this.entitiesService.getAll();
    if (response.error) {
      this.authorizated = false;
      this.message1 = "Este apartado solo está disponible para los administradores.";
    } else {
      this.authorizated = true;
      this.arrEntities = response;
    }
    this.tempEntities = [...this.arrEntities];
    this.paginatedEntities = this.tempEntities.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempEntities.length / 8);
  }

  // Funciones Página Siguiente
  next(): void {
    this.page += 8;
    this.paginatedEntities = this.tempEntities.slice(this.page, this.page + 8);
  }
  // Funciones Página Anterior
  prev(): void {
    this.page -= 8;
    this.paginatedEntities = this.tempEntities.slice(this.page, this.page + 8);
  }

  // Función Buscador Semántico Por Nombre y Apellido
  searchByName($event: any) {
    this.tempEntities = this.arrEntities
    this.search = Helpers.accentRemove($event.target.value)

    this.tempEntities = this.tempEntities.filter(entity =>
      Helpers.accentRemove(entity.nombre.toLowerCase()).includes(this.search.toLowerCase()) || Helpers.accentRemove(entity.apellido.toLowerCase()).includes(this.search.toLowerCase())
    );

    // Mensaje no se encotraron resultados de búsqueda
    this.paginatedEntities = this.tempEntities.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempEntities.length / 8);
    if (this.paginatedEntities.length < 1) this.message = "No existe ningún perfil registrado con ese nombre."
  }

}
