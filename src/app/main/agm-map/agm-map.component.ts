import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {

  mapDefaultCenterCoordinates: any = [54.6253637519303, -125.37171441683478];
  circleColor: string = 'red';
  public customStyle: any = [{ //used foe hide extra places markers on map
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
      visibility: "off",
    }]
  }];


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * on map ready it call this function
   * @param event 
   */
  mapReady(event: any) {

  }

}
