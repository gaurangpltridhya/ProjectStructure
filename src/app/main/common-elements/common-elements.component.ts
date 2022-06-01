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

  // drag and drop feature
  draggable: any = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    // data: "myDragData",
    effectAllowed: "copyMove",
    disable: false,
    handle: false
  };

  dragDropDataList: Array<any> = ['Football', 'Cricket', 'Hockey', 'Baseball'];
  droppedData: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * on drag start call
   * @param event 
   */
  onDragStart(event: any) {

  }

  /**
   * push data to all data available for drag
   * @param event 
   */
  onDropAllDT(event: any) {
    this.dragDropDataList.push(event.data);
  }

  /**
   * on drop call
   * @param event 
   */
  onDropBlnkDT(event: any) {
    this.droppedData.push(event.data);
  }

}
