import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import Helpers from 'src/app/libs/Helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  authorizated!: boolean;
  allUsers: User[] = []
  tempUsers: User[] = []
  paginatedUsers: User[] = []

  search!: string;
  page: number = 0;
  totalPages!: number;
  message!: string;
  message1!: string;

  constructor(
    private usersService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getAll();
    if (response.error) {
      this.authorizated = false;
      this.message1 = "Este apartado solo está disponible para los administradores.";
    } else {
      this.authorizated = true;
      this.allUsers = response;
    }
    this.tempUsers = [...this.allUsers];
    this.paginatedUsers = this.tempUsers.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempUsers.length / 8);
  }

  // Función página siguiente
  next(): void {
    this.page += 8;
    this.paginatedUsers = this.tempUsers.slice(this.page, this.page + 8);
  }

  // Función página previa
  prev(): void {
    this.page -= 8;
    this.paginatedUsers = this.tempUsers.slice(this.page, this.page + 8);
  }

  // Función Buscador Semántico Por Nombre y Apellido
  searchByName($event: any) {
    this.tempUsers = this.allUsers
    this.search = Helpers.accentRemove($event.target.value)

    if (this.search) {
      this.tempUsers = this.tempUsers.filter(entity =>
        Helpers.accentRemove(entity.nombre.toLowerCase()).includes(this.search.toLowerCase()) || Helpers.accentRemove(entity.apellido.toLowerCase()).includes(this.search.toLowerCase())
      );

      // Mensaje no se encotraron resultados de búsqueda
      this.paginatedUsers = this.tempUsers.slice(this.page, this.page + 8);
      this.totalPages = Math.ceil(this.tempUsers.length / 8);
      if (this.paginatedUsers.length < 1) this.message = "Lo sentimos, no hay ningún usuario registrado con ese nombre"

    }
  }
}
