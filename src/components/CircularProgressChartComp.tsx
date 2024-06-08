import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {AnimatedCircularProgress} from 'react-native-circular-progress'


const CircularProgressChartComp = (props) => {
    // console.log('cpcc');
    
  return (
    
        <AnimatedCircularProgress
            key={props.key}
            style={props.style}
            size={100}
            arcSweepAngle={90+90}
            rotation={90+90+90}
            width={15}
            lineCap='round'
            fill={props.fill}
            tintColor={props.tintColor}
            duration={1000}
            backgroundColor='#3d5875'
        />
    
  )
}

export default CircularProgressChartComp

const styles = StyleSheet.create({})