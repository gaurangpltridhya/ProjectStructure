import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants, IMAGE_PATH } from 'src/app/API-URL/contants';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewAttachmentComponent } from 'src/app/common/view-attachment/view-attachment.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {


  addProductForm!: FormGroup;
  productId: string = this.route.snapshot.params['id'];
  addProductFormSubmitted: Boolean = false;
  categoryId: string = this.route.snapshot.params['categoryId'];
  productImgArray: Array<any> = [];
  IMAGE_PATH: string = IMAGE_PATH;
  attachmentExtenstions = ["jpg", "jpeg", "png", "svg", "gif", "bmp"];
  deletedAttachments: Array<any> = [];


  constructor(
    private _formBuilder: FormBuilder,
    private toasterService: ToastrService,
    public _constants: Constants,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private ngbModalService: NgbModal,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.addProductForm = this._formBuilder.group({
      category: [this.categoryId, [Validators.required]],
      name: ['', [Validators.required]],
      productDescription: ['', [Validators.required, Validators.minLength(50)]],
      price: [0, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,4})?$")]], // allow number and float value regex
      warranty: [null, [Validators.required]],
      allowedZipcodes: ['', [Validators.required]],
      tags: [''],
      productDetail: this._formBuilder.array([]), // form array
      images: ['', [Validators.required]],
      //below fields are not added right now
      returnPolicy: [false],
      retunDays: [null],
      // fileSource: ['', [Validators.required]]
    });

    // this.route.params.subscribe((params) => {
    //   this.productId = params['id'];
    // })

    if (this.productId !== undefined) {
      // put edit product code here
    } else {
      this.addNewProductDetailGroup();
    }
  }


  /**
 * get form controls
 */
  get form() {
    return this.addProductForm.controls;

  }

  /**
   * product detail array get form control
   */
  get productDetailFormArray(): FormArray {
    return this.addProductForm.get("productDetail") as FormArray;
  }

  /**
  * add new product detail
  */
  addNewProductDetailGroup() {
    const add = this.addProductForm.get('productDetail') as FormArray;
    add.push(this._formBuilder.group({
      key: ['', [Validators.required]],
      value: ['', [Validators.required]],
      required: false
    }))
  }



  /**
  * remove new questions form
  */
  deleteKeyValueProductDetail(index: number) {
    const add = this.addProductForm.get('productDetail') as FormArray;
    add.removeAt(index)
  }



  /**
   * on images change
   * @param event 
   */
  fileChangeEvent(event: any) {

    if (event.target.files.length > 0) {

      let attachmentsList: Array<any> = [];
      let imgLength = event.target.files.length;
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        var reader = new FileReader();
        reader.onload = (event: any) => {
          var extension = file.name.split('.').pop().toLowerCase();
          if (this.attachmentExtenstions.includes(extension)) {
            attachmentsList.push({
              fileName: file.name,
              extension: file.type.split("/")[1],
              path: event.target.result,
              file: file,
              isNew: true
            });

            if (imgLength - 1 == i) {
              this.productImgArray.push(...attachmentsList);
            }
          } else {
            this.toasterService.error('You can upload only image file. ');
            attachmentsList = [];
          }
        }
        reader.readAsDataURL(event.target.files[i]);
      }

    }
  }




  /**
    * show image full screen
    */
  showImageFullScreen(path: string, isNewImage: any) {
    let newImage = false;
    let isImageOpenedInFullScreen = true;

    if (isNewImage != undefined) {
      newImage = true;
    } else {
      newImage = false;
    }

    if (path.split('.')[1] == 'pdf' || path.indexOf('application/pdf') != -1) {
      if (newImage === true) {
        this.toasterService.error('You can not view file without upload.');
        return;
      }
      isImageOpenedInFullScreen = false;
    } else {
      isImageOpenedInFullScreen = true;
    }

    let zoomImgSrc = path;

    const modalRef = this.ngbModalService.open(ViewAttachmentComponent, {
      scrollable: true,
      windowClass: 'contact-person-add',
      backdrop: 'static',
      // size: "md"
    });
    let params = { isNewImage: newImage, isImageOpenedInFullScreen: isImageOpenedInFullScreen, zoomImgSrc: zoomImgSrc };
    modalRef.componentInstance.fromParent = params;
  }



  /**
  * remove image from misc table
  */
  removeFileFromBill(attachment: any) {
    const attachmentIndex = this.productImgArray.indexOf(attachment);
    if (this.productImgArray[attachmentIndex].isNew == undefined) {
      this.deletedAttachments.push(this.productImgArray[attachmentIndex]);
    }
    this.productImgArray.splice(attachmentIndex, 1);
  }



  /**
   * submit add product form
   * @returns 
   */
  submitAddProductForm() {
    this.addProductFormSubmitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    this._productService.addProductByCategoryId(this.addProductForm.value, this.productImgArray).subscribe((res: any) => {
      if (res.status == 200) {
        this.toasterService.success(res?.message);
        // this.router.navigate() // add code for move product page with product category id
      }
    }, (error: any) => {

    });

  }


  /**
   * back to last opened page
   */
  goBack() {
    this._location.back();
  }

}


