import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'task-dialog.component.html',
  styleUrls: ['task-dialog.component.scss']
})

export class TaskDialogComponent {
  action: string;
  form: FormGroup;
  date = new FormControl(new Date());

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      title: new FormControl(data.title, Validators.required),
      deadline: new FormControl(data.deadline ? new Date(data.deadline) : new Date(), Validators.required)
    });
    this.action = this.data.action;
  }

  doAction() {
    if (this.form.valid)
      this.dialogRef.close({
        event: this.action,
        data: { ...this.form.value, id: this.data.id, userId: this.data.userId }
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
