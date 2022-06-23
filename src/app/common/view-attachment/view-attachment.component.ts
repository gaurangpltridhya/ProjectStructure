import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMAGE_PATH } from 'src/app/API-URL/contants';

@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.scss']
})
export class ViewAttachmentComponent implements OnInit {


  @Input() fromParent: any;
  dialogTitle: string = '';
  isNewImage!: any;
  zoomImgSrc!: any;
  isImageOpenedInFullScreen!: any;
  IMAGE_PATH = IMAGE_PATH;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.isNewImage = this.fromParent.isNewImage;
    this.zoomImgSrc = this.fromParent.zoomImgSrc;
    this.isImageOpenedInFullScreen = this.fromParent.isImageOpenedInFullScreen;
  }

}
