import { Injectable } from "@angular/core";


@Injectable()
export class SettingsService {
    private _apiUrl = 'https://min-api.cryptocompare.com/data';
    private _apiKey = 'e09d00e12871d3af53e6a3b507f8eff2b65eda9f4eb4fcfba5b21eeb2c4ab9e0';

    public get apiUrl() {
        return this._apiUrl
    }

    public get apiKey() {
        return this._apiKey;
    }
}