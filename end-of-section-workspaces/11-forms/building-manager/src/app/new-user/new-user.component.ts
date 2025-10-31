import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  firstname: string = '';
  surname: string = '';

  onSubmit() {
    console.log(`New user created: ${this.firstname} ${this.surname}`);
  }

}
