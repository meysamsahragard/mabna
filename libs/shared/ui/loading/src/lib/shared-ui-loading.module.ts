import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { SharedMaterialModule } from '@mabna/shared/material';

@NgModule({
  imports: [SharedMaterialModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class SharedUiLoadingModule {
}
