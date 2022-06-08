import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-confirmation-popup',
  templateUrl: './custom-confirmation-popup.component.html',
  styleUrls: ['./custom-confirmation-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomConfirmationPopupComponent implements OnInit {


  okButtonText: string = 'Ok';
  cancelButtonText: string = 'Cancel';
  showIcon: Boolean = true;
  titleText: string = '';
  message: string = '';

  constructor(
    public matDialogRef: MatDialogRef<CustomConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ) { }

  ngOnInit(): void {
    console.log(this._data);

    this.okButtonText = this._data?.okButtonText;
    this.cancelButtonText = this._data?.cancelButtonText;
    this.showIcon = this._data?.showIcon == undefined ? true : this._data?.showIcon;
    this.titleText = this._data?.titleText;
    this.message = this._data?.message;
  }

}
