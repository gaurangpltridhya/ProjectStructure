import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IMAGE_PATH } from 'src/app/API-URL/contants';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { ListImageSliderComponent } from '../list-image-slider/list-image-slider.component';

@Component({
  selector: 'app-add-image-slider',
  templateUrl: './add-image-slider.component.html',
  styleUrls: ['./add-image-slider.component.scss']
})
export class AddImageSliderComponent implements OnInit {
  selectedFiles?:any = [];
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: any;
  public isFileChanged = false;
  public coverImageWeb!: string;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  showError = false;
  addImageSliderForm!: FormGroup;
  addImageSliderFormSubmitted: Boolean = false;


  constructor(private uploadService: BaseApiService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ListImageSliderComponent>,
    private _formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
    this.addImageSliderForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      uploadFile: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]]
    });
  }

   /**
   * get form controls
   */
    get form() {
      return this.addImageSliderForm.controls;
    }
  

onFileSelect(event :any){
  for (var i = 0; i < event.target.files.length; i++) {
    let file = event.target.files[i];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedFiles.push({
        fileName: file.name,
        file: file,
        fileData: event.target.result,
        attachmentFor: '',
        comment: ''
      });
    }
    reader.readAsDataURL(event.target.files[i]);
}
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

    /**
   * submit add product category form
   */
     submitAddImageSliderForm() {
      this.addImageSliderFormSubmitted = true;
      console.log(101)
      if (!this.addImageSliderForm?.invalid) {
        let data = {
          title: this.addImageSliderForm.value.title,
          description : this.addImageSliderForm.value.shortDescription
        }
        const formData = new FormData();
        for (const photo of this.selectedFiles) {
          formData.append("image", photo.file, photo.fileName);
        }
        formData.append("data", JSON.stringify(data));
        console.log(this.selectedFiles,208,data);
        this.uploadService.uploadImageSlider(formData).subscribe(
          (event: any) => {
          }
        )
      }
  
      this.dialogRef.close(this.addImageSliderForm.value);
    }
}
