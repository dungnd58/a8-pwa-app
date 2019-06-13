import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs';

@Injectable()
export class NewsLetterService {
    constructor(private http: HttpClient,
        private settingsService: SettingsService) {}

    addPushSubscriber(sub:any): Observable<any> {
        return this.http.post(`${this.settingsService.apiPushServer}/api/notifications`, sub);
    }

    send(): Observable<any> {
        return this.http.post(`${this.settingsService.apiPushServer}/api/newsletter`, null);
    }
}