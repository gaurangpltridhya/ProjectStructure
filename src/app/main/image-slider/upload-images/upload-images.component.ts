import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/api/base-api.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: any;
  public isFileChanged = false;
  public coverImageWeb!: string;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  showError = false;


  constructor(private uploadService: BaseApiService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UploadImagesComponent>
    ) { }

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
    // this.uploadService.getFiles().subscribe((res:any)=>{
    //   this.imageInfos = res?.getImages;
    //   console.log('40',this.imageInfos)

    // });
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

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  delete(id: number ,file : File):void {
    this.uploadService.deleteFiles(file).subscribe(
      (event:any) => {
        if(event instanceof HttpResponse){
          this.uploadService.getFiles().subscribe((res:any)=>{
              this.imageInfos = res?.getImages;
              console.log('40',this.imageInfos)
        
            });
          this.imageInfos = this.uploadService.deleteFiles(this.imageInfos);
        }
      }
    )
      
    };

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
    this.dialogRef.close(true);
  }

  deleteFiles(): void{
    this.imageInfos = null;
this.previews = [];
    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     this.delete(i, this.selectedFiles[i]);
    // console.log(this.selectedFiles?.length)
    //   }
    // }
    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     this.remove(i, this.selectedFiles[i]);
    //   }
    // } 
   }

   
  onClose(): void {
    this.dialogRef.close(true);
  }

  onFileChanged(eventOnChange: any): void {
    if (eventOnChange.target.files[0]) {
      if(eventOnChange.target.files[0].type === 'image/png' || eventOnChange.target.files[0].type === 'image/jpeg' || eventOnChange.target.files[0].type === 'image/jpg'){
        this.isFileChanged = true;
        this.showError = false;
        this.imageChangedEvent = eventOnChange.target.files[0];
      }
      else{
        this.isFileChanged = true;
        this.imageChangedEvent = null;
        this.croppedImage = null;
        this.loadImageFailed();
      }
    }
  }
  loadImageFailed(): void{
    // this.toastr.showError("File not supported","");
    this.showError = true;
  }
}
