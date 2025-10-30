# Lab 14 - Reactive forms

## Intro

In this lab we will create a form to allow a building name to be edited

## 1. Create a new component and add it to the menu / navigation

1. Create a component to edit a building

2. Add a route to display the edit building component, and a menu link.

## 2. Get the list of buildings

1. In the new edit-building component, get a list of buildings and populate these as an unordered list. Each entry should have an edit button.


<details>
<summary>
Click here to see the sample solution
</summary>

```
import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [NgFor],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent implements OnInit {

  buildings = signal<Building[]>([]);

  constructor(private restService : RestService) { }

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

}
```

```
<h2>Select the building to edit</h2>
<ul>
    <li *ngFor="let building of buildings()">
        {{ building.name }} <button>edit</button>
    </li>
</ul>
```


</details>

3. Create a function to handle the click buttons and bind these to the button click events. The function should store the selected user's id in a class level

<details>
<summary>
Click here to see the sample solution
</summary>

```
  selectedBuildingId : number | null = null;

  handleClick(id :number) {
    console.log("edit building with id: " + id);
    this.selectedBuildingId = id;
  }
```

```
<button (click)="handleClick(building.id)"  >edit</button>
```
</details>

3. Create an edit form on the HTML - only show this if there is a selected building. 

```
<form *ngIf="selectedBuildingId">
    
    <input type="hidden" id="id" name="id"/>

    <label>
        Name:
        <input id="name" name="name"/>
    </label>
    
    <button>Save Changes</button>

</form>
```

4. Create a FormGroup to represent the building. Ensure you import the ReactiveFormsModule into the component

<details>
<summary>
Click here to see the sample solution
</summary>

```
   editForm = new FormGroup({
    id: new FormControl('id'),
    name: new FormControl('name'),
  })
```
</details>

5. Populate the form with data - when the user clicks to edit a building, use the ID to retrieve the building name and patch these into the form group.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  handleClick(id :number) {
    this.selectedBuildingId = id;
    this.editForm.patchValue({
      id: "" + id,
      name: this.buildings().find(b => b.id === id)?.name
    })
  }
```
</details>

5. Create a function to bind to the submit event of the form, and make the binding. For now, just log out the new data

<details>
<summary>
Click here to see the sample solution
</summary>

```
  onSubmit() {
    console.log("Submitting form", this.editForm.value);
  }
```

```
<form *ngIf="selectedBuildingId" [formGroup]="editForm" (submit)="onSubmit()">
```
</details>

6. Test this in your browser.
