import { Component, Input } from '@angular/core';
import { SongInterface } from '../data/SongInterface'
@Component({
  selector: 'app-song',
  standalone: true,
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
  @Input({required: true}) song!: SongInterface;

}
