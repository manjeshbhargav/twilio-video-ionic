import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare function require(name: string);
const { connect } = require('twilio-video');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).then(() => {
      const name = window.location.search.match(/room=([^&]+)/)[1];
      const token = window.location.search.match(/token=([^&]+)/)[1];
      return connect(token, {logLevel: 'debug', name});
    }).then(room => {
      room.participants.forEach(participantConnected);
      room.on('participantConnected', participantConnected);
    });
  }
}

function participantConnected(participant) {
  participant.tracks.forEach(trackPublished);
  participant.on('trackPublished', trackPublished);
}

function trackPublished(publication) {
  if (publication.isSubscribed) {
    trackSubscribed(publication.track);
  }
  publication.on('subscribed', trackSubscribed);
  publication.on('unsubscribed', trackUnsubscribed);
}

function trackSubscribed(track) {
  document.getElementById('remote-media').appendChild(track.attach());
}

function trackUnsubscribed(track) {
  track.detach().forEach(ele => ele.remove());
}
