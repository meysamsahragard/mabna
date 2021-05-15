import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  TaskEffects,
  taskReducer,
  TaskService
} from '@mabna/task-management/store';
import { AuthEffects, AuthReducer, LoadingReducer } from '@mabna/shared/store';
import { SharedMaterialModule } from '@mabna/shared/material';
import { SharedUiLoadingModule } from '@mabna/shared/ui/loading';
import { SharedCoreProvidersModule } from '@mabna/shared/core/providers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      task: taskReducer,
      auth: AuthReducer,
      loading: LoadingReducer
    }),
    EffectsModule.forRoot([AuthEffects, TaskEffects]),
    HttpClientModule,
    SharedMaterialModule,
    SharedUiLoadingModule,
    SharedCoreProvidersModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
