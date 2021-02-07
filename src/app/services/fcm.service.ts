import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
const { PushNotifications } = Plugins;

// with type support
import { FCM } from '@capacitor-community/fcm';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth.service';
const fcm = new FCM();

//
// alternatively - without types
const { FCMPlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  session: any;

  notifications: PushNotification[] = [];
  //
  // move to fcm demo
  topicName = 'super-awesome-topic';
  remoteToken: string;


  constructor(private router: Router,
    private platform: Platform,
    private authService:AuthService
    ) { }
  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }
  registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
        alert('Push registration success, token: ' + token.value);
        this.authService.authState.subscribe(state=>{
          if(state){
            this.authService.addFcmToken(token.value);
          }
        })
      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
      alert('Error on registration: ' + JSON.stringify(error));
    });
 // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
        alert('Push received: ' + JSON.stringify(notification));
      }
    );
   // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        alert('Push action performed: ' + JSON.stringify(notification));
        // if (data.detailsId) {
        //   this.router.navigateByUrl(`/home/${data.detailsId}`);
        // }
      }
    );
  }
  //
  // move to fcm demo
  subscribeTo() {
    PushNotifications.register()
      .then((_) => {
        fcm
          .subscribeTo({ topic: this.topicName })
          .then((r) => alert(`subscribed to topic ${this.topicName}`))
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(JSON.stringify(err)));
  }

  unsubscribeFrom() {
    fcm
      .unsubscribeFrom({ topic: 'test' })
      .then((r) => alert(`unsubscribed from topic ${this.topicName}`))
      .catch((err) => console.log(err));
    if (this.platform.is('android')) fcm.deleteInstance();
  }

  getToken() {
    fcm
      .getToken()
      .then((result) => {
        this.remoteToken = result.token;
      })
      .catch((err) => console.log(err));
  }
}
