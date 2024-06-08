import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FlactIconList from '../components/FlactIconList'
import ChartView from '../components/ChartView';

import SensorsList from '../data/SensorList';
import ControlView from '../components/ControlView';
import ChartCollectionView from '../components/ChartCollectionView';



// import socketService from '../utils/socketService';
// const socket = socketI0Client("http://192.168.1.107:8001/");
const Home = () => {

  // const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(SensorsList[3]);

  // const [socket, setSocket] = useState(null);
  console.log("Home");
  
 

  const handleSelectedItem = (item) => {
    setSelectedItem(item)

    // console.log("xAxis : ",xAxis.length);
    
  }
  return (
    <SafeAreaView style = {styles.container}>
      {/* <FlactIconList onSelect={handleSelectedItem}/> */}
      {/* <Text style = {styles.selectedTitle}>{selectedItem.measure}</Text> */}
      {/* <ChartView itemDetail={data} selectedItem={selectedItem.name}/> */}
      {/* <ChartView xAxis={xAxis} yAxis={yAxis}/> */}
      {/* <ControlView selectedItem = {selectedItem}/>
      <ChartView selectedItem = {selectedItem}/> */}
      <ChartCollectionView selectedItem = {selectedItem} />

    </SafeAreaView>
  )
}



export default Home

const styles = StyleSheet.create({

  container : {
    flex : 1
  },
  
  
  selectedTitle : {
    textTransform : 'uppercase',
    borderRadius : 5,
    paddingVertical : 3,
    marginVertical : 5,
    marginHorizontal : 10,
    color : '#000000',
    textAlign : 'center',
    fontSize : 24,
    fontWeight : 'bold',
    backgroundColor : '#ebedee',
    elevation : 5
  }
})