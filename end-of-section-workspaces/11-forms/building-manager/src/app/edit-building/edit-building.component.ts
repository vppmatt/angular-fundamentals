import { Component, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent implements OnInit {

  buildings = signal<Building[]>([]);

  constructor(private restService : RestService) { }

  selectedBuildingId : number | null = null;

  editForm = new FormGroup({
    id: new FormControl('id'),
    name: new FormControl('name'),
  })

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

  handleClick(id :number) {
    this.selectedBuildingId = id;
    this.editForm.patchValue({
      id: "" + id,
      name: this.buildings().find(b => b.id === id)?.name
    })
  }

  onSubmit() {
    console.log("Submitting form", this.editForm.value);
  }

}
