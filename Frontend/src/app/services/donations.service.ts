import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Donation } from '../interfaces/donation.interface';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  private baseUrl: string = 'http://localhost:3000/api/donaciones/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.get<any>(this.baseUrl, httpOptions));
  }

  getById(pId: number): Promise<Donation> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.get<Donation>(`${this.baseUrl}${pId}`, httpOptions));
  }


  create(pForm: Donation): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.post<Donation>(this.baseUrl, pForm, httpOptions))
  }

  edit(pForm: Donation, pId: Number): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.put<Donation>(`${this.baseUrl}${pId}`, pForm, httpOptions))
  }
}
