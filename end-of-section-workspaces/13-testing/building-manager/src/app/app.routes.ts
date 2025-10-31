import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EmergencyPageComponent } from './emergency-page/emergency-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';

export const routes: Routes = [
    {path: "" , component: HomePageComponent},
    {path : "emergency" , component: EmergencyPageComponent},
    {path: "emergency/:building", component: EmergencyPageComponent},
    {path: "new-user", component: NewUserComponent},
    {path: "edit-building", component: EditBuildingComponent},
    {path: "**" , component: NotFoundPageComponent}      
];
