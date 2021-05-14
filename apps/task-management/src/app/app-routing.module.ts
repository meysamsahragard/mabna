import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@mabna/shared/core/auth';
import { Role } from '@mabna/shared/model';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      role: Role.User
    },
    loadChildren: () =>
      import('@mabna/task-management/feature-shell').then(
        (m) => m.TaskManagementFeatureShellModule
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
