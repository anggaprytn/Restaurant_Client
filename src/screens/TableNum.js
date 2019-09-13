import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Container, Content, Form, Item, Input, Icon, Button, H3, Text, Spinner} from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";

import { theme, container, formGroup, centeredItems, pt5, textCenter, borderRadius, backgroundGray, borderRadiusButton } from "../constants/styles";
import { regisTable } from "../_actions/transaction";
import config from '../config';

class TableNum extends Component {
  constructor() {
    super();
    this.state = {
      tableNum: 0,
      buttonDisabled: false,
      isModalVisible2: false
    }
  }

  componentDidMount() {
    this.setState({
      buttonDisabled: true
    });
  }

  _handleInput = (num) => {
    this.setState({
      tableNum: num
    });

    if (num !== '') {
      this.setState({
        buttonDisabled: false
      });
    } else {
      this.setState({
        buttonDisabled: true
      });
    }
  }

  _handleSubmit = async () => {
    if (this.state.tableNum == 0) {
      alert('Please insert your table number');
    } else {
      const data = {
        table: this.state.tableNum
      }

      try {
        await this.props.dispatch(regisTable(data));
        
        await AsyncStorage.setItem('token', this.props.token.toString());
        await AsyncStorage.setItem('tableNum', this.props.tableNum.toString());
        
        this.props.navigation.navigate('Main');
      } catch (err) {
        alert('Cannot register your table! \nPlease try again!');
        console.log(`${config.API_URL}`);
      }
    }
  }

  render() {
    return (
      <Container style={backgroundGray}>
        <StatusBar barStyle = "light-content" backgroundColor="gray"/>
        <Content style={[container]}>
          <View style={[centeredItems, styles.container]}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/banner.png')} 
                style={{width: '100%', height: 300, resizeMode: 'cover', marginTop: -40}}
              />
            </View>

            <View style={{
  paddingBottom: 15,
  paddingLeft: 0,
  backgroundColor: 'white',
  marginHorizontal: 25,
  marginTop: -100,
  height: 240,
  borderRadius: 20,
  elevation: 5
}}>
              <H3 style={{
  textAlign: "center",
  marginTop: 20,
  fontFamily: 'Montserrat-Regular'
}}>Welcome!</H3>
              <Text style={{
  textAlign: "center",
  marginTop: 10,
  fontFamily: 'OpenSans'
}}>Let we know where your table</Text>
            
          
            <Form style={[formGroup, styles.input]}>
              <Item regular style={borderRadius}>
                <Input maxLength={3} placeholder="Insert your table number here" keyboardType="numeric" onChangeText={this._handleInput} style={{textAlign: "center"}} />
              </Item>
            </Form>
          
            <View>
              <Button disabled={this.state.buttonDisabled} block onPress={this._handleSubmit} style={[{borderRadius: 5, marginHorizontal: 30}, {backgroundColor: (this.state.buttonDisabled ? theme.color.grey : theme.color.primary)}]}>
                {this.props.isLoading && (
                  <Spinner color="#fff" />
                )}
                {!this.props.isLoading && (
                  <Text style={{color: (this.state.buttonDisabled ? '#5a5a5a' : '#fff'), fontFamily: 'OpenSans-Semibold'}}>Order</Text>
                )}
              </Button>
            </View>
            </View>
          </View>
          
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.transaction.isLoading,
    token: state.transaction.token,
    tableNum: state.transaction.tableNum,
    message: state.transaction.message
  }
}

export default connect(mapStateToProps)(TableNum);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -121, 
    height: theme.dimensions.height
  },
  imageContainer: {
    height: 300
  },
  input: {
    paddingLeft: 0,
  }
})
