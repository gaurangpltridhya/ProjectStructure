import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.scss']
})
export class AddAboutUsComponent implements OnInit {

  addAboutUsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  // init form
  private initForm(){
    this.addAboutUsForm = this.fb.group({
      aboutUsTitle: ['', Validators.required],
      aboutUsContent: ['',Validators.required]
    })
  }

  // submit button
  submitAboutUs(){
    console.log(this.addAboutUsForm.value)
  }

}
