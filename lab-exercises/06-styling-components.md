# Lab 6 - Styling Components

## Intro

In this lab we will see how to apply styling to components

## 1. Apply styling 

1. In the song component, if the isTopSong is true, make the row appear in red text. If it's false, make it appear in blue text. Don't forget to import NgStyle

<details>
<summary>
Click here to see the sample solution
</summary>

```html
  <li [ngStyle]="{color : isTopSong ? 'red' : 'blue'}" > 
  ...
  </li>
```
</details>

2. Make the words "TOP SONG!" appear in bold (note this is regular html!)

3. In the song list component, create a class level variable to define a style for the unordered list:

```typescript
  ulStyle = {
    'list-style-type': 'none',
    padding: '0'
  };
```

 Adjust the HTML in the song-list component to use this style for the ul

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<ul [ngStyle]="ulStyle">
       @for(song of songs; track: song.id) {
        <app-song [song]="song" [voteUp]="vote($event)"></app-song>
    }
</ul>
```
</details>

4. In the App component's css file, define 2 css classes for dark and light mode:

```css
.dark-mode {
    background-color: #333;
    color: white;
}

.light-mode {
    background-color: #f9f9f9;
    color: black;
}
```

5. Create a class level variable in the app component called mode, with a default value of "light". Add in a function which when called will switch the value.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
   mode = 'light';

  switchMode() {
    this.mode = this.mode === 'light-mode' ? 'dark-mode' : 'light-mode';
  }
```
</details>

6. Add a button to the app component to switch between light and dark mode. 

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<button (click)="switchMode()">Switch to {{mode === 'light-mode' ? 'dark' : 'light'}} mode</button>
```
</details>

7. Apply the relevant style to the div using NgClass

<details>
<summary>
Click here to see the sample solution
</summary>

```
<div [ngClass]="mode"  >
```
</details>


8. Test the application in the browser!

## 2. Use Pipes

1. In the song component, add the date and the price into the output. Display the price with a EUR symbol. The date should be formatted as dd/MM/yyyy

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<li [ngStyle]="{color : isTopSong ? 'red' : 'blue'}" > 
    @if(isTopSong) {
     <b>TOP SONG!</b>
    }
    ID: {{song.id}}  TITLE: {{song.title}}  ARTIST: {{song.artist}} VOTES: {{song.votes}}
    PRICE: {{song.price | currency:'EUR': 'symbol':'1.2-2'}} 
    DATE RELEASED: {{song.dateReleased | date:'dd/MM/yyyy'}}
    <button (click)="clickVoteUp()">vote</button>
</li>
```
</details>
