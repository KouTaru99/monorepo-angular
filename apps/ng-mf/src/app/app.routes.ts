import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'app-remote',
    pathMatch: 'full',
  },
  {
    path: 'app-remote',
    loadChildren: () => import('app-remote/Routes').then((m) => m.remoteRoutes),
  }
];
