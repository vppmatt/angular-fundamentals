# Lab 12 - Error Handling and Slow Connections

## Intro

In this lab we will ensure a good user experience by making it clear when the application is getting data, and handling the case where the server doesn't respond

## 1. Create a spinner

1. Create a component to display a spinner on screen

`
ng g c spinner
`

2. Set the HTML for this component to:

```html
<svg width="48" height="48" viewBox="0 0 48 48" aria-label="Loading..." role="img">
    <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="#1976d2"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="100"
        stroke-dashoffset="60"
    >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="1s"
            repeatCount="indefinite"
        />
    </circle>
</svg>

```

## 2. Display a spinner while data is loading

1. In the who-is-in-the-building component, set a class level variable called isLoading with a default value of false. 

2. When we call the getData method, set the value of isLoading to true.

3. When we set the accessLogs data, set the value of isLoading to false.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { AccessRecord } from '../data/AccessRecord';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-who-is-in-the-building',
  standalone: true,
  imports: [],
  templateUrl: './who-is-in-the-building.component.html',
  styleUrl: './who-is-in-the-building.component.css'
})
export class WhoIsInTheBuildingComponent implements OnInit {

  selectedBuilding = "";

  isLoading = false;

  accessLogs = signal<AccessRecord[]>([]);

  constructor(private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedBuilding = params['building'] || "";
      if (this.selectedBuilding !== "") this.getData();
    }); 
  }

  getData() {
    this.isLoading = true;
    this.restService.getAccessLogs(new Date()).subscribe(data => {
      const buildingRecords = data.filter(record => record.building.name === this.selectedBuilding );
      const lastRecordsMap = new Map<number, AccessRecord>();
      buildingRecords.forEach(record => {
        lastRecordsMap.set(record.user.id, record);
      });
      const lastRecords = Array.from(lastRecordsMap.values());
      const insideRecords = lastRecords.filter(record => record.status === true);
      this.accessLogs.set(insideRecords);
      this.isLoading = false;
    });
  }

}
```
</details>


4. Place the spinner component near the top of  HTML of the component.

5. Test the application in your browser. You might want to set the netwrok throttling to slow 4G to see the spinner in action.

## 2. Handle server errors

1. In the rest service, temporarily change the Building URL to the wrong end point ('http://localhost:8080/api/buildings')

2. Amend the subscription in the emergency page component to the building observable to handle server errors - display a suitable message on the screen if an error occurs.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
errorMessage = "";

ngOnInit(): void {
    this.restService.getBuildings().subscribe(
      {
        next: data => {
          this.buildings.set(data);
        },
        error: error => {
          this.errorMessage = `Failed to load buildings data. ${error.message}`;
          console.log(error);
        }
      }
    )};
```
</details>

3. Test the changes in your browser.

## 3. Improve the user experience

Implement the spinner for the loading of the list of buildings. If an error occurs, don't show the who-is-in-the-building component.

In the who-is-in-the-building component, don't show any data if there is no selected building