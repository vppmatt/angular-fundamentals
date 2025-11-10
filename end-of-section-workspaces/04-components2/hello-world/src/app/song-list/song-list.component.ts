import { Component, ViewChild, ViewChildren } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { SongInterface } from '../data/SongInterface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongComponent, NgStyle],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

  ulStyle = {
    'list-style-type': 'none',
    padding: '0'
  };

  songs : SongInterface[]  = [
    {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99, votes:0},
    {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99, votes:0},
    {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99, votes:0}
  ];

  @ViewChildren(SongComponent)
  songComponents!: SongComponent[];

  vote(id :number) : void {
    this.songs.find(song => song.id === id)!.votes += 1;

    const maxVotes = Math.max(...this.songs.map(song => song.votes));

    this.songComponents.forEach(songComp => songComp.isTopSong = maxVotes === songComp.song.votes);

  }
}
