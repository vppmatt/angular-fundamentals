# Lab 4 - Coding Components 1

## Intro

In this lab we will define and use an interface for a custom data type. We will pass data from a parent component to a child component using the HTML of the parent.

We will also create an event emitter to allow a  child component to trigger code in the parent, and bind to the event in the parent's HTML.

## 1. Implement the song voting feature

1. Add a votes field to the SongInterface, of type number.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
export interface SongInterface {
    id : number
    title: string
    artist: string
    dateReleased: Date
    price: number
    votes: number
}
```
</details>

2. Adjust all the instances of the SongInterface to provide the value "0" for the votes field.

3. Create a method in the song-list component to record a vote for a song. Note that for now we have 3 separate variables - we will convert this to an array later, so do not worry about the code being optimised.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
export class SongListComponent {

  song1 : SongInterface = {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99, votes:0};
  song2 : SongInterface = {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99, votes:0};
  song3 : SongInterface = {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99, votes:0};

  vote(id :number) : void {
    if (id == 1) {
      this.song1.votes += 1;
    } else if (id == 2) {
      this.song2.votes += 1;
    } else if (id == 3) {
      this.song3.votes += 1;
    }
  }
}
```
</details>

4. Create an event emitter in the song component to allow a new numeric event to be fired called voteUp

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  @Output()
  voteUp = new EventEmitter<number>();
```
</details>

5. Create a function in the song component which will fire the voteUp event

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  clickVoteUp() {
    this.voteUp.emit(this.song.id);
  }
```
</details>

6. Create a button on the song component which when clicked will bind to the function you just created. 

7. Display the number of votes in the song component

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<li> 
    ID: {{song.id}}  TITLE: {{song.title}}  ARTIST: {{song.artist}} VOTES: {{song.votes}}  <button (click)="clickVoteUp()">vote</button>
</li>
```
</details>

8. In the song-list, bind the voteUp event of the song component to the vote function you created (note that you pass data through with $event)

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<ul>
    <app-song [song]="song1" (voteUp)="vote($event)"></app-song>
    <app-song [song]="song2" (voteUp)="vote($event)"></app-song>
    <app-song [song]="song3" (voteUp)="vote($event)"></app-song>
</ul>
```
</details>
9. Test the application in the browser!