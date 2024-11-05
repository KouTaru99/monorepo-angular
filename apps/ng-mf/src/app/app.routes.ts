import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'app-remote',
    loadChildren: () => import('app-remote/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'dashboard',
    component: NxWelcomeComponent,
  },
  {
    path: 'products',
    component: NxWelcomeComponent,
  },
  {
    path: 'products/level1.1',
    component: NxWelcomeComponent,
  },
  {
    path: 'products/level2.1',
    component: NxWelcomeComponent,
  },
  {
    path: 'settings',
    component: NxWelcomeComponent,
  },
  {
    path: 'settings/customize',
    component: NxWelcomeComponent,
  },
  {
    path: 'settings/profile',
    component: NxWelcomeComponent,
  },
  {
    path: '',
    redirectTo: 'app-remote',
    pathMatch: 'full',
  },
];
