# Lab 15 - Post and put

## Intro

In this lab we will implement post and put rest methods

## 1. POST a new user

1. Create a new method in the rest service to allow a new user to be added.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  addUser(user: {firstname: string, surname: string}) : Observable<{id: number, firstname: string, surname: string}> {
    return this.httpClient.post<{id: number, firstname: string, surname: string}>(`${this.serverUrl}/api/user`, user);
  }
```
</details>

2. Call this method in the new user component. When the method is called a spinner should be showed. When the method returns, display a message indicating whether the user was added (and if so what their ID is) or if an error occurred.

<details>
<summary>
Click here to see the sample solution
</summary>
```
export class NewUserComponent {

  constructor(private restService: RestService) { }

  firstname: string = '';
  surname: string = '';

  saving: boolean = false;
  message: string = '';

  onSubmit() {
    this.saving = true; 
    this.restService.addUser({ firstname: this.firstname, surname: this.surname }).subscribe({
      next: (response) => {
        this.message = 'User added successfully with id :' + response.id;
        this.saving = false;
      },
      error: (error) => {
        this.message = 'Error adding user: ' + error.message;
        this.saving = false;
      }
    });
  }

}
```

```
<h2>New User</h2>

<app-spinner *ngIf="saving"></app-spinner>

<form (submit)="onSubmit()">
    <label for="firstname">First name:</label>
    <input id="firstname" name="firstname" type="text" [(ngModel)]="firstname" required />

    <label for="surname">Surname:</label>
    <input id="surname" name="surname" type="text" [(ngModel)]="surname" required />

    <button type="submit">Add User</button> 
</form>

<p *ngIf="message">{{ message }}</p>
```
</details>

## 3. PUT an updated building

1. Create a new method in the rest service to allow a building to be updated.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  editBuilding(building : Building) : Observable<Building> {
    return this.httpClient.put<Building>(`${this.serverUrl}/api/building/${building.id}`, building);
  }
```
</details>

2. Call this method in the edit building component. When the method is called a spinner should be showed. When the method returns, display a message if an error occurred. If everything was ok, then reload the list of buildings to display on this screen

<details>
<summary>
Click here to see the sample solution
</summary>

```
import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent implements OnInit {

  buildings = signal<Building[]>([]);

  saving : boolean = false;
  message : string = "";

  constructor(private restService : RestService) { }

  selectedBuildingId : number | null = null;

  editForm = new FormGroup({
    id: new FormControl('id'),
    name: new FormControl('name'),
  })

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

  handleClick(id :number) {
    this.selectedBuildingId = id;
    this.editForm.patchValue({
      id: "" + id,
      name: this.buildings().find(b => b.id === id)?.name
    })
  }

  onSubmit() {
    this.saving = true;
    const buildingToUpdate : Building = {
      id: +(this.editForm.value.id || 0),
      name: this.editForm.value.name || ""
    }

    this.restService.editBuilding(buildingToUpdate).subscribe({
      next: (response) => {
        console.log(response);
        this.message = '';
        this.restService.getBuildings().subscribe(data => {
          this.buildings.set(data);
          this.saving = false;
        });
        
      },
      error: (error) => {
        this.message = 'Error updating building: ' + error.message;
        this.saving = false;
      }
    });
  }

}
```

```
<h2>Select the building to edit</h2>
<ul>
    <li *ngFor="let building of buildings()">
        {{ building.name }} <button (click)="handleClick(building.id)"  >edit</button>
    </li>
</ul>

<form *ngIf="selectedBuildingId" [formGroup]="editForm" (submit)="onSubmit()">
    
    <input type="hidden" id="id" name="id" formControlName="id" />

    <label>
        Name:
        <input id="name" name="name" formControlName="name"/>
    </label>
    
    <button>Save Changes</button>

</form>
<app-spinner *ngIf="saving"></app-spinner>
```
</details>

