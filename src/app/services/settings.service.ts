import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {
    /*
    API are authorized by https://www.cryptocompare.com/
    */
    private _apiUrl = 'https://min-api.cryptocompare.com/data';
    public get apiUrl() {
        return this._apiUrl
    }

    private _apiKey = 'e09d00e12871d3af53e6a3b507f8eff2b65eda9f4eb4fcfba5b21eeb2c4ab9e0';
    public get apiKey() {
        return this._apiKey;
    }

    private _apiPushServer = 'http://localhost:9000';
    public get apiPushServer() {
        return this._apiPushServer;
    }

    //WEB PUSH KEYS
    private _publicKey = 'BEgUyeTQluV91KxTGjdJdzQNjYVxN7ejQuKzsWmKIU7iqNf6DTZCFtfuprdZJrJKdPRrkqSu96eQWrjwLNtYWZ4';
    public get publicKey() {
        return this._publicKey;
    }
    
    private _privateKey = 'iIKWsfDYY1ceC1uio9k8jOI57pwFD6kjAnSbNTLFk7I';
    public get privateKey() {
        return this._privateKey;
    }
}