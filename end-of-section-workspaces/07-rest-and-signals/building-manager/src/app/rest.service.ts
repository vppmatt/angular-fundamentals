import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from './data/Building';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  getBuildings() : Observable<Building[]> {
    return this.httpClient.get<Building[]>('http://localhost:8080/api/building');
  }

}
