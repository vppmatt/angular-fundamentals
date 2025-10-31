import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserComponent } from './new-user.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserComponent,],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
});
