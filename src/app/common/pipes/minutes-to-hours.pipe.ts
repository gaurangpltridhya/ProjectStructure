import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(minutes: any, args?: any): any {
    let days = 0;
    let hrs = 0;
    let min = 0;
    if (minutes) {
      hrs = Math.floor(minutes / 60);
      if (hrs > 24) {
        days = Math.floor(minutes / 24 / 60);
        hrs = Math.floor(minutes / 60 % 24);
      }
      min = minutes % 60;
    }
    days = this.pad(days);
    hrs = this.pad(hrs);
    min = this.pad(min);
    if (days > 0) {
      return days + " Days " + hrs + " Hours " + min + " Minutes";
    } else {
      return hrs + " : " + min + " Hours";
    }
  }

  pad(d: any) {
    return (d < 10) ? '0' + d.toString() : d.toString()
  }

}
