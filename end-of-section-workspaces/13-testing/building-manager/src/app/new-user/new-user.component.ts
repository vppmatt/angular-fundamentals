import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestService } from '../rest.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, NgIf],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
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
