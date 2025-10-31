import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { GreetingComponent } from './greeting/greeting.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GreetingComponent, SongListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Song List App';
  
  constructor() { 
  }
}
