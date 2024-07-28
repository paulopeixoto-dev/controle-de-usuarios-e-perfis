import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

type ApiResponse = { page: number, per_page: number, total: number, total_pages: number, results: Product[] }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpClient = inject(HttpClient);

  getAll(): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.get<ApiResponse>(`${environment.baseUrl}/`)
    )
  }

}
