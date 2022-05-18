import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormat'
})
export class AddressFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let address = '';
    if (value != undefined && Object.keys(value).length > 0) {
      if (value.line1 != undefined && value.line1 != '') {
        address += value.line1;
        if (value.city != '' || value.province != '' || value.postalCode) {
          address += ', '
        }
      }
      if (value.address != undefined && value.address != '') {
        address += value.address;
        if (value.city != '' || value.province != '' || value.postalCode) {
          address += ', '
        }
      }
      if (value.city != '') {
        address += value.city;
        if (value.province != '' || value.postalCode) {
          address += ', '
        }
      }
      if (value.province != '') {
        address += value.province;
        if (value.postalCode) {
          address += ', '
        }
      }
      if (value.postalCode != '') {
        address += value.postalCode
      }
    }
    return address;
  }

}
