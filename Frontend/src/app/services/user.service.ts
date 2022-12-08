import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:3000/api/usuarios/' //--> Hacemos peticiones a través de url de usuarios
  constructor(
    private httpClient: HttpClient,
  ) { }

  // // Método getAll
  getAll(): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl, httpOptions));
  }



  // Método getById
  getById(pId: number): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`, httpOptions));
  }

  // Método getProfile
  getProfile(): Promise<User> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}profile`, httpOptions));
  }

  // Método getProfileByLink
  getProfileByLink(pToken: string): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': pToken
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}profile`, httpOptions));
  }

  // Método edit (editar)
  edit(pForm: User, pId: number): Promise<any> {
    let myToken: string | any = localStorage.getItem('token_madrid_rescate');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': myToken
      })
    }
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}editar/${pId}`, pForm, httpOptions))
  }

  // Método newPassword (nueva contraseña)
  newPassword(pPassword: User, pId: number, pToken: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': pToken
      })
    }
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}new-password/${pId}`, pPassword, httpOptions));

  }

  // Método Reset Password (reseteo contraseña)
  resetPassword(pEmail: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}reset-password/${pEmail}`))
  }

  // Método de Log In (Inicio Sesión)
  login(pFormValue: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}login`, pFormValue, this.getHeaders()));
  }

  // Método Sign Up (Registro)
  register(pFormValue: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<User>(`${this.baseUrl}register`, pFormValue, this.getHeaders()));
  }

  // Método Headers
  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
}

