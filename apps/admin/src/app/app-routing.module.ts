import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@mabna/shared/core/auth';
import { Role } from '@mabna/shared/model';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin
    },
    loadChildren: () =>
      import('@mabna/admin/feature-shell').then(
        (m) => m.AdminFeatureShellModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@mabna/shared/feature-login').then(
        (m) => m.SharedFeatureLoginModule
      )
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
