import { EventEmitter, Injectable } from '@angular/core';
import { SongInterface } from './data/SongInterface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

    private songs : SongInterface[]  = [
      {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99, votes:0},
      {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99, votes:0},
      {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99, votes:0}
    ];

    votesHaveChanged = new EventEmitter<void>();

    getSongs() : SongInterface[] {
      return this.songs;
    }

    recordVote(id :number) : void {
      this.songs.find(song => song.id === id)!.votes += 1;
      this.votesHaveChanged.emit();
    }

    isTopSong(id: number) : boolean {
      const maxVotes = Math.max(...this.songs.map(song => song.votes));
      if (maxVotes === 0) {
        return false;
      }
      return this.songs.find(song => song.id === id)!.votes === maxVotes;
    }

    

}
