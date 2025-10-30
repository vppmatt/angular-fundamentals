# Lab 2 - Creating a Component

## Intro

In this lab we will create a component and display it on the page.

## 1. Start the Angular development webserver

The development webserver can be left running, and will automatically update the browser as you code. 

1. If you do not have the server running, enter the following into a terminal window in the IDE:

```
ng serve
```

2. When the server tells you that the site is ready to view, **open your browser** and visit the URL that is presented (probably http://localhost:4200)

## 2. Create a new component

1. Create a new component called song-list with the following command:

```
ng g c song-list
```

2. Review the files that have been created - note that the value of the selector in the .ts file is app-song-list.

3. Import the song-list component into the app component so that it can be used here (remember the app component is the one that gets rendered by default when you visit the web page). In app.component.ts, the imports section should include SongListComponent. This should also be included in the imports at the top of the file.

<details>
<summary>
Click here to view a sample of the solution
</summary>

**app.component.ts**
```
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SongListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    ...
```
</details>

4. Display the song list on the web page by replacing the content of app.component.html to:

```
<div>
  <h1>Welcome to the Song Library</h1>
  <app-song-list></app-song-list>
</div>
```

4. Visit the web page in your browser and check it works.


## 3. Create and re-use components

1. Create a new component called song

<details>
<summary>
Click here to view the required command
</summary>

```
ng g c song
```
</details>


2. Place 3 instances of the song component onto the Song list component. Don't forget you need to import it in the song-list typescript file!

<details>
<summary>
Click here to view the sample solution
</summary>

**song-list-component.html**
```
<p>song-list works!</p>

<app-song></app-song>
<app-song></app-song>
<app-song></app-song>
```

**song-list.component.ts**
```
import { Component } from '@angular/core';
import { SongComponent } from '../song/song.component';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

}
```
</details>

3. Ensure that the 3 instances of the song component are displayed on the page. 
