import React, { Component } from "react";
import { TouchableOpacity, View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Container, Content, Header, Body, Right, Icon, H3, Text, Button, Spinner } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import Modal from "react-native-modal";

// Action
import { getDetailTransaction, finishTransaction } from "../_actions/transaction";

import { theme, container, borderRadius, textCenter, uppercase, backgroundGray, textBold } from "../constants/styles";
import OrderList from "./OrderList";
import DetailTransaction from "./DetailTransaction";

class Bill extends Component {

  toggleModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  
  constructor() {
    super();

    this.state = {
      headersConfig: {},
      buttonDisabled: false,
      isModalVisible1: false,
    }
  }
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    const headersConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    this.setState({
      headersConfig
    });

    await this.getBill(headersConfig);

    this.checkOrders();
    setInterval(() => {
      this.checkOrders();
    }, 1000);
  }

  getBill = async (headers) => {
    await this.props.dispatch(getDetailTransaction(headers));
  }

  checkOrders = () => {
    if (this.props.orders.length < 1) {
      this.setState({
        buttonDisabled: true
      });
    } else {
      const statusFalse = this.props.orders.filter(val => val.status == 0)
      if (statusFalse.length > 0) {
        this.setState({
          buttonDisabled: true
        });
      } else {
        this.setState({
          buttonDisabled: false
        });
      }
    }
  }

  _handleCall = async () => {
    const data = {
      ...this.props.transaction,
      finishedTime: this.props.timer
    }

    try {
      await this.props.dispatch(finishTransaction(data, this.state.headersConfig));
    
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('tableNum');

      this.props.navigation.navigate('Finished');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      
      <Container style={{backgroundColor: 'white', borderRadius: 15}}>
        <Header style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: '#f3f3f3', height: 50}} androidStatusBarColor={theme.color.grey}>
          <Body>
            <Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 17}}>Bills</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.props._toggleModal}>
              <Icon name="md-close" style={{color: '#fca8a8'}}/>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{height: 1, backgroundColor:'#d5d5d5'}}/>
        <View style={{height: 30, flexDirection: 'row'}}>
          <View style={{flex: .9, backgroundColor: '#f3f3f3', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'OpenSans-Semibold', marginLeft: 4}}>
              Status
            </Text>
          </View>
          <View style={{flex: 1.9, backgroundColor: '#f3f3f3', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'OpenSans-Semibold'}}>
              Name
            </Text>
          </View>
          <View style={{flex: .5, backgroundColor: '#f3f3f3', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'OpenSans-Semibold'}}>
              Qty
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#f3f3f3', alignItems: 'center'}}>
            <Text style={{fontFamily: 'OpenSans-Semibold'}}>
              Price
            </Text>
          </View>
        </View>
        <View style={{height: 1, backgroundColor:'#d5d5d5'}}/>
        <View style={{flex: 1, borderRadius: 15}}>
          <View style={[container, {flex: 2.7}]}>
            {/* {this.props.isLoading && (
              <View>
                <ActivityIndicator color={theme.color.primary} />
              </View>
            )} */}

            {this.props.orders && (
              <FlatList
                data={this.props.orders}
                renderItem={({item}) => (<OrderList data={item} />)}
                keyExtractor={item => item.id.toString()}
              />
            )}
            
            {this.props.orders.length < 1 && (
              <View style={styles.void}>
                <H3 style={[textCenter,{fontFamily: 'OpenSans'}]}>Your bill is empty</H3>
              </View>
            )}
          </View>
          <View style={{marginBottom: 0}}>
            <DetailTransaction data={this.props.transaction} />
            <Button disabled={this.state.buttonDisabled} full onPress={this._handleCall} style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15 ,backgroundColor: (this.state.buttonDisabled ? theme.color.grey : theme.color.primary)}}>
              <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 18}} uppercase={false}>Pay Now</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.transaction.orders,
    transaction: state.transaction.transaction,
    isLoading: state.transaction.isLoading,
    message: state.transaction.message,
    timer: state.timer
  }
}

export default connect(mapStateToProps)(Bill);

const styles =  StyleSheet.create({
  void: {
    flex: 1, 
    paddingVertical: 50
  },
  transactionContainer: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "flex-end"
  }
})
