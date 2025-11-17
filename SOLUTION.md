# Overall Architecture

The application will have the following:

App layout (app.component)

Navigation toolbar (Home, Favorites, Admin, Logout)

State management for products (ProductManagementService)

Authentication guard (AuthGuardService)

User management services such as UserService

The app will have views that can be viewed by type (User or admin)

# Products

Displays product lists using Material cards

Contains product details, filtering, favorites logic

Exposes its routing module

# admin

Contains admin dashboard

Product creation forms

Protected by the AuthGuard

Loaded only for admin users

# Example routing

export const routes: Routes = [
  { path: 'home', loadChildren: () => import('products/Routes').then(m => m.PRODUCT_ROUTES) },
  { path: 'favorites', loadChildren: () => import('products/Routes').then(m => m.FAVORITE_ROUTES) },
  { path: 'admin', canActivate: [AuthGuardService], loadChildren: () => import('admin/Routes').then(m => m.ADMIN_ROUTES) },
  { path: '**', redirectTo: 'home' }
];

# Shared Dependencies
RXJS
Reusable Services (e.g., UserService)

# Versioning Strategy

Maintain shared UI components in a shared lib:

Buttons

Toolbar

Cards

Dialogs
