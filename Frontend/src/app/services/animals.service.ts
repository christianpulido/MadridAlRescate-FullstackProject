import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Animal } from '../interfaces/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private baseUrl: string = 'http://localhost:3000/api/animals/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Promise<Animal[]> {
    return lastValueFrom(this.httpClient.get<Animal[]>(this.baseUrl));
  }

  getAllActives(): Promise<Animal[]> {
    return lastValueFrom(this.httpClient.get<Animal[]>(`${this.baseUrl}actives`));
  }


  getById(pId: number): Promise<Animal> {
    return lastValueFrom(this.httpClient.get<Animal>(`${this.baseUrl}${pId}`));
  }

  create(pForm: any): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, pForm, httpOptions))
  }

  edit(pForm: any, pId: number | any): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pId}`, pForm, httpOptions))
  }

  deleteImages(pId: number | any): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}images/${pId}`, '', httpOptions))
  }

  deleteEntity(pId: number | any): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}entity/${pId}`, '', httpOptions))
  }

  sendEmail(pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}info`, pForm, httpOptions))

  }

}

