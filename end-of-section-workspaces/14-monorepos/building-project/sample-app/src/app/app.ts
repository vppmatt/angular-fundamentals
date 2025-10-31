import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Footer } from '@building-project/ui-components';

@Component({
  imports: [NxWelcome, RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'sample-app';
}
