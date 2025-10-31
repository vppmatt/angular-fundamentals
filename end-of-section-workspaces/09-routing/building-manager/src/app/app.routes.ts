import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EmergencyPageComponent } from './emergency-page/emergency-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
    {path: "" , component: HomePageComponent},
    {path : "emergency" , component: EmergencyPageComponent},
    {path: "emergency/:building", component: EmergencyPageComponent},
    {path: "**" , component: NotFoundPageComponent}      
];
