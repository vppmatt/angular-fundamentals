# Lab 8 - Services and Dependency Injection

## Intro

In this lab we will create a service and inject it into 2 separate components. This will allow us to refactor our code so that:
- all the data and management of the list of songs is in 1 place

## 1. Create a service

1. Create a new service to store the data being used in our application with 

`
ng g s data
`

2. Move the array of songs from the song-list component into the data service. Make it private so that it cannot be accessed directly.

3. Create methods in the data service to:
- retrieve the list of songs
- record a vote for a song
- find out whether a particular song is a top song or not (method should take the id and return a boolean)

4. Create an event emitter in the data service to notify subscribers that the votes have changed. This does not need to send out any data.

Call the emit event in the method that records a change to the votes.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
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

```
</details>

## 2. Inject and use the service in the song-list component

1. In the song-list component, inject the data service. It must be made public as we will access it from the HTML.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  public dataService = inject(DataService);
```
</details>

2. Adjust the HTML in the song-list component so that the data is sourced from the data service

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<ul [ngStyle]="ulStyle">
        @for(song of dataService.getSongs(); track song.id) {
        <app-song [song]="song" voteUp="vote($event)"></app-song>
    }
</ul>
```
</details>

3. Remove the vote function from the song-list component - this is no longer needed. You can also alter the HTML so that this is no longer bound to song component's voteUp event. As a result you also no longer need the reference to the song components in the typescript.

<details>
<summary>
The song-list component should now look like this
</summary>

```typescript
import { Component, ViewChild, ViewChildren } from '@angular/core';
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
```

```html
<ul [ngStyle]="ulStyle">
    @for(song of dataService.getSongs(); track song.id) {
        <app-song [song]="song" ></app-song>
    }
</ul>
```
</details>

## 3. Inject and use the service in the song component

1. Inject the data service into the song component

2. Remove the @Input annotation from the property isTopSong and the voteUp event emitter from the Song component.

3. In the method that is executed when a user votes for a song, call the data service's recordVote method.

4. Implement the OnInit function and use it to first determine the value of isTopSong, and then to subscribe to the data service's votesHaveChanged event.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
import { Component, Input, OnInit} from '@angular/core';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { SongInterface } from '../data/SongInterface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [NgStyle, DatePipe, CurrencyPipe],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {

  private dataService = inject(DataService);

  @Input({required: true}) song!: SongInterface;

  isTopSong : boolean = false;

  ngOnInit() {
    this.isTopSong = this.dataService.isTopSong(this.song.id);
    this.dataService.votesHaveChanged.subscribe(() => {
      this.isTopSong = this.dataService.isTopSong(this.song.id);
    }); 
  }

  clickVoteUp() {
    this.dataService.recordVote(this.song.id);
  }

}

```
</details>

5. Test the application in the browser!