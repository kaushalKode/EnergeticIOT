import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'


import ChartView from '../components/ChartView';

import SensorsList from '../data/SensorList';
import ControlView from '../components/ControlView';

const DetailPage = ({route}) => {

  console.log("Detail page");
  

  const selectedItemData = route.params.sensor;

  console.log(selectedItemData);
  
  return (
    <SafeAreaView style = {styles.container}>
    
    <ControlView selectedItem = {selectedItemData}/>
    <ChartView selectedItem = {selectedItemData}/>
    
  </SafeAreaView>
)
}

export default DetailPage

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