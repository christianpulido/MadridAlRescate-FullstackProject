import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/interfaces/donation.interface';
import Helpers from 'src/app/libs/Helpers';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  authorizated!: boolean;
  arrDonations: Donation[] = [];
  tempDonations: Donation[] = [];
  paginatedDonations: Donation[] = [];

  search!: string;
  page: number = 0;
  totalPages!: number;
  message!: string;
  message1!: string;

  constructor(
    private donationService: DonationsService
  ) { }

  async ngOnInit(): Promise<void> {
    let response = await this.donationService.getAll();
    if (response.error) {
      this.authorizated = false;
      this.message1 = "Este apartado solo está disponible para los administradores.";
    } else {
      this.authorizated = true;
      this.arrDonations = response;
    }
    this.tempDonations = [...this.arrDonations];
    this.paginatedDonations = this.tempDonations.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempDonations.length / 8);
  }

  // Funciones Siguiente/Previa Página
  next(): void {
    this.page += 8;
    this.paginatedDonations = this.tempDonations.slice(this.page, this.page + 8);
  }

  prev(): void {
    this.page -= 8;
    this.paginatedDonations = this.tempDonations.slice(this.page, this.page + 8);
  }

  // Función Buscador Semántico Por Nombre
  searchByName($event: any) {
    this.tempDonations = this.arrDonations
    this.search = Helpers.accentRemove($event.target.value)

    this.tempDonations = this.tempDonations.filter(entity =>
      Helpers.accentRemove(entity.nombre.toLowerCase()).includes(this.search.toLowerCase())
    );

    this.paginatedDonations = this.tempDonations.slice(this.page, this.page + 8);
    this.totalPages = Math.ceil(this.tempDonations.length / 8);
    if (this.paginatedDonations.length < 1) this.message = "Lo sentimos, no hay donadores registrados con ese nombre"
  }


}
