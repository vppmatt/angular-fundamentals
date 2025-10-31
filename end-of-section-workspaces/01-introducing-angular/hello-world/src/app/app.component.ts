import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'hello-world';
  readonly name = 'Matt';

  constructor() {
    const localTitle = this.title;
    this.title = "new title";
    console.log("localTitle", localTitle);
    console.log("title", this.title);
    console.log("name", this.name);
    //this.name = "matt2";
    let name = this.name.replace("Matt", "Matthew");
    name = name.toUpperCase();
    console.log("name", name);
    this.myFunction();
  }

  myFunction(): void {
    console.log("myFunction");
  }
}
