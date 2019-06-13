import { Component } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { SettingsService } from './services/settings.service';
import { NewsLetterService } from './services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a8-pwa-app';

  constructor(private swUpdate: SwUpdate,
    private swPush: SwPush,
    private newsletterService: NewsLetterService,
    private settingsService: SettingsService) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if(confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }

    //Show choices popup
    this.swPush.requestSubscription({
      serverPublicKey: this.settingsService.publicKey
    }) //return a push subscription object
    .then(sub => {
      this.newsletterService.addPushSubscriber(sub).subscribe(
        () => {
          console.log('Success');
          this.newsletterService.send().subscribe();
        }
      )
    })
    .catch(err => console.log(err));
  }

  
}
