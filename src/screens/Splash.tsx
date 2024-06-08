import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

// const imgPath = require('../assets/Everenviro Logo-01.png')

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Main');
        },2000)
    },[])
  return (
    <View style = {styles.splashCont}>
      <Image
          source={require('../assets/ever.png')}
          style={styles.itemImg}
      />
      <Text style = {styles.title}>IOT Application</Text>
    </View>
  )
}


export default Splash

const styles = StyleSheet.create({
  splashCont : {
    flex : 1,
    justifyContent : 'center',
    alignContent : 'center',
    backgroundColor : '#764ba2'
  },
  itemImg : {
    width: 'auto',
    height: 150,
  },
  title : {
    marginTop : 10,
    fontSize : 34,
    textAlign : 'center',
    fontWeight : 'bold',
    color : '#ffffff'
  }
})
