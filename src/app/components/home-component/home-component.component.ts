import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public pwaService: PWAService) { }

  ngOnInit() {
  }

  installApp() {
    this.pwaService.promptEvent.prompt();
    this.pwaService.promptEvent.userChoice
      .then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt', choice);
        } else {
          console.log('User dismissed the A2HS prompt', choice);
        }
        this.pwaService.promptEvent = null;
      });
  }
}
