import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React from 'react';
import CommonCard from '../components/CommorCard';
const data = [
  {
    title: 'Sensors',
    screen : 'PlantSearch',
    icon: require('../assets/star.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Truck Management',
    screen : 'PlantSearch',
    icon: require('../assets/snooze.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Site Map',
    screen : 'PlantSearch',
    icon: require('../assets/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Visitor Management',
    screen : 'PlantSearch',
    icon: require('../assets/send.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Raise Ticket',
    screen : 'PlantSearch',
    icon: require('../assets/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Raise Alerts',
    screen : 'PlantSearch',
    icon: require('../assets/checkbox.png'),
    isNew: false,
    count: 2,
  },
];
const CustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1, paddingVertical:10}}>
        {/* <Text
          style={{
            textAlign:'center',
            alignItems:'center',
            justifyContent: 'center',
            color: 'red',
            fontSize: 27,
            fontWeight: '700',
          }}>
          
        </Text> */}

        <Image
          source={require('../assets/ever.png')}
          style={{
            width: 'auto',
            height: 90,
            resizeMode : 'contain'
            
            
          }}
        />
        <View
          style={{
            width: '100%',
            marginTop: 20,
            height: 70,
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
            borderBottomColor: '#C7C7C7',
            borderTopColor: '#C7C7C7',
          }}>
          <CommonCard
            icon={require('../assets/checkbox.png')}
            count={''}
            title={'Home Page'}
            onClick={() => {
                navigation.navigate('PlantSearch')
              navigation.closeDrawer();
            }}
          />
        </View>
        
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontSize: 17,
            fontWeight: '700',
            color: '#8e8e8e',
          }}>
          ALL Services
        </Text>

        <FlatList
          style={{
            height:'auto',
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
          }}
          data={data}
          renderItem={({item, index}) => {
            return (
              <CommonCard
                title={item.title}
                icon={item.icon}
                // count={item.count + '+'}
                onClick={() => {
                  navigation.navigate(item.screen)
                  navigation.closeDrawer();
                //   alert('title :' + item.title);
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
