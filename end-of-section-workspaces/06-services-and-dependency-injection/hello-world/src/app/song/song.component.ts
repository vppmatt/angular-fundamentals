import { Component, Input, OnInit} from '@angular/core';
import { CurrencyPipe, DatePipe, NgIf, NgStyle } from '@angular/common';
import { SongInterface } from '../data/SongInterface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [NgIf, NgStyle, DatePipe, CurrencyPipe],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {

  constructor(private dataService: DataService) { }

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
