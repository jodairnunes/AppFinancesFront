import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LayoutComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: 'login'}
];
