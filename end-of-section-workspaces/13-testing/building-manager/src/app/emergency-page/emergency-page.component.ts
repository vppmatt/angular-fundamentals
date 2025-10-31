import { Component, OnInit, signal } from '@angular/core';
import { WhoIsInTheBuildingComponent } from '../who-is-in-the-building/who-is-in-the-building.component';
import { NgFor, NgIf } from '@angular/common';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-emergency-page',
  standalone: true,
  imports: [WhoIsInTheBuildingComponent, NgFor, NgIf, SpinnerComponent],
  templateUrl: './emergency-page.component.html',
  styleUrl: './emergency-page.component.css'
})
export class EmergencyPageComponent implements OnInit {

constructor(private restService: RestService, private router : Router) {}

  buildings = signal<Building[]>([]);

  errorMessage = "";
  isLoading = true;

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(
      {
        next: data => {
          this.buildings.set(data);
          this.isLoading = false;   
        },
        error: error => {
          this.errorMessage = `Failed to load buildings data. ${error.message}`;
          this.isLoading = false;   
        }
      }
    )};

  handleChange(event: any) {
    const building = event.target.value;
    this.router.navigate(['emergency', building]);
  }
}
