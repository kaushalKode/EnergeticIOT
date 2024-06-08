import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import {AnimatedCircularProgress} from 'react-native-circular-progress'

import {IP} from '@env'

// socket app
import socketI0Client from "socket.io-client";

import notifee, { AuthorizationStatus } from '@notifee/react-native';

const ControlView = ({selectedItem}) => {
  const [chartData, setChartData] = useState(null);
  console.log("controlView");
 
  const data = useRef([])
  const maxdata = useRef(selectedItem.max)
  const val = useRef(0)
  const socket = useRef(null)
  
  // // socket connection
  useEffect(() => {
    // console.log(socket);
    const newsocket = socketI0Client(`http://${IP}:8001/`);
    console.log('initiating socket connection in control View.');

    newsocket.on('realTimeSensorData', newData => {
      console.log("control View Socket Data");
      try {
        if(newData) {

          data.current = newData; 
        }
      } catch(error) {
        
      }
      
      return () => {
        newsocket.disconnect();
      };
    });

      

    // console.log(data.current);

    
    socket.current = newsocket
    // setSocket(newsocket);
  },[selectedItem]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setChartData(data.current);
      if(data.current){
        // val.current = 
        setChartData(data.current)
        console.log('max',selectedItem.max);
        
      }
    }, 1500); // 1000 milliseconds = 1 second
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getColor = (fillValue, order) => {
    if(order === 1) {
        if (fillValue > 75) {
            return '#00FF00'; // Green
        } else if (fillValue > 50) {
            return '#FFFF00'; // Yellow
        } else if (fillValue > 25) {
            return '#FFA500'; // Orange
        } else {
            return '#FF0000'; // Red
        }
    } else if(order === -1){
        if (fillValue > 95) {
            return '#ec0a0a'; // Red
        } else if (fillValue > 75) {
            return '#f68c14'; // 
        } else if (fillValue > 50) {
            return '#eacc23'; // 
        } else if (fillValue > 25) {
            return '#fff64a'; // Yellow
        } else {
            return '#00FF00'; // Green
        }
    }
  };

  const displayNotif = async(sensorMeasureValue) => {
    // Request permissions (required for iOS)
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
      Alert.alert('Permission Denied', 'Please enable notifications in settings.');
      return;
    }
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound : 'hollow'
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Energetic IOT',
      body: selectedItem.displayName+' Sensor high data alert. Reading = '+sensorMeasureValue,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        sound : 'hollow',
        vibration: true,
        vibrationPattern: [300, 500],
      },
    });
  }

  if(Object.keys(data.current).length !== 0) 
  {
    const sensorData = data.current[selectedItem.name];
    const sensorMeasureValue = sensorData[selectedItem.measure];
    const fillValue = (sensorMeasureValue / selectedItem.max) * 100;
    const tintColor = getColor(fillValue, -1);

    if(fillValue > 95) {
      displayNotif(sensorMeasureValue)
    }
      
      
    return (
      <View style={styles.container}>
        
        {data.current && (
          <Text style={styles.title}>{selectedItem.displayName.toString()}</Text>
        )}

        <AnimatedCircularProgress
          style={styles.chartComp}
          size={250}
          arcSweepAngle={90+90}
          rotation={90+90+90}
          width={25}
          lineCap='round'
          fill={fillValue}
          tintColor={tintColor}
          duration={0}
          backgroundColor='#3d5875'
          
        
        />

        <Text style = {styles.measure}> {sensorMeasureValue.toString()}</Text>

      </View>
    )
  }

  return(
    <Text>Loading...</Text>
  )
}

export default ControlView

const styles = StyleSheet.create({
    container : {
        flex : 0.8,
        borderBottomWidth : 1,
        justifyContent : 'center',
        alignItems : 'center',
        overflow : 'hidden'
    },
    chartComp : {
      position : 'relative',
        top : 50
    },
    title : {
      position : 'relative',
      top : 170,
      fontSize : 18,
      fontWeight : 'bold',
    },
    measure : {
      position : 'relative',
      bottom : 25,
      textAlign : 'center',
      fontSize : 12,
      fontWeight : 'bold'
    }
})