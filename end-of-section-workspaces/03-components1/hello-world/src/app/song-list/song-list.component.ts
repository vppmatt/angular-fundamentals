import { Component } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { SongInterface } from '../data/SongInterface';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

song1 : SongInterface = {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99};
song2 : SongInterface = {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99};
song3 : SongInterface = {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99};

}
