import { Routes } from '@angular/router';

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
        .then(m => m.ADMIN_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
