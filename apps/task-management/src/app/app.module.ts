import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService, JwtInterceptor } from '@mabna/shared/core/auth';
import {
  TaskEffects,
  taskReducer,
  TaskService,
} from '@mabna/task-management/store';
import { AuthEffects, AuthReducer, LoadingReducer } from '@mabna/shared/store';
import { fakeBackendProvider } from '@mabna/shared/fake-backend';
import { SharedMaterialModule } from '@mabna/shared/material';
import { SharedUiLoadingModule } from '@mabna/shared/ui/loading';
import { NotificationService } from '@mabna/shared/core/services';
import { ErrorInterceptor } from '@mabna/shared/core/error-handling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      task: taskReducer,
      auth: AuthReducer,
      loading: LoadingReducer,
    }),
    EffectsModule.forRoot([AuthEffects, TaskEffects]),
    HttpClientModule,
    SharedMaterialModule,
    SharedUiLoadingModule,
  ],
  providers: [
    AuthService,
    TaskService,
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
