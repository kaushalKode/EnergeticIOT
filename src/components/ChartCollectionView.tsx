import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import {AnimatedCircularProgress} from 'react-native-circular-progress'

// socket app
import socketI0Client from "socket.io-client";
import SensorsList from '../data/SensorList';
import { useNavigation } from '@react-navigation/native';

import {IP} from '@env';

import {Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

const COLUMNS = 3;
const MARGIN = vw(1);
const SPACING = (COLUMNS + 1) / COLUMNS * MARGIN;


const ChartCollectionView = ({selectedItem}) => {
    const navigation = useNavigation();

    const [chartData, setChartData] = useState(null);
    console.log("Chart Collection View");

    // const data = useRef([])
    const data = useRef({})
    const maxdata = useRef(selectedItem.max)
    const val = useRef(0)
    const socket = useRef(null)

    // socket connection
    useEffect(() => {
        // console.log(socket);
        const newsocket = socketI0Client(`http://${IP}:8001/`);
        console.log('initiating socket connection in chart Collection View.');

        // newsocket.emit('clientClick','from controlView');
        // newsocket.emit('duration','week');
        

        newsocket.on('realTimeSensorData', newData => {

            // console.log('newData : ',newData);
        
        try {
            // if(newData && newData.length > 0 && newData[150][selectedItem.name]  ) {
            if(newData ) {

            // console.log(newData[0][selectedItem.name][selectedItem.measure]);
            data.current = newData; 
            // console.log('newData : ',newData);
            
            }
        } catch(error) {
            // console.error("Error processing newData:", error);
            // Handle the error here, if needed
        }
        // data.current = newData[1500][selectedItem.name][selectedItem.measure];
        // setData(newData);
        return () => {
            newsocket.disconnect();
        };
        });

        

        // console.log(data.current);

        
        socket.current = newsocket
        // setSocket(newsocket);
    },[]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // setChartData(data.current);
            // if(data.current && data.current.length > 0){
            if(data.current ){
            // val.current = 
            // setChartData(data.current[data.current.length - 1])
            setChartData(data.current)
            // console.log('max',selectedItem.max);

            // console.log(data.current);
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

    return (
        <View style={styles.container}>
        
        <View style = {styles.headerBox}>
            <View style={styles.numBox}>
                <Text style = {styles.num}>15</Text>
                <Text style = {styles.numTitle}>No. of Devices</Text>
            </View>

            <View style = {styles.detailBox}>
                <Text style = {styles.plantName}>Plant Name : <Text style={styles.ul}>CNG_Delhi</Text></Text>
                <Text style = {styles.loc}>Location : <Text style={styles.ul}>Burari, Delhi</Text></Text>
                <Text style = {styles.opHead}>Operation Head : <Text style={styles.ul}>xyz</Text></Text>
            </View>
        </View>
      
        <ScrollView contentContainerStyle = {styles.chartCompCont}>
            {data.current && 
                SensorsList.map((sensor) => {
                    const sensorData = data.current[sensor.name];
                    if (!sensorData) return null;

                    const sensorMeasureValue = sensorData[sensor.measure];
                    const fillValue = (sensorMeasureValue / sensor.max) * 100;
                    const tintColor = getColor(fillValue, -1);
                    const key = sensor.id;
                    return (
                        <>
                            {Object.keys(data.current).length !== 0   && (
                                <TouchableOpacity style={styles.chartCompBox} onPress={() => {
                                    console.log(sensor.displayName);
                                    navigation.navigate('DetailPage', {
                                        sensor,
                                    })
                                }}>
                                    <Text style={styles.title}>{sensor.displayName.toString()}</Text>
                                    
                                    {/* chart */}
                                    <AnimatedCircularProgress
                                        key={key}
                                        style={styles.chartComp}
                                        size={100}
                                        arcSweepAngle={90+90}
                                        rotation={90+90+90}
                                        width={15}
                                        lineCap='round'
                                        fill={fillValue}
                                        tintColor={tintColor}
                                        duration={1000}
                                        backgroundColor='#3d5875'
                                    />
                                    <Text style = {styles.measure}> {sensorMeasureValue.toString()}</Text>
                                
                                </TouchableOpacity>
                            )}
                        </>
                        )
                    })
            }
        </ScrollView>


        </View>
    )
}

export default ChartCollectionView

const styles = StyleSheet.create({
    headerBox : {
        flexDirection : 'row',
        width : '100%',
        height : 90,
        borderBottomWidth : 1,
        paddingHorizontal : 20,
    },
    numBox : {
        width : 120,
        height : '100%',
        // borderRightWidth : 1,
       
        justifyContent : 'space-evenly',
        alignItems : 'center',
       
        // marginVertical:10
    },
    num : {
        textAlign : 'center',
        verticalAlign : 'middle',
        width : 50,
        height : 50,
        elevation : 7,
        backgroundColor : '#ffffff',
        borderRadius : 25,
        fontWeight : 'bold',
        fontSize : 22,
        padding:10,
        color : '#8a2e38',
    },
    detailBox : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-end'
    },
    plantName : {
        fontSize : 16,
        color : 'blue',
        fontWeight : 'bold',
        letterSpacing : 1.7
    },
    loc : {
        fontSize : 16,
        color : 'red',
        fontWeight : 'bold',
        letterSpacing : 2
    },
    opHead : {
        fontSize : 16,
        color : 'green',
        fontWeight : 'bold',
        letterSpacing : 3.2
    },

    ul : {
        textDecorationLine:'underline',
    },
    container : {
        flex : 1,   
        borderBottomWidth : 1,
        // justifyContent : 'center',
        // alignItems : 'center',
        overflow : 'scroll',
        paddingVertical : 10
    },
    // chartCompBox : {
    //     flex : 1
    // },
    chartCompCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: MARGIN,
        marginVertical : 7,
        justifyContent: 'space-between',  // To add space between items
    },
    chartCompBox: {
        height: 120,
        borderWidth: 1,
        borderColor : '#bdcdb8',
        borderRadius: 15,
        marginLeft: MARGIN,
        marginTop: MARGIN,
        width: vw(99) / COLUMNS - SPACING
    },
    chartComp : {
        position : 'relative',
        top : 10,
        alignSelf : 'center'
    },
    title : {
      position : 'relative',
      color : '#000000',
      top : 5,
      textAlign : 'center',
      fontSize : 12,
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