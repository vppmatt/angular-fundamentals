import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { AccessRecord } from '../data/AccessRecord';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-who-is-in-the-building',
  standalone: true,
  imports: [NgFor],
  templateUrl: './who-is-in-the-building.component.html',
  styleUrl: './who-is-in-the-building.component.css'
})
export class WhoIsInTheBuildingComponent implements OnInit {

  selectedBuilding = "Adel Square";

  accessLogs= signal<AccessRecord[]>([]);

  constructor(private restService: RestService) { }

  ngOnInit(): void {
   this.restService.getAccessLogs(new Date()).subscribe(data => {
      const buildingRecords = data.filter(record => record.building.name === this.selectedBuilding );
      const lastRecordsMap = new Map<number, AccessRecord>();
      buildingRecords.forEach(record => {
        lastRecordsMap.set(record.user.id, record);
      });
      const lastRecords = Array.from(lastRecordsMap.values());
      const insideRecords = lastRecords.filter(record => record.status === true);
      this.accessLogs.set(insideRecords);

    });
  }

}
