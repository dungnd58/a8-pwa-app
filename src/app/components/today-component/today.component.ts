import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { IdbService } from 'src/app/services/idb.service';
import * as moment from 'moment';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  priceMulti: any;

  constructor(private homeService: HomeService,
    private idbService: IdbService) {
  }

  ngOnInit() {
    this.getPriceMulti();
    //this.getWeatherTest();
  }

  getPriceMulti() {
    this.idbService.getAllData('Today').then(items => {
      if(this.idbService.networkMode === 'online' && items.length === 0) {
        this.homeService.getPriceMulti().subscribe((data) => {
          this.priceMulti = data;
          this.idbService.addItems('Today',{
            ...data,
            date: moment().startOf('day').unix()
          });
        },
        (error) => {
          console.log(error);
        });
      } else {
        this.priceMulti = items[0];
      }
    })

    
  }

  // getWeatherTest() {
  //   this.homeService.getWeatherApiTest().subscribe((data) => {
  //     console.log(data);
  //   },
  //   (error) => {
  //     console.log(error);
  //   });
  // }
}
