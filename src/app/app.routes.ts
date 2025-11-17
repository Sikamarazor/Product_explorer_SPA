import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path: 'home',
        loadComponent: () =>
            import('./components/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'favorites',
        loadComponent: () => import('./components/favourite-view/favourite-view.component')
        .then(m => m.FavouriteViewComponent)
    },
    {
        path: 'admin',
        loadChildren: () => import('./components/admin-view/admin.routes')
        .then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuardService]
    },
    {
        path: 'product/:id',
        loadComponent: () =>
        import('./components/product-details-view/product-details-view.component')
            .then(m => m.ProductDetailsViewComponent),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
