// registerNotifications.js
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';

let notificationsRegistered = false;

const registerNotificationTasks = () => {
  if (notificationsRegistered) return;

  // Register your notification tasks here
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('Background Event', type, detail);
  });

  notificationsRegistered = true;
};

export default registerNotificationTasks;
