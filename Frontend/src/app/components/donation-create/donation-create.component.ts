import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-donation-create',
  templateUrl: './donation-create.component.html',
  styleUrls: ['./donation-create.component.css']
})
export class DonationCreateComponent implements OnInit {

  createDonation: FormGroup;

  constructor(
    private donationsService: DonationsService,
    private router: Router
  ) {
    this.createDonation = new FormGroup({
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

  ngOnInit(): void {
  }

  async onSubmit(): Promise<any> {
    let response = await this.donationsService.create(this.createDonation.value);

    if (response.id_donaciones) {
      this.router.navigate(['/cuadro-mandos/donaciones']);

    } else {
      console.log(response);
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.createDonation.get(pControlName)?.hasError(pError) && this.createDonation.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

}
