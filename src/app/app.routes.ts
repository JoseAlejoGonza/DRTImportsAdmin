import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddProductLayoutComponent } from './components/add-product-layout/add-product-layout.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { UsersComponent } from './components/users/users.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { AddUsersComponent } from './components/add-users/add-users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
        path: 'home', 
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'shopping', pathMatch: 'full' },
            { path: 'shopping', component: ShoppingComponent },
            { path: 'add-product', component: AddProductLayoutComponent },
            { path: 'users', component: UsersComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'search-product', component: SearchProductsComponent },
            { path: 'new-user', component: AddUsersComponent },
            { path: '**', redirectTo: 'shopping', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
    // { path: 'add-product', component: HomeAdminComponent }
];
