import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})



export class ApiService {

  httpClient = inject(HttpClient);

  validateToken(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/auth/validate`);
  }

  login(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/login`, user)
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/register`, user)
  }

  updateUser(user: User, id): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/users/update/${id}`, user)
  }

  deleteUser(id): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/users/delete/${id}`)
  }

  getAllUser(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/getall`)
  }

}
