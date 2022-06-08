import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { UploadImagesComponent } from '../upload-images/upload-images.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Array<any> = [];


  constructor(private uploadService: BaseApiService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uploadService.getFiles().subscribe((res:any)=>{
      this.imageInfos = res?.getImages;
      console.log('30',this.imageInfos)

    });
  }
   
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

   addImage(): void{
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // // dialogConfig.data = {
    // //   dogDetails: this.formGroup.value
    // // };
    // this.dialog.open(UploadImagesComponent, dialogConfig);

    this.dialog.open(UploadImagesComponent, {
      panelClass: 'new-assign-dialog',
      disableClose: true,
      // data: {
      //   request: reqData
      // }
    }).afterClosed()
      .subscribe((response: any) => {
        if (response) {
          
        } else {
        }
      });
  }
  
    // this.router.navigate(['/upload-image']);
   }

