import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Constants, IMAGE_PATH } from 'src/app/API-URL/contants';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductCategoryComponent implements OnInit {


  addProductCategoryForm!: FormGroup;
  addProductCategoryFormSubmitted: Boolean = false;
  attachmentExtenstions = ["jpg", "jpeg", "png", "svg", "gif", "bmp"];
  pageAction: string = '';
  IMAGE_PATH: string = IMAGE_PATH;

  constructor(
    public matDialogRef: MatDialogRef<AddProductCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private toasterService: ToastrService,
    public _constants: Constants
  ) { }

  ngOnInit(): void {
    this.addProductCategoryForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]]
    });

    if (this._data !== undefined) {
      this.pageAction = 'edit';
      this.addProductCategoryForm.patchValue({
        name: this._data?.name,
        file: this._data?.path,
        fileSource: { path: this._data?.path }
      });
      console.log(this.addProductCategoryForm.value);

    } else {
      this.pageAction = 'add';
    }
  }


  /**
   * get form controls
   */
  get form() {
    return this.addProductCategoryForm.controls;

  }

  /**
   * on file change event
   */
  fileChangeEvent(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        var extension = file.name.split('.').pop().toLowerCase();

        if (this.attachmentExtenstions.includes(extension)) {

          this.addProductCategoryForm.patchValue({
            fileSource: {
              type: extension,
              fileName: file.name,
              file: file,
              fileData: event.target.result,
              path: event.target.result,
              isNew: true
            }
          });

        } else {
          this.toasterService.error('You can upload only image file. ');
          this.addProductCategoryForm.patchValue({
            fileSource: ''
          });
        }


      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * remove product image
   */
  deleteProductImage() {
    this.addProductCategoryForm.patchValue({
      fileSource: '',
      file: ''
    });
  }

  /**
   * submit add product category form
   */
  submitAddProductForm() {
    this.addProductCategoryFormSubmitted = true;
    if (this.addProductCategoryForm?.invalid) {
      return;
    }

    this.matDialogRef.close(this.addProductCategoryForm.value);
  }

}
