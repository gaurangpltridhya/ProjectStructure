import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/API-URL/contants';

@Component({
  selector: 'app-home-game-sliders',
  templateUrl: './home-game-sliders.component.html',
  styleUrls: ['./home-game-sliders.component.scss']
})
export class HomeGameSlidersComponent implements OnInit {

  gameSlidersList: Array<any> = [];

  constructor(
    public _constants: Constants
  ) { }

  ngOnInit(): void {
    this.getGameSliders();
  }


  /**
   * get game slider from static json
   */
  getGameSliders() {
    this._constants.getGameSliders().subscribe((res: any) => {
      // this.gameSlidersList = res?.siteconfig?.gameSliders;
      console.log(res?.siteconfig?.gameSliders);
      let sliders: any = res?.siteconfig?.gameSliders;


      for (const [id, data] of Object.entries(sliders)) { // obj loop
        let valData: any = data;
        let visible = true;

        //TODO: open commented code after get total understanding of this func

        // if (valData.hasOwnProperty('mobile') || valData.hasOwnProperty('desktop')) {
        //     visible = this.appConfig.mobile ? this.appConfig.mobile === valData.mobile : valData.desktop;
        // }

        if (visible) {
          // this.GamesFilterService.set(id.toString(), valData.filter || {});
          // const name = valData.name[this.appConfig['language']],
          const name = valData.name['en'], // TODO: this en is static added make it dynamic by upper variable which is in comment
            // nameEn = this.gettextCatalog.getString(valData.name.en),
            nameEn = valData.name['en'],
            sl = {
              id: id.toString(),
              name: name || nameEn || '',
              link: valData.link,
              limit: valData.limit || 12,
              filter: id.toString(),
              doubleRow: !!valData.doubleRow,
            };
          this.gameSlidersList.push(sl);
        }

      }


      //   angular.forEach(res?.siteconfig?.gameSliders, (data:any, id:string) => {
      //     let visible = true;

      //     if (data.hasOwnProperty('mobile') || data.hasOwnProperty('desktop')) {
      //         visible = this.appConfig.mobile ? this.appConfig.mobile === data.mobile : data.desktop;
      //     }

      //     if (visible) {
      //         this.GamesFilterService.set(id.toString(), data.filter || {});
      //         const name = data.name[this.appConfig['language']],
      //             nameEn = this.gettextCatalog.getString(data.name.en),
      //             sl = {
      //                 id: id.toString(),
      //                 name: name || nameEn || '',
      //                 link: data.link,
      //                 limit: data.limit || 12,
      //                 filter: id.toString(),
      //                 doubleRow: !!data.doubleRow,
      //             };
      //         this.sliders.push(sl);
      //     }
      // });


    })
  }


}
