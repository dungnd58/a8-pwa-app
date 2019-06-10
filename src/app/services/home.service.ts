import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private settings: SettingsService,
      private httpClient: HttpClient) { }

  getPriceMulti(): Observable<any> {
    return this.httpClient.get(`${this.settings.apiUrl}/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD&api_key=${this.settings.apiKey}`);
  }

  getHistoryByFSymbol(fsym, date): Observable<any> {
    return this.httpClient.get(`${this.settings.apiUrl}/pricehistorical?fsym=${fsym}&tsyms=USD&limit=5&ts=${date}&api_key=${this.settings.apiKey}`);
  }
}
