import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './angular/home/home.component';
import { LoginComponent } from './angular/login/login.component';
import { DataComponent } from './angular/data/data.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'data',
    component: DataComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
export const routedComponents = [HomeComponent, LoginComponent, DataComponent];
