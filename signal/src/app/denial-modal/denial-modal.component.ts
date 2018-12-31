import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-denial-modal',
  templateUrl: './denial-modal.component.html',
  styleUrls: ['./denial-modal.component.css']
})
export class DenialModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DenialModalComponent>) { }

  closeDialog() {
    //used to close the dialog on click
    //uses the reference to the dialog itself created in the constructor
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  

}
