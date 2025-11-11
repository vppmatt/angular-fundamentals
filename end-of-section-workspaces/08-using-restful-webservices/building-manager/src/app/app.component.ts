import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './rest.service';
import { Building } from './data/Building';
import { WhoIsInTheBuildingComponent } from './who-is-in-the-building/who-is-in-the-building.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WhoIsInTheBuildingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'building-manager';

  private restService = inject(RestService);

  buildings = signal<Building[]>([]);

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }
}
