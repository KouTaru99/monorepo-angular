import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
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
];
