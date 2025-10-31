import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from './data/Building';
import { environment } from '../environments/environment';
import { AccessRecord } from './data/AccessRecord';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  serverUrl = environment.serverUrl;

  getBuildings() : Observable<Building[]> {
        return this.httpClient.get<Building[]>(`http://localhost:8080/api/building`);
  }

  getAccessLogs(date: Date) : Observable<AccessRecord[]> {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    return this.httpClient.get<AccessRecord[]>(`${this.serverUrl}/api/logs/${formattedDate}?all=true`);
  }

}
