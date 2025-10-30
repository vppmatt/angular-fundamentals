# Lab 9 - Rest requests and signals

## Intro

In this lab we will start a new project that will connect to a back-end system using REST, and we will make our first get request.

## 1. Start the back end server

1. clone and run the back end server with these commands:

```
git clone https://github.com/vppmatt/building-access-management-simulator.git

cd building-access-management-simulator

mvnw package

java -jar target\building-access-management-simulator-0.0.1-SNAPSHOT.jar
```

2. check the back end is running by visiting this URL in your browser:

`
http://localhost:8080/swagger-ui/index.html
`

Note: In this project, you should only call end points that start with /api/ - all /api2/ endpoints have security enabled.

## 2. Create a new project

1. Create a new project 

`
ng new building-manager
`

2. Open the project in VSCode

3. Clear out the content of the app component's HTML.

4. Run the project

`
ng serve
`


## 3. Make a REST get request

1. Add the provideHttpClient() method call to the providers list in app.config.ts

```
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient()
  ]
};
```

2. Create a new service 

`
ng g s rest
`

3. In the rest service inject the httpClient, then create a method that will make a get request to `http://localhost:8080/api/building` to retrieve a list of buildings. You will first want to create an interface to store the object type.

<details>
<summary>
Click here to see the sample solution
</summary>

```
export interface Building {
  id: number;
  name: string;  
}
```

```
export class RestService {

  constructor(private httpClient: HttpClient) { }

  getBuildings() : Observable<Building[]> {
    return this.httpClient.get<Building[]>('http://localhost:8080/api/building');
  }

}
```
</details>

4. In the App component, inject the restService, then in an ngOnInit function, call the getBuildings method, subscribe to the results and log them to the console

<details>
<summary>
Click here to see the sample solution
</summary>

```
  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(buildings => {
      console.log('Buildings fetched on app init:', buildings);
    });
  }
```
</details>

4. Test the application in the browser!

## 4. Use a signal to store the data 

1. In the app component define a class level variable as a signal of an array of buildings.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  buildings = signal<Building[]>([]);
```
</details>

2. In the ngOnInit method, when the data is loaded, store it in the buildings variable rather than logging it to the console

<details>
<summary>
Click here to see the sample solution
</summary>

```
  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
```
</details>

3. Display the list of buildings as an unordered list in the HTML (don't forget to import NgFor!)

<details>
<summary>
Click here to see the sample solution
</summary>

```
<h1>Buildings</h1>

<ul>
    <li *ngFor="let building of buildings()">
        {{ building.name }} 
    </li>
</ul>
```
</details>

4. Test the application in the browser!


