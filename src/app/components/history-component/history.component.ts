import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  pricesHistory: any = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDaysPrice();
    this.getFourDaysPrice();
  }

  private getSymbolHistory(fsym,date) {
    return this.homeService.getHistoryByFSymbol(fsym,date);
  }

  private saveHistory(t) {
    forkJoin(
      this.getSymbolHistory('BTC',t), 
      this.getSymbolHistory('ETH',t), 
      this.getSymbolHistory('LTC', t)
    ).subscribe(([btc,eth,ltc]) => {
      this.pricesHistory.push({
        date: moment.unix(t).format("MMMM Do YYYY"),
        eth: eth && eth.ETH.USD,
        btc: btc && btc.BTC.USD,
        ltc: ltc && ltc.LTC.USD
      })
    });
  }

  getTodayPrice() {
    let t = moment().startOf('day').unix();
    this.saveHistory(t);
  }

  getYesterdayPrice() {
    let t = moment().startOf('day').subtract(1,'days').unix();
    this.saveHistory(t);
  }

  getTwoDaysPrice() {
    let t = moment().startOf('day').subtract(2,'days').unix();
    this.saveHistory(t);
  }

  getThreeDaysPrice() {
    let t = moment().startOf('day').subtract(3,'days').unix()
    this.saveHistory(t);
  }

  getFourDaysPrice() {
    let t = moment().startOf('day').subtract(4,'days').unix()
    this.saveHistory(t);
  }
}
