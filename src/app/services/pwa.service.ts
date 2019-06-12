import { Injectable } from "@angular/core";

@Injectable()
export class PWAService {
    private _promptEvent: any = null;
    get promptEvent() {
        return this._promptEvent;
    }
    set promptEvent(evt: any) {
        this._promptEvent = evt;
    }

    constructor() {
        window.addEventListener('beforeinstallprompt', event => {
            this._promptEvent = event;
        });

        window.addEventListener('appinstalled', this.logAppInstalled);
    }

    logAppInstalled() {
        console.log('Angular PWA was installed.', this._promptEvent);
    }
}