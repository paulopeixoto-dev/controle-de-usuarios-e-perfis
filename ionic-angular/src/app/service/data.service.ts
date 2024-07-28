import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpClient = inject(HttpClient);

  login(data): Observable<any> {

    let info = {
      "user":       data.value.user,
      "password":   data.value.password
  }
    return this.httpClient.post(`${environment.baseUrl}/auth/login`, info)
  }

  register(data): Observable<any> {

    let info = {
        "name":       data.value.name,
        "user":       data.value.user,
        "password":   data.value.password
    }

    return this.httpClient.post(`${environment.baseUrl}/auth/register`, info)

  }

}
