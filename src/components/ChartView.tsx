/* eslint-disable react/react-in-jsx-scope */
import {useRef, useEffect, useState} from 'react';
import * as echarts from 'echarts/core';
import {BarChart, LineChart} from 'echarts/charts';
import {GridComponent, LegendComponent} from 'echarts/components';
import {SVGRenderer, SvgChart} from '@wuba/react-native-echarts';
import {Button, StyleSheet, Text,  TouchableOpacity, Modal, View} from 'react-native';


import { PushNotification } from 'react-native';

import SensorsList from '../data/SensorList';
// socket app
import socketI0Client from "socket.io-client";


import CalendarPicker from 'react-native-calendar-picker';

import {IP} from '@env'

echarts.use([SVGRenderer, BarChart, LineChart, LegendComponent, GridComponent]);

// import { BarChart } from 'react-native-chart-kit'

const transparent = 'rgba(0,0,0,0.5)'

function run(myChart, data, cat) {
    // console.log(cat);
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: cat,
      },
      series: [
        {
          type: 'line',
          data,
        },
      ],
    });
  }
  let svgChart;
        let svgInter;
  
  function getDefaultOption(data, cat, name) {
    return {
      yAxis: {
        // max: 'dataMax',
      },
      xAxis: {
        type: 'category',
        data: cat,
  
        // inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        // max: 2,
      },
      series: [
        {
          realtimeSort: true,
          name,
          type: 'line',
          data,
          // label: {
          //   show: true,
          //   position: 'top',
          //   // valueAnimation: true,
          // },
        },
      ],
  
      legend: {
        show: true,
      },
      animationDuration: 0,
      animationDurationUpdate: 1000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
    };
  }

const ChartView = (props) => {  
  
  console.log('chartView');

  // const minDate = new Date();
  const maxDate = new Date()

  const [openModal, setOpenModal] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)

  const [StartDate, setStartDate] = useState(new Date())
  const [EndDate, setEndDate] = useState(new Date())

  const onDateChange = (date, type) => {
    console.log(JSON.stringify(date));
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length - 1)
    const dates = newDate1.split("T")
    const date1 = dates[0].split("-")
    const day = parseInt(date1[2],10)
    const month = parseInt(date1[1],10)
    const year = parseInt(date1[0],10)

    const d = new Date(year,month-1,day)
    // const d1 = new Date(newDate)

    console.log('d : ',month);

    if (type == 'END_DATE') {
      if (day == undefined) {
        setSelectedEndDate(null);
      } else {
        setEndDate(d)
        setSelectedEndDate(day + "/" + month + "/" +year)
      }
    } else {
      setStartDate(d)
      setSelectedStartDate(day + "/" + month + "/" +year)
    }

    // console.log(`Start Date : ${selectedStartDate}`);
    // console.log(`End Date : ${selectedEndDate}`);

  }


  function renderModal() {
    return (
      <Modal visible={openModal} animationType='slide' transparent={true}>
         <View
          style = {{
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center',
            backgroundColor: transparent
          }}
         >
          
          <View
            style = {{
              backgroundColor : 'white',
              padding : 15,
              // width : '90%',
              borderRadius : 10,
            }}
          >
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Text style={{color : 'black', marginBottom : 10, marginEnd : 15, textAlign : 'right'}}>❌</Text>
            </TouchableOpacity>
              {/* <Text>MOdal</Text> */}
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                // minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
              />

            <TouchableOpacity onPress={() => {
              setOpenModal(false); 
              console.log();

              if (socket.current && selectedStartDate && selectedEndDate) {socket.current.emit('dateRange', StartDate, EndDate);}
              // console.log('emitted duration : '+selectedStartDate+":"+selectedEndDate);
              setSelect('calendar')
            }}>
              <Text style={{textAlign : 'center', color:'black', marginTop : 10}}>Submit</Text>
            </TouchableOpacity>
          </View>

         </View>
      </Modal>
    )
  }
  
  const [chartData, setChartData] = useState([]);
  const [select, setSelect] = useState(null)
  // const [data, setData] = useState([]);
  // const [yAxis, setyAxis] = useState([]);
  // const selectedItem = props.selectedItem;
  // const [socket, setSocket] = useState(null);

  const data = useRef([])
  const socket = useRef(null)
  // console.log(data.current.length);
  
  

  // // socket connection
  useEffect(() => {

    // console.log(socket);
    const newsocket = socketI0Client(`http://${IP}:8001/`);
    console.log('initiating socket connection for chartView.');

    newsocket.emit('duration','min');

    newsocket.on('DataFromLastInterval', newData => {
      console.log("data Length",newData.length);
      
      
      data.current = newData;
      // setData(newData);
      return () => {
        newsocket.disconnect();
      };
    });

    // console.log(data.current.length);

    
    socket.current = newsocket
    // setSocket(newsocket);
  }, [props.selectedItem]);

    const svgRef = useRef(null);
    // chart config.
    useEffect(() => {
      const intervalId = setInterval(() => {
        setChartData(data.current);

      }, 1500); // 1000 milliseconds = 1 second
      // const skiaChartData = getData();
      // Svg
      // const svgChartData = getData();
  
      const istOffset = 5.5 * 60 * 60 * 1000;
      const svgChartCat = data.current.map(item => {
        const date = new Date(new Date(item.createdAt).getTime() - istOffset);
        const day = date.getDate();
        
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        const month = monthNames[date.getMonth()];

        // console.log(date);
        
  
        // return `${minutes}:${minutes < 10 ? '0' : ''}${minutes}`;
  
        if(select === 'min') {
          return `${minutes}:${seconds}`;
        } else if(select === 'hour') {
          return `${hours}:${minutes}`;
        } else if(select === 'day') {
          return `${day}:(${hours}:${minutes})`;
        } else if(select === 'week') {
          return `${day}:(${hours})`;
        } else if(select === 'month') {
          return `${day}:${month}`;
        } else if(select === 'quarter') {
          return `${day}:${month}`;
        } else if(select === 'year') {
          return `${month}:${year}`;
        } else if(select === 'calendar'){
          return `${day}:${month}:${year}`;
        }
      });
      // const svgChartData = data.map(item => item['DHT11']['tempC']);
      const svgChartData = data.current.map(item => {
                            let temp = 0;
                            if (
                              item[props.selectedItem.name] &&
                              item[props.selectedItem.name][props.selectedItem.measure]
                            ) {
                              temp = item[props.selectedItem.name][props.selectedItem.measure];
                              return temp;
                            } else {
                              // console.error("Invalid data format:", item);
                              return temp ? temp : props.selectedItem.default; // or any default value
                            }
                          });;
      // console.log(data[0]);
      // console.log(data.current.length);
      
      let svgChart;
      let svgInter;
  
      if (svgRef.current) {
        svgChart = echarts.init(svgRef.current, 'light', {
          renderer: 'svg',
          width: 400,
          
          height: 330,
        });
        svgChart.setOption(getDefaultOption(svgChartData, svgChartCat, props.selectedItem.name));
  
        setTimeout(function () {
          run(svgChart, svgChartData, svgChartCat);
        }, 0);
        svgInter = setInterval(function () {
          run(svgChart, svgChartData, svgChartCat);
        }, 1000);
      }
  
      
      return () => {
        if (svgChart) {
          svgChart.dispose(); // Dispose only if chart instance exists
        }
        clearInterval(svgInter);
        clearInterval(intervalId);
      };
    }, [data.current]);
  
    return (
        <View style={styles.chartContainer}>

          <View style = {styles.filterRow}>

            <View style={styles.filterBox}>
              <TouchableOpacity
                
                onPress={()=>{
                  if (socket.current) {socket.current.emit('duration', 'min');}
                  console.log('emitted duration min');
                  setSelect('min');
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                }}
              >
                <Text style={select === 'min' ? styles.select : styles.filterBtn}>Minute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  if (socket.current) {socket.current.emit('duration', 'hour');}
                  console.log('emitted duration hour');
                  setSelect('hour');
                  
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                }}
              >
                <Text style={select === 'hour' ? styles.select : styles.filterBtn}>Hour</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  if (socket.current) {socket.current.emit('duration', 'day');}
                  console.log('emitted duration day');
                  setSelect('day');
                  
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                }}
              >
                <Text style={select === 'day' ? styles.select : styles.filterBtn}>Day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  if (socket.current) {socket.current.emit('duration', 'week');}
                  console.log('emitted duration week');
                  setSelect('week');
                  
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                }}
              >
                <Text style={select === 'week' ? styles.select : styles.filterBtn}>Week</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => { setOpenModal(true) }}
            >
              <Text
                style={{
                  color: 'black',
                  fontSize: 24
                }}
              >
                📅</Text>
            </TouchableOpacity>
          </View>

        <SvgChart style={styles.chartComp} ref={svgRef} />

        {selectedStartDate && selectedEndDate && 
        <Text style = {styles.dateRangeText}>
          Date Range : {selectedStartDate}  to  {selectedEndDate}
        </Text>
        }

        {renderModal()}
        
        </View>
    );
}
 
export default ChartView

const styles = StyleSheet.create({
  dateRangeText : {
    textAlign : 'center',
    fontWeight : 'bold',
    borderWidth : 1,
    paddingVertical : 10
  },
  modalBtn : {
    // marginTop: 20,
    backgroundColor: 'yellow',
    borderRadius: 8,
    padding: 5,
    marginVertical : 5,
    marginEnd : 15
  },

  filterRow : {
    // margin : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    borderBottomWidth : 1,
  },

  select : {
    marginLeft : 5,
    marginTop : 5,
    borderWidth : 0.5,
    paddingHorizontal : 5,
    color : '#000000',
    borderRadius : 4,
    fontWeight : 'bold',
    fontSize : 16,
    backgroundColor : '#fffb90'
  },
  chartContainer : {
    // paddingHorizontal : 15
    flex : 1.2,
    // margin : 10,
    // justifyContent : 'center',
    // alignItems : 'center'
  },
  filterBox : {
    flexDirection : 'row',
    justifyContent : 'flex-start',
    paddingVertical : 10
  },
  filterBtn : {
    marginLeft : 5,
    marginTop : 5,
    // borderWidth : 1,
    paddingHorizontal : 5,
    color : '#000000',
    borderRadius : 4,
    fontWeight : 'bold',
    fontSize : 16,
    backgroundColor : '#fdfbd4'
  },
  chartComp : {
    // width : 'auto'
  }
})



// const styles = StyleSheet.create({
//     container : {
//         flex : 1,
//         justifyContent : 'center',
//         alignItems : 'center',
//         borderWidth : 1,
//         borderColor : 'red'
//     },
//     bgImg : {
        
//         flex : 1,
//         width : '100%',
//         justifyContent : 'center',
//         alignItems : 'center',
//         // opacity : 0.1
//     }
// })