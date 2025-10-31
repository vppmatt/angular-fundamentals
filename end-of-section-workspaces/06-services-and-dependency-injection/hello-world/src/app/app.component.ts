import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { GreetingComponent } from './greeting/greeting.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GreetingComponent, SongListComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'Song List App';

  mode = 'light-mode';

  ngOnInit() {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      this.mode = savedMode;
    }
  }

  switchMode() {
    this.mode = this.mode === 'light-mode' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', this.mode);
  }
  
  constructor() { 
  }
}
