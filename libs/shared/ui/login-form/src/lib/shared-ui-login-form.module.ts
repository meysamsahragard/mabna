import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { SharedMaterialModule } from '@mabna/shared/material';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class SharedUiLoginFormModule {}
