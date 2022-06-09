import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewPageComponent } from '../../preview-page/preview-page.component';

@Component({
  selector: 'app-add-contact-us',
  templateUrl: './add-contact-us.component.html',
  styleUrls: ['./add-contact-us.component.scss']
})
export class AddContactUsComponent implements OnInit {
  addContactUsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  // get Form control
  get addContactUsFormControl() {
    return this.addContactUsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

    // init form
    private initForm() {
      this.addContactUsForm = this.fb.group({
        contactUsTitle: ['', Validators.required],
        contactUsContent: ['', Validators.required],
      });
    }

  // submit button
  submitContactUs() {
    console.log('contactUsContent :>> ', this.addContactUsFormControl['contactUsContent'].value);
    console.log(this.addContactUsForm.value);

    // after completed API process
    this.router.navigate(['contactUs']);
  }

  // preview about us page
  previewContactUs() {
    console.log('contactUsContent :>> ', this.addContactUsFormControl['contactUsContent'].value);
    const data = this.addContactUsFormControl['contactUsContent'].value;
    this.dialog.open(PreviewPageComponent, {
      width: '80%',
      height: '80%',
      data: data,
    });
  }
}
