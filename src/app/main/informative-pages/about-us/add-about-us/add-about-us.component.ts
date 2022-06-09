import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { PreviewPageComponent } from '../../preview-page/preview-page.component';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.scss'],
})
export class AddAboutUsComponent implements OnInit {
  addAboutUsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  // get Form control
  get addAboutUsFormControl() {
    return this.addAboutUsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // init form
  private initForm() {
    this.addAboutUsForm = this.fb.group({
      aboutUsTitle: ['', Validators.required],
      aboutUsContent: ['', Validators.required],
    });
  }

  // submit button
  submitAboutUs() {
    console.log('aboutUsContent :>> ', this.addAboutUsFormControl['aboutUsContent'].value);
    console.log(this.addAboutUsForm.value);

    // after completed API process
    this.router.navigate(['abouttUs']); 
  }

  // preview about us page
  previewAboutUs() {
    console.log('aboutUsContent :>> ', this.addAboutUsFormControl['aboutUsContent'].value);
    const data = this.addAboutUsFormControl['aboutUsContent'].value;
    this.dialog.open(PreviewPageComponent, {
      width: '80%',
      height: '80%',
      data: data,
    });
  }
}
