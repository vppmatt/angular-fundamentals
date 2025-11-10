# Lab 11 - Implementing Routing

## Intro

In this lab we will create a menu and basic navigation. 

## 1. Create the basic routing

1. Create the following components to be displayed on the different pages on our application. Put some suitable text onto the home page and the not-found page. The emergency page will contain the content currently in the app component so you can move this to that new page component, together with the relevant typescript. 

`
ng g c home-page
ng g c emergency-page
ng g c not-found-page
`

2. Define some routes in the app.routes.ts file

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EmergencyPageComponent } from './emergency-page/emergency-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
    {path: "" , component: HomePageComponent},
    {path : "emergency" , component: EmergencyPageComponent},
    {path: "**" , component: NotFoundPageComponent}      
];
```
</details>

3. Create a menu component to navigate through the application with `ng g c menu`

Don't forget to import RouterLink into the component's imports section.

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<h1>Building Management App</h1>
 <nav>
    <a routerLink="">Home</a>
    <a routerLink="emergency">Emergency</a>
</nav>
```
</details>


4. Place the menu and a router outlet onto the app component

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<app-menu></app-menu>
<router-outlet></router-outlet>
```
</details>

7. Test the application in your browser. You can optionally give the menu some styling!

## 2. Create parameterized routes

In this section we will create routes that contain the building name, to allow the emergency page to show the correct building's data. 

1. Add an entry to the application's routes to allow for a variable to be provided, e.g. `/emergency/:building`

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
export const routes: Routes = [
    {path: "" , component: HomePageComponent},
    {path : "emergency" , component: EmergencyPageComponent},
    {path: "emergency/:building", component: EmergencyPageComponent},
    {path: "**" , component: NotFoundPageComponent}      
];
```
</details>


2. In the who-is-in-the-building component, subscribe to the URL, and as the value of building changes use this to change the value of the selected buliding and refresh the data. When the component first loads, if no building is present then don't display any data in the table.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
export class WhoIsInTheBuildingComponent implements OnInit {

  selectedBuilding = "";

  accessLogs = signal<AccessRecord[]>([]);

  constructor(private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedBuilding = params['building'] || "";
      console.log(params);
      if (this.selectedBuilding !== "") this.getData();
    }); 
  }

  getData() {
    this.restService.getAccessLogs(new Date()).subscribe(data => {
      const buildingRecords = data.filter(record => record.building.name === this.selectedBuilding );
      const lastRecordsMap = new Map<number, AccessRecord>();
      buildingRecords.forEach(record => {
        lastRecordsMap.set(record.user.id, record);
      });
      const lastRecords = Array.from(lastRecordsMap.values());
      const insideRecords = lastRecords.filter(record => record.status === true);
      this.accessLogs.set(insideRecords);

    });
  }

}
```
</details>

At this point you can test this by visiting the following URLs in your browser:

- http://localhost:4200/emergency
- http://localhost:4200/emergency/Tinshill%20Rise
- http://localhost:4200/emergency/Adel%20Square

## 3. Implement Programatic navigation

1. In the emergency page, convert the list of buildings into a dropdown list in the HTML. Bind the change event of the list to a funciton that we'll create next

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<select (change)="handleChange($event)">
    <option value="">-- Select a building --</option>
    @for(building of buildings(), track: $index) {
    <option [value]="building.name">
        {{ building.name }}
    </option>
    }
</select>
```
</details>

2. Create the function to handle the building change - when this should be used to change the URL. You'll need to import the Router object.

```typescript
constructor(...  private router : Router) { }

handleChange(event: any) {
    const building = event.target.value;
    this.router.navigate(['emergency', building]);
  }
```

3. Test the changes in your browser.