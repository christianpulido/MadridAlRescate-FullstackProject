import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Entity } from '../interfaces/entity.interface';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  private baseUrl: string = "http://localhost:3000/api/perfil/";

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

    return lastValueFrom(this.httpClient.get<Entity[]>(this.baseUrl, httpOptions));
  }

  getById(pId: number): Promise<Entity> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.get<Entity>(`${this.baseUrl}${pId}`, httpOptions))
  }

  edit(pForm: Entity, pId: number): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.put<Entity>(`${this.baseUrl}${pId}`, pForm, httpOptions));
  }

  create(pForm: Entity): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }

    return lastValueFrom(this.httpClient.post<Entity>(`${this.baseUrl}`, pForm, httpOptions));
  }
}
