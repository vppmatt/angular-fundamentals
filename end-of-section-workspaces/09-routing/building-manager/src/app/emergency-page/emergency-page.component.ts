import { Component, OnInit, signal } from '@angular/core';
import { WhoIsInTheBuildingComponent } from '../who-is-in-the-building/who-is-in-the-building.component';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-page',
  standalone: true,
  imports: [WhoIsInTheBuildingComponent],
  templateUrl: './emergency-page.component.html',
  styleUrl: './emergency-page.component.css'
})
export class EmergencyPageComponent implements OnInit {

constructor(private restService: RestService, private router : Router) {}

  buildings = signal<Building[]>([]);

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

  handleChange(event: any) {
    const building = event.target.value;
    this.router.navigate(['emergency', building]);
  }
}
