import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';
import { TodayComponent } from './components/today-component/today.component';
import { HistoryComponent } from './components/history-component/history.component';
import { SettingsService } from './services/settings.service';
import { RouterModule } from '@angular/router';
import { PWAService } from './services/pwa.service';
import { NewsLetterService } from './services/newsletter.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodayComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule
  ],
  providers: [
    SettingsService,
    PWAService,
    NewsLetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
