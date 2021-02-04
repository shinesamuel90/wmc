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
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }
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
}
