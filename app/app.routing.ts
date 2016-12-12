import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './angular/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
export const routedComponents = [HomeComponent];
