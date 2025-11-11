import { Component, Input, OnInit, inject} from '@angular/core';
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
