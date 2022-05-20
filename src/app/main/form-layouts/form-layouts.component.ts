import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-layouts',
  templateUrl: './form-layouts.component.html',
  styleUrls: ['./form-layouts.component.scss']
})
export class FormLayoutsComponent implements OnInit {

  seriwsArray: Array<number> = [10, 11, 9, 9, 7, 8, 7, 12, 7, 15, 16, 17, 11, 9, 14];

  constructor() { }

  ngOnInit(): void {

    // below code is for random numbers in array with reapted value
    //make in accendind with reapeted value after max number of without reapeat data
    this.seriwsArray = this.seriwsArray.sort((a: number, b: number) => {
      return a - b;
    });

    const duplicates = this.seriwsArray.filter((item, index) => index !== this.seriwsArray.indexOf(item));
    let sortedWithoutReapetArray = [...new Set(this.seriwsArray)];

    function manageSort(dupVal: Array<any>) {

      for (let i = 0; i < dupVal.length; i++) {
        let index = dupVal.findIndex(n => n === dupVal[i]);
        if (index != -1) {
          sortedWithoutReapetArray.push(dupVal[i]);
          dupVal.splice(index, 1);
        }

        if (duplicates.length === 1) {
          sortedWithoutReapetArray.push(...dupVal);
          return;
        }
        if (i === duplicates.length) {
          manageSort(dupVal);
        }
      }
    }

    manageSort(duplicates);
    console.log(sortedWithoutReapetArray);

  }

}
