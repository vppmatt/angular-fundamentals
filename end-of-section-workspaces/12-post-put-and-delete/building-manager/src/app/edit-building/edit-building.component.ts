import { Component, OnInit, signal, inject } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../data/Building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent implements OnInit {

  buildings = signal<Building[]>([]);

  saving : boolean = false;
  message : string = "";

  private restService = inject(RestService);

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
    this.saving = true;
    const buildingToUpdate : Building = {
      id: +(this.editForm.value.id || 0),
      name: this.editForm.value.name || ""
    }

    this.restService.editBuilding(buildingToUpdate).subscribe({
      next: (response) => {
        console.log(response);
        this.message = '';
        this.restService.getBuildings().subscribe(data => {
          this.buildings.set(data);
          this.saving = false;
        });
        
      },
      error: (error) => {
        this.message = 'Error updating building: ' + error.message;
        this.saving = false;
      }
    });
  }

}
