import { Component, ViewChild, ViewChildren } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { NgFor, NgStyle } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongComponent, NgFor, NgStyle],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

  constructor(public dataService: DataService) {   
  }

  ulStyle = {
    'list-style-type': 'none',
    padding: '0'
  };

}
