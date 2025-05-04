import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './Guards/auth.guard';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { HomeComponent } from './pages/panel-admin/sections/home/home.component';
import { DashboardComponent } from './pages/panel-admin/sections/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LayoutComponent},
    {path: '', component: PanelAdminComponent, canActivate: [authGuard], children: [
        {path: 'home', component: HomeComponent},
        {path: 'dashboard', component: DashboardComponent},
    ]},
    {path: '**', redirectTo: 'login'}
];
