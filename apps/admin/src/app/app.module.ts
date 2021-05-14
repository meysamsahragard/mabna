import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { fakeBackendProvider } from '@mabna/shared/fake-backend';
import { AuthService, JwtInterceptor } from '@mabna/shared/core/auth';
import { NotificationService } from '@mabna/shared/core/services';
import { SharedMaterialModule } from '@mabna/shared/material';
import { AuthEffects, AuthReducer, LoadingReducer } from '@mabna/shared/store';
import { SharedUiLoadingModule } from '@mabna/shared/ui/loading';
import { ErrorInterceptor } from '@mabna/shared/core/error-handling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedMaterialModule,
    StoreModule.forRoot({
      auth: AuthReducer,
      loading: LoadingReducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
    SharedUiLoadingModule,
  ],
  providers: [
    AuthService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
