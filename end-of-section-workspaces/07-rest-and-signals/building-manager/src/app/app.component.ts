import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './rest.service';
import { Building } from './data/Building';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'building-manager';

  constructor(private restService: RestService) {}

  buildings = signal<Building[]>([]);

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }
}
