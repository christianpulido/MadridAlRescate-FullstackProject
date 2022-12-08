import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from 'src/app/interfaces/donation.interface';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.css'],
  providers: [DatePipe]

})
export class DonationEditComponent implements OnInit {

  editDonation: FormGroup;
  id!: number;
  donationToEdit!: Donation;

  constructor(
    private donationsService: DonationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.editDonation = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      cantidad: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),

      fecha: new FormControl('', [
        Validators.required
      ]),
      metodoPago: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)

      ]),
      isTeaming: new FormControl('', [
        Validators.required
      ]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })

    this.donationToEdit = await this.donationsService.getById(this.id);

    this.donationToEdit.fecha = this.datePipe.transform(this.donationToEdit.fecha, 'yyyy-MM-dd')

    this.editDonation = new FormGroup({
      nombre: new FormControl(this.donationToEdit.nombre, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      cantidad: new FormControl(this.donationToEdit.cantidad, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),

      fecha: new FormControl(this.donationToEdit.fecha, [
        Validators.required
      ]),
      metodoPago: new FormControl(this.donationToEdit.metodoPago, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)

      ]),
      isTeaming: new FormControl(this.donationToEdit.isTeaming, [
        Validators.required
      ]),
    })
  }

  async onSubmit(): Promise<any> {
    let response = await this.donationsService.edit(this.editDonation.value, this.id);

    if (response.affectedRows) {
      this.router.navigate(['/cuadro-mandos/donaciones'])

    } else {
      console.log(response)
    }

  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.editDonation.get(pControlName)?.hasError(pError) && this.editDonation.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }
}
