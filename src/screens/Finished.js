import React, { Component } from "react";
import { View, Image, StyleSheet, StatusBar, TouchableOpacity, TouchableHighlight } from "react-native";
import { Container, Content, Button, H3, Text } from 'native-base';
import Modal from "react-native-modal";

import { theme, container, formGroup, centeredItems, pt5, textCenter, borderRadius } from "../constants/styles";

class Finished extends Component {
  constructor() {
    super();
    
    this.state = {
      isModalVisible1: false,
      isModalVisible2: true,
      isModalVisible3: false,
      isModalVisible4: false,
    }
  }
  
  _handleNavigate = () => {
    this.props.navigation.navigate('Splash');
  }

  toggleModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
    };

  toggleModal2 = () => {
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };

  toggleModal3 = () => {
    this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };

  toggleModal4 = () => {
    this.setState({ isModalVisible4: !this.state.isModalVisible4 });
    };

  render() {
    return (
      <Container>
        <Content style={[container]}>
          <StatusBar barStyle = "dark-content" backgroundColor="white"/>
          <View style={[centeredItems, {height: theme.dimensions.height}]}>
            {/* <View style={{flex: 10}}>
              <Image 
                source={require('../assets/images/thanks.png')} 
                style={styles.imageLogo}
              />
            </View> */}
        
            <View style={[formGroup, pt5]}>
              <Text style={[textCenter,{fontFamily: 'Montserrat-Regular', fontSize: 28}]}>Thank You :)</Text>
              <Text style={[textCenter,{fontFamily: 'Montserrat-Regular', fontSize: 19, marginTop: 5, color: '#a0a0a0'}]}>For your order</Text>
            </View>
        
            <View style={{widht: 100, height: 200, justifyContent: 'space-around', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
              <Button block onPress={this.toggleModal2} style={{backgroundColor:"#febb40", width: 200, borderRadius: 20}}>
                <Text style={{color: 'black', fontFamily: 'Montserrat-Regular'}} uppercase={false}>Pay at cashier</Text>
              </Button>
              <Button block onPress={this.toggleModal1} style={{backgroundColor:"#febb40", width: 200, borderRadius: 20}}>
                <Text style={{color: 'black', fontFamily: 'Montserrat-Regular'}} uppercase={false}>Call Waitress</Text>
              </Button>
              <Button block onPress={this.toggleModal4} style={{backgroundColor:"#febb40", width: 200, borderRadius: 20}}>
                <Text style={{color: 'black', fontFamily: 'Montserrat-Regular'}} uppercase={false}>Go Home</Text>
              </Button>
            </View>
          </View>
        </Content>

        <Modal   
      
          animationIn="zoomInDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          isVisible={this.state.isModalVisible1}>

          <View style={{height: 160, backgroundColor: 'white', borderRadius: 10}}>
            <StatusBar barStyle = "light-content" backgroundColor="black"/>
            <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20}}>Please wait...</Text>
            <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20}}>the Waitress will come to your table</Text>
            <View style={{bottom:0, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 15}}>
            <Button title="Hide modal" onPress={this.toggleModal1} style={{width: 100, borderRadius: 10, backgroundColor: '#febb40'}}>
              <Text style={{fontSize: 20, marginLeft: 12, color: 'black'}} uppercase={false}>
                Okay
              </Text>
            </Button>
            </View>
          </View>

        </Modal>

        <Modal   

          animationIn="zoomInDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          isVisible={this.state.isModalVisible2}>

          <View style={{height: 120, backgroundColor: 'white', borderRadius: 10}}>
            <StatusBar barStyle = "light-content" backgroundColor="black"/>
            <Text style={{fontSize: 20, marginTop: 15,alignSelf: 'center'}}>Come to the cashier to pay</Text>
            <View style={{bottom:0, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 20}}>
            <Button title="Hide modal" onPress={() => {
                 this.toggleModal2()
                 this.toggleModal3()
                }} style={{width: 130, borderRadius: 10, backgroundColor: '#febb40', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, color: 'black'}} uppercase={false}>
                Pay Now
              </Text>
            </Button>
            </View>
          </View>

        </Modal>

         <Modal   

          animationIn="zoomInDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          isVisible={this.state.isModalVisible3}>
<TouchableHighlight onPress={this.toggleModal3} >
          <View style={{height: 400, backgroundColor: 'white', borderRadius: 10}}>
            <StatusBar barStyle = "light-content" backgroundColor="black"/>
            
              <Image 
                  source={require('../assets/images/thanks.png')} 
                  style={{width: '100%',height: '100%'}}
                />
            
          </View>
          
           
            </TouchableHighlight>
        </Modal>

         <Modal   

          animationIn="zoomInDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          isVisible={this.state.isModalVisible4}>

          <View style={{height: 120, backgroundColor: 'white', borderRadius: 10}}>
            <StatusBar barStyle = "light-content" backgroundColor="black"/>
            <Text style={{fontSize: 20, marginTop: 15,alignSelf: 'center'}}>Wanna input table ?</Text>
            <View style={{bottom:0, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 20, flexDirection: 'row-reverse'}}>
            <Button title="Hide modal" onPress={() => {
                 
                 this._handleNavigate()
                }} style={{width: 100, borderRadius: 20, backgroundColor: '#febb40', justifyContent: 'center', marginHorizontal: 10 }}>
              <Text style={{fontSize: 20, color: 'black'}} uppercase={false}>
                Ok
              </Text>
            </Button>
            <Button title="Hide modal" onPress={() => {
                 this.toggleModal4()
               
                }} style={{width: 100, borderRadius: 20, backgroundColor: '#febb40', justifyContent: 'center', marginHorizontal: 10 }}>
              <Text style={{fontSize: 20, color: 'black'}} uppercase={false}>
                Back
              </Text>
            </Button>
            </View>
          </View>

        </Modal>


      </Container>
    )
  }
}

export default Finished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30, 
    height: theme.dimensions.height
  },
  imageLogo: {
    flex: 1, 
    width: theme.dimensions.width - 30, 
    height: 200, 
    resizeMode: 'contain'
  }
})
