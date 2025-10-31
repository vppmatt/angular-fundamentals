# Lab 3 - Working With Variables

## Intro

In this lab we will define and use an interface for a custom data type, and see how to do basic data binding in components

## 1. Create an interface

1. Create a new folder called `data`.

2. Inside this folder create a file called `SongInterface.ts` with the following content;
 
```typescript
export interface SongInterface {
    id : number
    title: string
    artist: string
    dateReleased: Date
    price: number
}
```

**Note that you would normally note use the word "Interface" in the file / object name, however because we have a component also called Song, we are doing so in this example to keep things clear*

## 2. Create objects from the interface

1. In the song-list component, create 3 objects called song1, song2, song3, using the interface.

<details>
<summary>
Click here to see a sample solution
</summary>

```typescript
export class SongListComponent {
    song1 : SongInterface = {id: 1, title:"Billie Jean", artist: "Michael Jackson", dateReleased: new Date(1983,1,2), price: 10.99};

    song2 : SongInterface = {id: 2, title:"I don't wanna miss a thing", artist: "Aerosmith", dateReleased: new Date(1998,5,2), price: 9.99};

    song3 : SongInterface = {id: 3, title:"My heart will go on", artist: "Celine Dion", dateReleased: new Date(1997,11,19), price: 7.99};

}
```
</details>

## 3. Make a component property

1. Adjust the song component so that it has a required parameter of type SongInterface

<details>
<summary>
Click here for a sample solution
</summary>

```typescript
export class SongComponent {
  @Input({required: true}) song!: SongInterface;

}
```
</details>


2. Edit the song component's HTML so that it renders the id, title and author inside an `li` tag.

<details>
<summary>
Click here for a sample solution
</summary>

```html
<li> 
    ID: {{song.id}}  TITLE: {{song.title}}  ARTIST: {{song.artist}}
</li>
```
</details>

## 4. Pass data into a component

1. Edit the song-list component's html so that the song objects bind the song property to each of the song parameters.

2. Wrap the output in a `ul` tag

<details>
<summary>
Click here for a sample solution
</summary>

```html
<ul>
    <app-song [song]="song1"></app-song>
    <app-song [song]="song2"></app-song>
    <app-song [song]="song3"></app-song>
</ul>
```
</details>