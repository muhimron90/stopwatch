import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity, Image, Modal , Platform
} from 'react-native';

import {
    MonoText,
    Airfly,
    LatoText
} from '../../components/StyledText';
import moment from 'moment';

import { Ionicons } from '@expo/vector-icons';
import HandleBack from '../../components/backHandle';
import About from './About';
import AboutWeb from './AboutWeb';
const img ={
    timer : 1234567,
    laps : [1234, 2345, 3456 , 4567 , 5678 , 6789]
}



function Timer({interval , style }) {
     const pad = (n) => n < 10 ? '0' + n : n
    const duration = moment.duration(interval);
    const centiseconds = Math.floor(duration.milliseconds() / 10);
    return( 
        <View style={styles.MainTimer}>
        <LatoText style={[styles.TextStyle, style]}>
        {pad(duration.minutes())}:
        </LatoText>
        <LatoText style={[styles.TextStyle, style]}>{pad(duration.seconds())} </LatoText>
        <LatoText style={[styles.TextMiliSeconds ,style]}>`{pad(centiseconds)} </LatoText>
     </View>
         
    );
}

function RoundButton({title, color, backgroundColor , onPress , disabled , icon  }) {
    return (
         <View animation="bounce" style={styles.buttonRow} useNativeDriver>
                 
        <TouchableOpacity 
        onPress={() => !disabled && onPress()} 
        style={[styles.button,{backgroundColor : backgroundColor}]}
        activeOpacity={ disabled ?  1.0 : 0.3} >
         {/* <Ionicons name={title} size={32} color={color} /> */}
       <Ionicons name={icon}         color="#ecf0f1"  size={25} style={{ position: 'relative'}} />
         <Text style={{color}}>{title}</Text>
        </TouchableOpacity>
    </View>        

    )
}
function RoundButtonSmall({title, color, backgroundColor , onPress , disabled }) {
    return (
         <View style={styles.buttonRow}>
        <TouchableOpacity
         onPress={() => !disabled && onPress()} 
          activeOpacity={disabled ?  1.0 : 0.3} 
        onPress={onPress} style={[styles.smallButton,{backgroundColor : backgroundColor}]}>
      
            <Text style={{color}}>{title}</Text>
        </TouchableOpacity>
        </View>
    )
}
function ButtonRow({children}) {
    return (
    <View style={styles.buttonRow}>
        {children}
    </View>        
    )
}
function HeaderTitle ({size, color}) {
    return (
        <LatoText style={{fontSize : size, color : color}}>
           STOPWATCH
        </LatoText>
    );
}
//styles.lap
function Lap({number , interval , fastest, slowest }) {
   
    const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
    return (
        <View style={styles.lap}> 

     
            <Text style={lapStyle}>Lap {number} </Text>
            <Timer style={lapStyle} interval={interval} />
             
        </View>
    )
}

function LapTable({laps , timer}) {
    const finishedLaps = laps.slice(1)
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    if(finishedLaps.length >= 2){
        finishedLaps.forEach(lap => {
            if(lap < min) min = lap
            if(lap > max) max = lap
        });
    }
    return (
        <BoxView>
        <Text style={styles.titleBox}>Records</Text>
        <ScrollView style={styles.scrollView}>
        {laps.map((lap,index) => (
            <Lap number={laps.length - index} 
            key={laps.length - index} 
            interval={index === 0 ? timer + lap : lap}
            fastest={lap === min}
            slowest={lap === max}
             />
        ))}
        </ScrollView>
        </BoxView>
    )
}

function BoxView({children}) {
    return (
        <ScrollView style={styles.boxView}>
            {children}
        </ScrollView>
    )
}
class Home extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
        start : 0,
        now : 0,
        
        laps : [],
        isOpen : false,
       
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    start = () => {
        const now = new Date().getTime();
        this.setState({
            start : now,
            now,
            laps:[0]
        })
        this.timer = setInterval(() => {
            this.setState({now : new Date().getTime()})
        }, 100);
    }
     lap = () => {
    const timestamp = new Date().getTime()
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    })
  }
    stop = () => {
    clearInterval(this.timer)
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    })
  }
    reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    })
  }
  resume = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  toggleModal = () => {




       this.setState(prevState => ({
      isOpen:   !prevState.isOpen,
    }));
      console.log(this.state.isOpen);
  }
  
    renderModal = () => {
        if (Platform.OS === 'web') {
          return (
            <AboutWeb  animationType="fade" modalVisible={this.state.isOpen} onClose={this.toggleModal} />
        );
        }else {
        return (
            <About  animationType="fade" modalVisible={this.state.isOpen} onClose={this.toggleModal} />
        );
        }
    }


  render() {
      const {start, now , laps} = this.state;
      const timer = now - start;

    
      
    return (
        <HandleBack onBack={this.onBack}>
        
       
      <View style={styles.container}>
       
        <View style={styles.headerStyle}>
         <HeaderTitle size={26} color="#B3E5FC" />
        </View>
     
        <Timer  interval={laps.reduce((total, curr) => total + curr, 0) + timer} />
        {laps.length === 0 && (
            <ButtonRow>
             
            <RoundButton  
            title="RECORD" 
            color="#ecf0f1" 
            icon="ios-copy"
            style={styles.roundText}
            disabled />

            <RoundButton 
            title="START"
            color="#ecf0f1" 
             icon="ios-play"
            style={styles.roundText} 
            onPress={this.start}
            />
            </ButtonRow>

        )}
          {start > 0 && ( 
            <ButtonRow>
            <RoundButton  
            title="RECORD" 
            color="#ecf0f1" 
            icon="ios-copy"
             style={styles.roundText}
            onPress={this.lap} />

            <RoundButton
            title="STOP"
            color="#ecf0f1" 
            icon = "ios-pause"
            style={styles.roundText} 
                onPress={this.stop}
            />

            </ButtonRow>
          )}
    
        {laps.length > 0 && start === 0 && ( 
             <ButtonRow>
            <RoundButton  
            title="RESET" 
            color="#ecf0f1" 
             icon = "ios-refresh"
            style={styles.roundText}
            onPress={this.reset} />

            <RoundButton
            title="RESUME"
            color="#ecf0f1" 
            icon = "ios-play"
            style={styles.roundText} 
                onPress={this.resume}
            />

            </ButtonRow>
        )}
       
           
       
        {this.renderModal()}
    
        
        
        <LapTable laps={laps} timer={timer} />
        <TouchableOpacity onPress={this.toggleModal}>
        <View style={{flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center', paddingTop : 10}}>
         
        <Text style={{ color : '#ecf0f1' , fontSize : 10}}>Design & Developer  - Muhamad Imron</Text>
       
        <Ionicons name='ios-contact' color="#ecf0f1" size={20} style={{ paddingLeft : 10,  position: 'relative'}} />
      
        </View>
          </TouchableOpacity>
       
      </View>
      
      
      
        
     
     
</HandleBack>
    );
  }
}
Home.navigationOptions = {
  header : null,
  
};
const styles = StyleSheet.create({
    container : {
        flex :1,
        alignItems: 'center',
         backgroundColor: '#37474F',
        paddingTop: '5%',
    },
    TextStyle : {
        color: '#42A5F5',
        fontSize : 72,
        fontWeight: '400',
    },
    MainTimer : {
     
        flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    TextMiliSeconds : {
        color: '#4FC3F7',
        fontSize : 32,
        fontWeight: '200',
        justifyContent : 'center',
        textAlign : 'center'
    },
    roundText : {
        fontSize : 22,
        fontWeight: 'bold',
        
        
    },
    smallRoundText : {
        fontSize : 18,
        fontWeight: 'bold',
        
        
    },
    button : {
       
        borderColor: '#FF8A65',
        borderRadius: 50,
        borderWidth: 2,
        height : 100,
        width : 100,
        justifyContent: 'center',
        alignItems: 'center',

    },
     smallButton: {
         borderColor: '#FF8A65',
         borderRadius: 50,
         borderWidth: 2,
         height: 75,
         width: 75,
         justifyContent: 'center',
         alignItems: 'center',
       
     },
    buttonRow : {
        paddingVertical : '3%',
        paddingLeft : 10,
        paddingRight : 10,
        flexDirection: 'row',
      
    },
    headerStyle : {
        height : '15%',
        paddingBottom : '5%'
    },
    lap : {
        flexDirection: 'row',
        justifyContent : 'space-around'
    },
    lapText : {
        color: 'rgba(255,255,255, 1)',
        fontSize : 16,
        fontWeight: '400',
        paddingVertical : 5
    },
    scrollView : {
        alignSelf : 'stretch',
       
    },
    boxView : {
       marginTop : 25,
        width : '55%',
        borderBottomWidth: 1,
        borderColor : 'rgba(255,255,255,1)',
        borderTopLeftRadius : 25,
        borderTopRightRadius: 25,
    },
    titleBox : {
        fontSize : 20,
        fontWeight: '600',
        textAlign : 'center',
        color : '#fff',
        borderBottomWidth: 1,
        borderBottomColor : '#fff',
        paddingBottom : 5
    },
    fastest: {
    color: '#689F38',
  },
    slowest: {
    color: '#E64A19',
  },
    timerContainer: {
    flexDirection: 'row',
  },
  lapTimer : {
      width : 30
  }
})
export default Home;
