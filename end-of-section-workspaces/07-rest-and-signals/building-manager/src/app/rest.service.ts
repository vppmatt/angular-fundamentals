import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from './data/Building';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private httpClient = inject(HttpClient);

  getBuildings() : Observable<Building[]> {
    return this.httpClient.get<Building[]>('http://localhost:8080/api/building');
  }

}
