import { Routes } from '@angular/router';
// import { AuthGuard, RoleGuard } from '@ng-mf/my-lib';

// export const routes: Routes = [
//   {
//     path: 'login',
//     loadComponent: () => import('@ng-mf/my-lib').then(m => m.LoginComponent)
//   },
//   {
//     path: '',
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'admin',
//         canActivate: [RoleGuard],
//         data: { role: 'ADMIN' },
//         loadChildren: () => import('./admin/admin.routes')
//       },
//       // Thêm các routes khác
//     ]
//   }
// ];

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'app-remote',
    pathMatch: 'full'
  },
  {
    path: 'app-remote',
    loadChildren: () => import('app-remote/Routes').then(m => m.remoteRoutes)
  }
];
