import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SongInterface } from '../data/SongInterface'
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
@Component({
  selector: 'app-song',
  standalone: true,
  imports: [NgStyle, DatePipe, CurrencyPipe],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
  @Input({required: true}) song!: SongInterface;

  @Input() isTopSong: boolean = false;

  @Output()
  voteUp = new EventEmitter<number>();

  clickVoteUp() {
    this.voteUp.emit(this.song.id);
  }

}
