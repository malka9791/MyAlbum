import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'myUsers', component: UsersComponent },
  { path: 'home', component: HomeComponent },
];
