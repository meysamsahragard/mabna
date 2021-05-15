import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedMaterialModule } from '@mabna/shared/material';
import { AuthEffects, AuthReducer, LoadingReducer } from '@mabna/shared/store';
import { SharedUiLoadingModule } from '@mabna/shared/ui/loading';
import { SharedCoreProvidersModule } from '@mabna/shared/core/providers';

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
      loading: LoadingReducer
    }),
    EffectsModule.forRoot([AuthEffects]),
    SharedUiLoadingModule,
    SharedCoreProvidersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
