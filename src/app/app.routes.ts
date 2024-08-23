import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddProductLayoutComponent } from './components/add-product-layout/add-product-layout.component';
import { ShoppingComponent } from './components/shopping/shopping.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { 
        path: 'home', 
        component: LayoutComponent,
        children: [
            { path: 'shopping', component: ShoppingComponent },
            { path: 'add-product', component: AddProductLayoutComponent }
        ]
    }
    // { path: 'add-product', component: HomeAdminComponent }
];
