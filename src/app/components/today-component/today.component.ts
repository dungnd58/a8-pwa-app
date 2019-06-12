import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  priceMulti: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getPriceMulti();
    this.getWeatherTest();
  }

  getPriceMulti() {
    this.homeService.getPriceMulti().subscribe((data) => {
      this.priceMulti = data;
    },
    (error) => {
      console.log(error);
    });
  }

  getWeatherTest() {
    this.homeService.getWeatherApiTest().subscribe((data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    });
  }
}
