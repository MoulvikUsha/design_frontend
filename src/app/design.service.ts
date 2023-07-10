import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(private http: HttpClient) { }

  postCustomers(customerForm): Observable<any> {
    return this.http.post<any>(`${environment.nodeApiUrl}/customers`, customerForm);
  }
}
