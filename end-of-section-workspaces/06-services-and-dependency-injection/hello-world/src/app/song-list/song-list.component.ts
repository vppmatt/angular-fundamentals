import { Component, ViewChild, ViewChildren, inject } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { NgStyle } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongComponent, NgStyle],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

  public dataService = inject(DataService);

  ulStyle = {
    'list-style-type': 'none',
    padding: '0'
  };

}
