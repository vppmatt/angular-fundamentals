# Lab 5 - Coding Components 2

## Intro

In this lab we will pass data from a parent component to a child component using the typescript of the parent.

## 1. Implement the "top song" feature

1. Add a boolean class level variable to the Song component called `isTopSong`. The value of this variable is going to be set by its parent. It will be an optional variable, so give it a default value of false.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  @Input() isTopSong: boolean = false;
```
</details>

2. In the song-list component, define 3 variables of type SongComponent to represent the 3 components in the HTML. These should be annotated with @ViewChild - give each one a name (template reference) in the annotation.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  @ViewChild('songComponent1')
  songComponent1! : SongComponent;

  @ViewChild('songComponent2')
  songComponent2! : SongComponent;

  @ViewChild('songComponent3')
  songComponent3! : SongComponent;
```
</details>

3. Adjust the HTML in the song-list component by adding in the template references to each of the song component instances

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<ul>
    <app-song [song]="song1" (voteUp)="vote($event)" #songComponent1></app-song>
    <app-song [song]="song2" (voteUp)="vote($event)" #songComponent2></app-song>
    <app-song [song]="song3" (voteUp)="vote($event)" #songComponent3></app-song>
</ul>
```
</details>

4. In the song-list component's vote function, work out which of the songs has the higest score and then set the isTopSong value appropraitely. Do not worry about this being optimised code!

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  vote(id :number) : void {
    if (id == 1) {
      this.song1.votes += 1;
    } else if (id == 2) {
      this.song2.votes += 1;
    } else if (id == 3) {
      this.song3.votes += 1;
    }

    const maxVotes = Math.max(this.song1.votes, this.song2.votes, this.song3.votes);

    this.songComponent1.isTopSong = (this.song1.votes == maxVotes);
    this.songComponent2.isTopSong = (this.song2.votes == maxVotes);
    this.songComponent3.isTopSong = (this.song3.votes == maxVotes);

  }
```
</details>


## 2. Conditions - @if

1. In the song component's html, display the words "TOP SONG!" if this is a top song. 

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<li> 
    @if(isTopSong) {
       TOP SONG!
    }
</li>
```

</details>

2. Test the application in the browser!

## 3. Looping - @for

We are now going to convert our 3 separate songs into an array of songs and loop through the array.

1. In the song-list component typescript file, Convert the data into an array of songs

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
songs : SongInterface[]  = [
    {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99, votes:0},
    {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99, votes:0},
    {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99, votes:0}
  ];
```
</details>

2. Change the instances of the SongComponent object into an array - annotate this with @ViewChildren. No template reference is needed any more, but the ViewChildren decorator can take a parameter with the object type.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
@ViewChildren(SongComponent)
  songComponents!: SongComponent[];
```
</details>

3. Adjust the vote function to work with the array

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  vote(id :number) : void {
    this.songs.find(song => song.id === id)!.votes += 1;

    const maxVotes = Math.max(...this.songs.map(song => song.votes));

    this.songComponents.forEach(songComp => songComp.isTopSong = maxVotes === songComp.song.votes);

  }
```
</details>

4. In the song-list html, replace the 3 app-song components with the array using @for.

<details>
<summary>
Click here to see the sample solution
</summary>

```html
  <ul>
    @for(song of songs; track song.id) {
        <app-song [song]="song" (voteUp)="vote($event)" ></app-song>
    }
</ul>
```
</details>

5. Test the application in the browser!