import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedUiLoginFormModule } from '@mabna/shared/ui/login-form';
import { fakeBackendProvider } from '@mabna/shared/fake-backend';

const Routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forChild(Routes),
    SharedUiLoginFormModule,
  ],
  providers: [fakeBackendProvider],
  declarations: [LoginComponent],
})
export class SharedFeatureLoginModule {}
