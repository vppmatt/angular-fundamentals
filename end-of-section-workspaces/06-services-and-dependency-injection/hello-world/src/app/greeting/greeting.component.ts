import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {

  @Input({required: true}) name!: string;
  @Input({required: true}) age!: number;
}
