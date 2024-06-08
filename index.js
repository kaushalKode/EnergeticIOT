import App from './App';
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import registerNotificationTasks from './registerNotifications';

// Register notification tasks
registerNotificationTasks();

AppRegistry.registerComponent(appName, () => App);
