import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-elements',
  templateUrl: './common-elements.component.html',
  styleUrls: ['./common-elements.component.scss']
})
export class CommonElementsComponent implements OnInit {


  // p- sliders
  basicSliderVal: number = 20;
  basicSliderValStep: number = 20;
  basicSliderValRange: Array<number> = [20, 60];

  // p-select btns
  singleSelectionbtn: string = 'off';
  multipleselectionBtn!: number;
  customTemplateBtns!: any;

  stateOptions = [{ label: 'Off', value: 'off' }, { label: 'On', value: 'on' }];

  paymentOptions = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3 }
  ];

  justifyOptions = [
    { icon: 'align-left', justify: 'Left' },
    { icon: 'align-right', justify: 'Right' },
    { icon: 'align-center', justify: 'Center' },
    { icon: 'align-justify', justify: 'Justify' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
