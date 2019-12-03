import React, { Component } from 'react';
import { View, Text , StyleSheet, Modal, SafeAreaView ,TouchableOpacity, Dimensions , Image } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import {PropTypes} from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const warning = require('../../assets/images/warning.png');
import {
    MonoText,
    Airfly,
    LatoText
} from '../../components/StyledText';
const copy = `




| Apps :         | Stop Watch Apps |
| - | - |
| Developer :    | Muhamad Imron - (c) 2019 |

| Distribution : | Free |
| - | - |
| Email : | muh.imron90@gmail.com |

 
 > **Make something great today!**
-- --




`;
class About extends Component {
  

  render() {
   const {animationType, modalVisible} = this.props;
    return (
          <Modal animationType={animationType} transparent visible={modalVisible} 
          onRequestClose = {() => { console.log("Modal has been closed.") } }>          
          
     <View style={styles.wrapper}>

          <View style={styles.Content}>
          
          <View style={styles.Message}>

           
           <Image source={require('../../assets/images/imronavatar.png')} resizeMode="contain" style={[styles.Image]} />
     
        
       <Markdown style={[styles , styles.fontSize ]}>
       {copy}
       </Markdown>
       
       <TouchableOpacity onPress={this.props.onClose}>
         <Ionicons name='ios-close-circle' color="#e74c3c" size={50} style={{ padding : 10,  position: 'relative', marginBottom : 20}} />
        </TouchableOpacity>
         </View>
      </View>
      </View>
        </Modal>
    
    );
  }
}
About.navigationOptions = {
    header : null
    // title :"About Dev"
};
About.propTypes={
  
  animationType: PropTypes.string.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    
    // children: PropTypes.node
}
const styles = StyleSheet.create({
    heading: {
    textAlign : 'center',
    justifyContent : 'center',borderBottomColor : '#888', borderBottomWidth : 1
  },
  heading1: {
    fontSize: 26,
    
    color: '#000',
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  fontSize : {
    fontSize : 12
  },
  wrapper: {
    zIndex: 9,
    position: 'absolute',
    backgroundColor: 'rgba(0 , 0 , 0 , 0.3)',
    width: '100%',
    height: '100%',
    
    alignItems : 'center',
  },
  Content: {
    padding: 5,
    alignItems: 'center',
    marginTop :'10%'
  },
  Message: {
    maxWidth: '90%',
      width: '90%',
    minHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
Image: {
  width: 300,
  height: 150,
  position: 'relative',
  marginTop: 15,
  marginBottom : 15,
 
 
},
ImageBorder : {

},
Header: {
  height: 230,
  width: 230,
 
},
})
export default About;
