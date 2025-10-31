# Lab 16 - Testing

## Intro

In this lab we will complete some basic UI testing

## 1. Start the testing process and remove failing tests

1. Stop the application running and start the testing process with

`
ng test
`

2. There will be a lot of failing tests as the test files have been automatically created as we have been building our application. By default these test files will look for content that we have removed. 

Go through each of the test files and fix or remove the failing tests. The main fixes to look out for are:

- If the test fails due to "NullInjectorError: No provider for ActivatedRoute!" then add the following to the testbed configuration part:

```typescript
beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [provideRouter([])]
    }).compileComponents();
```

- If the test fails due to "NullInjectorError: No provider for HttpClient!" then add the following to the testbed configuration part:

```typescript
beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [provideHttpClient()]
    }).compileComponents();
```

- In the app component there is a test that the title should say "building-manager" -this is not currently displayed on the screen. You can fix this by adding the following to the top of the app-component's HTML

```html
<h1>{{ title }}</h1>
```

and change the test to look for the title, without "hello" in front!

## 2. Create a simple test

1. Let's create a simple test for the Menu component. We'll make sure that there are 4 anchor tags displayed on the screen when the component is rendered. 

<details>
<summary>
Click here to see the sample solution
</summary>

```typescript
  it('all links should appear', () => {
    const anchorElements = fixture.nativeElement.querySelectorAll('a');
    expect(anchorElements.length).toBe(4);
  });
```
</details>

## 3. Create a test with simulated user interaction

1. For the new user component, create a test that checks that if a valid user has been entered into the form fields, and the submit button is clicked, the http call is made.

```typescript
    it('check that save method is called', () => {

    const httpTesting = TestBed.inject(HttpTestingController);

    spyOn(component, 'onSubmit').and.callThrough(); 
    
    const firstname = fixture.debugElement.query(By.css('input[name="firstname"]'));
    firstname.nativeElement.value = 'John';
    firstname.nativeElement.dispatchEvent(new Event('input'));

    const surname = fixture.debugElement.query(By.css('input[name="surname"]'));
    surname.nativeElement.value = 'Doe';
    surname.nativeElement.dispatchEvent(new Event('input'));

    const saveButton = fixture.nativeElement.querySelector('button');
    saveButton.click();

    const request = httpTesting.expectOne({ url: 'http://localhost:8080/api/user', method: 'POST' });
    request.flush({ id: 123, firstname: 'John', surname: 'Doe' });

    fixture.detectChanges();

    expect(component.firstname).toBe('John');
    expect(component.surname).toBe('Doe');

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.message).toBe('User added successfully with id :123'); 
  });
```