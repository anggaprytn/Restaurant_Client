import React, { Component } from 'react';
import { View, FlatList, Alert, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { Container, Header, Left, Right, Spinner, Tabs, Tab, Button, Text, ScrollableTab, Icon } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";

import MenuItem from "../../component/MenuItem";
import OrderItem from "../../component/OrderItem";
import Bill from "../../component/Bill";

import { getMenus } from "../../_actions/menus";
import { updateStatusOrders, sendOrders } from "../../_actions/orders";
import { getDetailTransaction } from "../../_actions/transaction";
import { incTimer } from "../../_actions/timer";

import { theme, container, borderRadius, floatLeft, backgroundGray, backgroundSecondary, backgroundPrimary } from "../../constants/styles";
import { convertToMinutes } from "../../constants/functions";

class Home extends Component {
  constructor() {
    super();
    
    this.state = {
      countdown: 0,
      tableNum: 0,
      menus: [{
        id: 1,
        name: "..."
      }],
      buttonCofirmColor: "#b5b5b5",
      isModalVisible: false,
      isModalVisible1: false,
      isModalVisible2: false,
    }
  }
  
  async componentDidMount() {
    const tableNum = await AsyncStorage.getItem('tableNum');

    await this.props.dispatch(getMenus());

    this.setState({
      tableNum,
      menus: this.props.menus
    });

    setInterval(() => {
      this.setState({
        countdown: this.state.countdown + 1
      });

      this.props.dispatch(incTimer());
    }, 1000);
  }


  _sendData = async () => {
    const {orders} = this.props;

    const token = await AsyncStorage.getItem('token');

    const headersConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await this.props.dispatch(sendOrders(orders, headersConfig));
    this._toggleModal();
    setTimeout(() => {
      this.props.dispatch(updateStatusOrders(headersConfig));
      this.getBill(headersConfig);
    }, 5000);
  }

  getBill = (headers) => {
    this.props.dispatch(getDetailTransaction(headers));
  }

  toggleModal2 = () => {
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });
  };

  toggleModal1 = () => {
  this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {

    return (
      <Container>
        <StatusBar barStyle = "light-content" backgroundColor="white"/>
        <Modal   

        animationIn="zoomInDown"   
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        isVisible={this.state.isModalVisible2}>

        <View style={{height: 160, backgroundColor: 'white', borderRadius: 10}}>
          <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20, fontWeight: 'bold'}}>Confirm order</Text>
          <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20, fontFamily: 'Lato-Regular'}}>are you sure to order this</Text>
          <View style={{bottom:5, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 10, flexDirection: "row-reverse"}}>
            <Button title="Hide modal" onPress={() => {
                 this._sendData()
                 this.toggleModal2()
                }} style={{width: 90, borderRadius: 25, height: 40, backgroundColor: theme.color.primary}}>
              <Text style={{fontSize: 20, marginLeft: 8}} uppercase={false}>
                Okay
              </Text>
            </Button>
            <Button title="Hide modal" onPress={this.toggleModal2} style={{width: 110, borderRadius: 25, height: 40, backgroundColor: theme.color.secondarybutton, marginRight: 20, marginLeft: 100}}>
              <Text style={{fontSize: 20, marginLeft: 7}} uppercase={false}>
                Cancel
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
          isVisible={this.state.isModalVisible1}>

          <View style={{height: 160, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20}}>Please wait...</Text>
            <Text style={{fontSize: 20, marginTop: 15, marginLeft: 20}}>the Waitress will come to your table</Text>
            <View style={{bottom:5, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 10}}>
            <Button title="Hide modal" onPress={this.toggleModal1} style={{width: 100, borderRadius: 25, height: 40, backgroundColor: theme.color.primary}}>
              <Text style={{fontSize: 20, marginLeft: 12}} uppercase={false}>
                Okay
              </Text>
            </Button>
            </View>
          </View>

        </Modal>
        
        <View style={styles.spaceBetween}>
            <View style={{flex: 4}}>
            
              <Header style={{backgroundColor: 'white', height: 40}}>
              <StatusBar barStyle = "dark-content" backgroundColor="white"/>
                <Left>
                  <Text style={{fontFamily: "OpenSans-Semibold", marginLeft: 5}}>{this.state.tableNum}</Text>
                </Left>
                <Right>
                  <Text style={{fontFamily: "OpenSans-Semibold", marginRight: 5}}>
                    {convertToMinutes(this.state.countdown)}
                  </Text>
                </Right>
              </Header>
            {this.props.isLoading && (
              <View>
                <Spinner color={theme.color.secondary} />
              </View>
            )}
            {!this.props.isLoading && (
              <Tabs renderTabBar={() => (<ScrollableTab />)} tabBarUnderlineStyle={{backgroundColor: theme.color.primary, height: 2}}>
                {this.state.menus && this.state.menus.map(category => (
                  <Tab 
                    key={category.id} 
                    heading={category.name}
                    textStyle={{color: '#848484',fontFamily:'OpenSans-Semibold'}}
                    activeTextStyle={{color: theme.color.primary,fontFamily:'OpenSans-Semibold'}}
                    tabStyle={backgroundSecondary}
                    activeTabStyle={backgroundSecondary}
                    backgroundColor={'white'}
                    
                  >
                    <FlatList
                      style={[container, styles.flatClear]}
                      data={category.menus}
                      numColumns={1}
                      renderItem={({item}) => (<MenuItem data={item} />)}
                      keyExtractor={item => item.id.toString()}
                      ListFooterComponentStyle={{paddingVertical: 100}}
                    />
                  </Tab>
                ))}
              </Tabs>
            )}
          </View>
          
          {this.props.orders.length > 0 && (
            <View style={{flexDirection: 'column', marginBottom: 5}}>
              <View >
                <View style={{backgroundColor: '#d5d5d5', height: 1}}/>
                <View style={{height: 5}}/>
                <View style={{height: 85}}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (<OrderItem data={item} />)}
                  />
                </View>
              </View>

              <View>
                <View style={{flexDirection:'row'}}>
                  
                    <Button disabled={this.props.orders.length > 0 ? false : true} onPress={this.toggleModal2} style={[borderRadius, {flex: 1, height: 40, marginHorizontal: 5, marginTop: 7, borderRadius: 30, height: 40, backgroundColor: (this.props.orders.length > 0 ? theme.color.primary : this.state.buttonCofirmColor)}]}>
                      {this.props.ordersLoading && (
                        <ActivityIndicator color="#fff" style={{marginLeft: 50}}/>
                      )}
                      {!this.props.ordersLoading && (
                        <Text style={{marginLeft: 5,fontFamily: 'Montserrat-Regular', fontSize: 15}}>Confirm</Text>
                      )}
                    </Button>
                  
                  
                    <Button onPress={this.toggleModal1} style={{flex: 1, marginHorizontal: 5, marginTop: 7, height: 40, borderRadius: 35, backgroundColor: 'white', borderWidth: 1, borderColor: theme.color.secondarybutton, height: 40}}>
                    <Icon name='md-hand' style={{left: 10, color: theme.color.secondarybutton}}/>
                      <Text  style={{left: -15, fontFamily: 'Montserrat-Regular', fontSize: 15, color: theme.color.secondarybutton}}>Call</Text>
                    </Button>
                    <Button onPress={this._toggleModal} style={{flex: 1, marginHorizontal: 5, marginTop: 7, height: 40, borderRadius: 35, backgroundColor: 'white', borderWidth: 1, borderColor: theme.color.secondarybutton, height: 40}}>
                    <Icon name='md-calculator' style={{left: -5, color: theme.color.secondarybutton}}/>
                      <Text  style={{left: -30, fontFamily: 'Montserrat-Regular', fontSize: 15, color: theme.color.secondarybutton}}>View Bill</Text>
                    </Button>
                </View>
              </View>
            </View>
          )}
        </View>

        <Modal
         animationIn="zoomInDown"
         animationInTiming={1000}
         animationOutTiming={1000}
         backdropTransitionInTiming={800}
         backdropTransitionOutTiming={800}
        isVisible={this.state.isModalVisible}>
          
          <Bill _toggleModal={this._toggleModal} navigation={this.props.navigation} />
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.menus.isLoading,
    menus: state.menus.menus,
    message: state.menus.message,
    orders: state.orders.orders,
    ordersLoading: state.orders.isLoading
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  spaceBetween: {
    flex:1, justifyContent: "space-between"
  },
  flatClear: {
    marginHorizontal: -5, 
    paddingTop: 5
  },
  row: {
    marginHorizontal: -6
  },
  col: {
    paddingHorizontal: 3
  },
  orderList: {
    flex: 1.2,
    paddingVertical: 5, 
    marginHorizontal: -10
  },
  orderContainer: {
    height: 130, 
    borderWidth: 1, 
    paddingVertical: 10,
    borderColor: '#dedede'
  }
})