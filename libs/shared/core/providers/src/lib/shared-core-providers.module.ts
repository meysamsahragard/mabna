import { NgModule } from '@angular/core';
import { AuthService, JwtInterceptor } from '@mabna/shared/core/auth';
import { NotificationService } from '@mabna/shared/core/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@mabna/shared/core/error-handling';
import { fakeBackendProvider } from '@mabna/shared/fake-backend';

@NgModule({
  providers: [
    AuthService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    fakeBackendProvider
  ]
})
export class SharedCoreProvidersModule {
}
