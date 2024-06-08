import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import SensorsList from '../data/SensorList'

const FlactIconList = ({onSelect}) => {
  return (
    <View style={styles.containerBox}>
        <ScrollView horizontal style={styles.container}>
        {SensorsList.map((sensor) => {
            return(
                <TouchableOpacity style={styles.item} key={sensor.id} onPress={() => onSelect(sensor)}>
                    
                    <Image
                        source={sensor.img}
                        style={styles.itemImg}
                    />
                    <Text style={styles.itemName}>{sensor.measure}</Text>
                
                </TouchableOpacity>
            )
        })}
        </ScrollView>
    </View>

  )
}

export default FlactIconList

const styles = StyleSheet.create({
    containerBox : {
        paddingVertical : 2,
    },
    container : {
        height : 'auto',
    },
    item : {
        // padding: 4,
        // borderWidth:1,
        marginVertical : 15,
        marginLeft : 10,
        borderRadius : 8,
        borderTopEndRadius : 0,
        flex : 1,
        flexDirection : 'column',
        width : 75,
        height : 70,
        alignItems : 'center',
        justifyContent : 'space-evenly',

        elevation: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,  
    },
    itemImg : {
        // borderWidth : 1,
        width: 24,
        height: 24,
        
        // marginLeft: 10,
    },
    itemName : {
        fontSize : 10,
        fontWeight : 'bold',
        color : 'black',
        textAlign : 'center',
        overflow : 'hidden',
        
    }
})