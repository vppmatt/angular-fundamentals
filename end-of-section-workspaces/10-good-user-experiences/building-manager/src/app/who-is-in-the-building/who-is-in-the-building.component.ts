import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { AccessRecord } from '../data/AccessRecord';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-who-is-in-the-building',
  standalone: true,
  imports: [NgFor, SpinnerComponent, NgIf],
  templateUrl: './who-is-in-the-building.component.html',
  styleUrl: './who-is-in-the-building.component.css'
})
export class WhoIsInTheBuildingComponent implements OnInit {

  selectedBuilding = "";

  isLoading = false;

  accessLogs = signal<AccessRecord[]>([]);

  constructor(private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedBuilding = params['building'] || "";
      if (this.selectedBuilding !== "") this.getData();
    }); 
  }

  getData() {
    this.isLoading = true;
    this.restService.getAccessLogs(new Date()).subscribe(data => {
      const buildingRecords = data.filter(record => record.building.name === this.selectedBuilding );
      const lastRecordsMap = new Map<number, AccessRecord>();
      buildingRecords.forEach(record => {
        lastRecordsMap.set(record.user.id, record);
      });
      const lastRecords = Array.from(lastRecordsMap.values());
      const insideRecords = lastRecords.filter(record => record.status === true);
      this.accessLogs.set(insideRecords);
      this.isLoading = false;
    });
  }

}
