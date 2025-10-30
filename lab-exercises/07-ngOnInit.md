# Lab 7 - ngOnInit

## Intro

In this lab we will execute code when a component loads using its ngOnInit function. This will allow the user's preference to be saved / survive a browser refresh.

## 1. Implement the ngOnInit method

1. Adjust the app component class file so that it implmenents the OnInit interface, and create the ngOnInit function

<details>
<summary>
Click here to see the sample solution
</summary>

```
export class AppComponent implements OnInit {
  
  ngOnInit() {
    // Initialize any data or state here
  }
...
```
</details>

2. In the ngOnInit funciton, create some code to load the value of mode from the browser's local storage,  if it exists. 

Hint you can load / save to local storage with `localStorage.getItem` and `localStorage.setItem`.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  ngOnInit() {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      this.mode = savedMode;
    }
  }
```
</details>

3. Change the method that sets the mode to save / update the value in local storage.

<details>
<summary>
Click here to see the sample solution
</summary>

```
  switchMode() {
    this.mode = this.mode === 'light-mode' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', this.mode);
  }
```
</details>

4. Test the application in the browser!