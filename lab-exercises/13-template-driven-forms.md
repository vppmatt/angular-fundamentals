# Lab 13 - Template Driven Forms

## Intro

In this lab we will create a form to allow a user to be added to the system

## 1. Create a new component and add it to the menu / navigation

1. Create a component to create a user

2. Add a route to display the new user component, and a menu link.

## 2. Create a form to add in a new user

1. In the HTML create the following HTML form:

```html
<h2>New User</h2>

<form>
    <label for="firstname">First name:</label>
    <input id="firstname" name="firstname" type="text" />

    <label for="surname">Surname:</label>
    <input id="surname" name="surname" type="text" />

    <button type="submit">Add User</button> 
</form>
```

and create some basic css styling:

```css
form {
    display: flex;
    flex-direction: column;
    width: 300px;
}

label {
    margin-bottom: 5px;
}

input {
    margin-bottom: 10px;
}
```

2. In the typescript, create 2 variables to store the data for the fields on the form

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  firstname: string = '';
  surname: string = '';
```
</details>

3. Bind the fields to the form with NgModel. You'll also need to import `FormsModule` into the imports section of the @Component decorator.

<details>
<summary>
Click here to see the sample solution
</summary>

```html
    <input id="firstname" name="firstname" type="text" [(ngModel)]="firstname" />

    ...

    <input id="surname" name="surname" type="text" [(ngModel)]="surname" />
```
</details>

4. Create a function to handle the submit event of the form - for now console.log the values of the variables 

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  onSubmit() {
    console.log(`New user created: ${this.firstname} ${this.surname}`);
  }
```
</details>

5. Bind the onSubmit function to the submit event of the form.

<details>
<summary>
Click here to see the sample solution
</summary>

```html
<form (submit)="onSubmit()">
```
</details>

6. Test this in your browser.

## 2. Styles and validation

1. Make both fields required fields

<details>
<summary>
Click here to see the sample solution
</summary>

```html
    <input id="firstname" name="firstname" type="text" [(ngModel)]="firstname" required />

    ...

    <input id="surname" name="surname" type="text" [(ngModel)]="surname" required />
```
</details>

2. define css rules to highlight the field in red if it has been edited and is not valid

<details>
<summary>
Click here to see the sample solution
</summary>

```css
input.ng-invalid.ng-touched {
    border: 1px solid red;
}
```
</details>

