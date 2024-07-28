import { HttpClient } from '@angular/common/http';
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

  login(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/login`, user)
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/register`, user)
  }

}
