import { Component, OnInit, signal , inject} from '@angular/core';
import { RestService } from '../rest.service';
import { AccessRecord } from '../data/AccessRecord';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-who-is-in-the-building',
  standalone: true,
  imports: [],
  templateUrl: './who-is-in-the-building.component.html',
  styleUrl: './who-is-in-the-building.component.css'
})
export class WhoIsInTheBuildingComponent implements OnInit {

  selectedBuilding = "";

  accessLogs = signal<AccessRecord[]>([]);

  private restService = inject(RestService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedBuilding = params['building'] || "";
      if (this.selectedBuilding !== "") this.getData();
    }); 
  }

  getData() {
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
