# Lab 10 - Working with Rest

## Intro

In this lab we will start to implement a "who is in the building right now?" feature. The list of buildings we have already created will later be turned into a dropdown list. For now we'll leave that on screen and just work with a single example building.

## 1. Create environments

1. Run the command `ng generate environments` then edit the env files with server names - for now you can use the same server name for both production and development.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  export const environment = {
    serverUrl: 'http://localhost:8080',
};
```
</details>

2. Update the restService to use the server name from the environment files

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  import { environment } from '../environments/environment';
  
  ...

  serverUrl = environment.serverUrl;

  getBuildings() : Observable<Building[]> {
    return this.httpClient.get<Building[]>(`${this.serverUrl}/api/building`);
  }
```
</details>


## 2. Implement the “who is in the building right now” feature

1. Create an Interface to represent the data type received from the server when you call the `/api/logs/{date}` endpoint. You can store the time field as a string.

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
import { Building } from "./Building";

export interface AccessRecord {
  id: number;
  user : {
    id: number;
    firstname: string;
    surname:  string;
  }
  time : string;
  building: Building;
  status: boolean;
}
```
</details>

2. Create a new function in the RestService to retrieve all access records for the current date. The endpoint to call is `/api/logs/{date}?all=true` where the date is provided in the format yyyy-MM-dd. 

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  getAccessLogs(date: Date) : Observable<AccessRecord[]> {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    return this.httpClient.get<AccessRecord[]>(`${this.serverUrl}/api/logs/${formattedDate}?all=true`);
  }
```
</details>

3. Create a new component to display a table of all users in the building.

`
ng g c who-is-in-the-building
`

4. In this component, inject the rest service, and call the method to retrieve the access logs passing in the curent date.
<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
export class WhoIsInTheBuildingComponent implements OnInit {

  private restService = inject(RestService);

  ngOnInit(): void {
   this.restService.getAccessLogs(new Date()).subscribe(data => {
      console.log(data);
    });
  }

}  
```
</details>

5. When the data is received from the server it will contain records for all buildings, so you will want to filter this to use the building called "Adel Square" (hard code this for now as a class level variable).

Next work out who is in the biulding right now, and populate this into a class level variable.

Hint – make a Map of all records with the key being the user Id, so that only the last entry for each user is in the Map
All entries in the map where the status is true = users in the building

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
ngOnInit(): void {
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
```
</details>

6. Display the output in a table

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<h2>People in {{ selectedBuilding }} right now</h2>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Time of entry</th>
    </tr>
  </thead>
  <tbody>
    @for(record of accesslogs(), track $index) {
    <tr>
      <td>{{ record.user.firstname }} {{ record.user.surname }}</td>
      <td>{{ record.time }}</td>
    </tr>
    }
  </tbody>
</table>  
```
</details>

7. Display the new component on the App component and test it in your browser. You can optionally give the table some styling!

