import { TouchableOpacity, Modal, Button, Image, StyleSheet, Text, View, Animated, Dimensions, Pressable } from 'react-native';

import React, { useState, useRef, createRef } from 'react';


import Pinchable from 'react-native-pinchable';
import { Dropdown } from 'react-native-element-dropdown'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import CalendarPicker from 'react-native-calendar-picker'

import { IP } from '@env'




const tdata = {
  cng: ['delhi', 'bombay', 'pune'],
  power: ['patna', 'lucknow', 'delhi']
};

const img = '../assets/cngPlant.png'

const transparent = 'rgba(0,0,0,0.5)'

const PlantSearch = () => {

  console.log(IP);


  const navigation = useNavigation()

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [value, setValue] = useState(false);

  

  // console.log(Object.keys(tdata));


  const categories = Object.keys(tdata).map((key) => ({
    label: key,
    value: key
  }));

  const cities = selectedCategory && tdata[selectedCategory] ? tdata[selectedCategory].map((city) => ({
    label: city,
    value: city
  })) : [];

  

  return (

    <View style={styles.plantSearch}>

      

    
      


      {/* <Text>PlantSearch</Text> */}
      <View style={styles.dropdownCont}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}

          data={categories}

          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Plant Type"
          searchPlaceholder="Search..."
          value={selectedCategory}
          onChange={item => {
          
            
            setSelectedCategory(item['value']);
            setSelectedCity(null);  // Reset city selection when category changes
          
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}

          data={cities}

          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select location"
          searchPlaceholder="Search..."
          value={selectedCity}
          onChange={item => {
            
            setSelectedCity(item['value'])
          }}
        />

        <Pressable style = {styles.searchBtn}
          onPress={() => {
            if(selectedCategory === 'cng' && selectedCity === 'delhi') {
              setValue(true)
            } else {
              setValue(false)
            }
            console.log(`${selectedCategory} Plant of ${selectedCity} Location is selected`);
          }}
        >
          <Text style={styles.btn}>Search</Text>
        </Pressable>
      </View>
     

      {value && 
      
      <View style = {styles.imgCont}>
      <Pinchable>
        <TouchableOpacity onPress={() => {

          navigation.navigate('Sensors')
          console.log('plant Image clicked');
        }}>
          <Image style={styles.itemImg} source={require('../assets/cngPlant.png')}/>
        </TouchableOpacity>
      </Pinchable>
       
      </View>}

      <View style = {styles.footerImgCont}>
        <Image style = {styles.footerImg} source={require('../assets/ever.png')}/>
      </View>
    </View>
  )
}

export default PlantSearch

const height = 185;
const width = height * 2.072;

const styles = StyleSheet.create({
  plantSearch: {
    flex: 1
  },

  imgCont: {
    // top : 120,
    marginVertical: 25,
    height: 270,
    // borderWidth : 1,
    // flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImg: {
    // borderWidth : 1,
    width: width,
    height: height,
    // marginLeft: 10,
  },
  footerImgCont: {
    flex: 1,
    justifyContent: 'center',
  },
  footerImg: {
    width: 'auto',
    height: 130,
    resizeMode: 'cover'
  },
  dropdownCont: {
    flex: 1,
    // borderWidth : 1,
    justifyContent: 'space-around'
  },
  searchBtn: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    marginHorizontal: 80,
    paddingVertical: 7,
    borderRadius: 7,
  },
  btn: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  dropdown: {
    margin: 16,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})