import React, { Component } from "react";
import { Image, TouchableOpacity, View, StyleSheet, ScrollView, TouchableHighlight, StatusBar } from "react-native";
import { Card, CardItem, Body, Right, Icon, Text, Button } from "native-base";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import { addNewOrders, updateOrderQty } from "../_actions/orders";
import { convertToRupiah, convertToMoney } from "../constants/functions";
import { theme, borderRadius, floatLeft } from "../constants/styles";

class MenuItem extends Component {

  constructor() {
    super()

    this.state = {isModalVisible1: false,}
  }

  state = {
    isModalVisible1: false,

  };

  toggleModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  toggleModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  _handleAddOrders = async (data) => {
    let orders = this.props.orders;
    const index = orders.findIndex(item => {
      return item.id == data.id
    });

    if (index >= 0) {
      let orderData = orders[index];
      let incQty = orderData.qty + 1;
      let incOrder = {
        ...orderData,
        qty: incQty
      }

      orders[index] = incOrder;
      await this.props.dispatch(updateOrderQty(orders));
    } else {
      data = {
        ...data, 
        qty: 1
      };
      await this.props.dispatch(addNewOrders(data));
    }
  }

  render() {
    const {data} = this.props;
    const {name, price, image, isStared} = data
    
    return (
      
      <ScrollView>
          <TouchableHighlight onPress={this.toggleModal1}>
            <View style={{flex: 1,backgroundColor: 'white', height: 110, flexDirection: 'row'}}>
            <View style={{flex: 0.7, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{ uri: image }} style={{height: 80, width: 80, alignSelf: 'center', borderRadius: 5, marginLeft: 0}} />
              </View>
              <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
                <View style={{flex: .6, backgroundColor: 'white'}}>
                  <Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 16, marginTop: 5}} numberOfLines={1}>{name}</Text>
                </View>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                  <Text numberOfLines={2} style={{color: '#585858', fontFamily: 'OpenSans'}}>Rasanya {name} enak banget jadi tambah laper</Text>
                </View>
                <View style={{flex: .6, backgroundColor: 'white', justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'OpenSans-Semibold'}}>{convertToMoney(price)}</Text>
                </View>
              </View>
              <View style={{flex: 0.5, backgroundColor: 'white', flexDirection: 'column'}}>
                <View style={{flex: 1, backgroundColor: 'white', alignItems: 'flex-end'}}>
                  {isStared ? 
                    (
                    <View>
                      <TouchableOpacity>
                        <Icon name="md-heart" style={{color: "#f20c0a", marginRight: 15, marginTop: 5}} />
                      </TouchableOpacity>
                      <View style={{position: 'absolute', top: 0, left: '-380%'}}>
                      <Image 
                        source={require('../assets/images/promo.gif')} 
                        style={{width: 69,height: 30}}
                        resizeMode="contain"
                       />	
                      </View>
                    </View>
                    ) : (
                    <TouchableOpacity>
                      <Icon name="md-heart" style={{color: "#e0e5e5", marginRight: 15, marginTop: 5}} />
                    </TouchableOpacity>
                    )}
                </View>
                <View style={{flex: 1, backgroundColor: 'white', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                
                    <Button style={{backgroundColor: '#44ab4a', borderRadius: 10, height: 32,width: 75, marginLeft: 0, marginRight: 10}}>
                    <TouchableOpacity  onPress={() => this._handleAddOrders(data)}>
                      <View>
                        
                        <Image  source={{ uri: image }} style={{height: 0, width: 0}} />
                        <Text style={{height: 0, width: 0}}>{name}</Text>
                        <Text style={{height: 0, width: 0}} >{convertToMoney(price)}</Text>
                        {isStared ? (<Text></Text>) : (<Text></Text>)}
                        <Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 15, marginBottom: 20}} uppercase={false}>Add +</Text>
                      </View>
                      </TouchableOpacity>
                    </Button>   
                </View>
              </View>            
            </View>
          </TouchableHighlight>
          <View style={{backgroundColor: '#b3b3b3', height: 1, width: '100%'}}/>
        <View style={{backgroundColor: '#ececec', height: 8, width: '100%'}}/>
         <Modal   

          onSwipeComplete={() => this.setState({ isModalVisible1: null })}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={styles.bottomModal}
          isVisible={this.state.isModalVisible1}>

          <View style={{flex: 0.9, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <View style={{alignItems: 'center', backgroundColor: 'white', height: 400, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
              <View style={{backgroundColor: '#dddddd', height: 3, width: 50, borderRadius: 5, marginTop: 8}}></View>
              <View style={{backgroundColor: '#dddddd', height: 3, width: 50, borderRadius: 5, marginTop: 3}}></View>
              {isStared ? 
                    (
                    <View>
                      <View style={{position: 'absolute', top: 10, left: '-48.5%', zIndex: 1}}>
                      <Image 
                        source={require('../assets/images/promo.gif')} 
                        style={{width: 137,height: 60}}
                        resizeMode="contain"
                       />	
                      </View>
                    </View>
                    ) : (
                    <View/>
                    )}
              <View style={{backgroundColor: 'white', flex: 1, width: '95%'}}>
                <Image source={{ uri: image }} style={{width: "88%", height: "88%", alignSelf: 'center', borderRadius: 5, marginTop: 35,  aspectRatio: 1.04}} />
              </View>
            </View>
            
            
            <StatusBar barStyle = "light-content" backgroundColor="black"/>
            <Text style={{fontSize: 18, marginTop: 5, marginHorizontal: 20, fontFamily:'OpenSans-Semibold'}}>{name}</Text>
            <Text style={{fontSize: 18, marginTop: 15, marginHorizontal: 20, fontFamily: 'OpenSans', color: '#646464'}}>Rasanya {name} enak banget jadi tambah laper</Text>
            <View style={{bottom:60, position: 'absolute', width: '90%', marginHorizontal: 20, flexDirection:'row', justifyContent: 'space-between', backgroundColor: 'white', flex: 1, borderTopWidth: 1, borderTopColor: 'black', borderStyle: 'dashed', borderTopColor: '#ececec'}}>
              <Text style={{fontSize: 18, fontFamily:'OpenSans-Semibold'}}>Dish Price</Text>
              <Text style={{fontSize: 18, fontFamily:'OpenSans-Semibold'}}>{convertToRupiah(price)}</Text>
            </View>
            <View style={{bottom:0, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginBottom: 10}}>
            <Button onPress={() => {
                 this._handleAddOrders(data)
                 this.toggleModal1()
                }} title="Hide modal" style={{width: '120%', borderRadius: 10, backgroundColor: '#44ab4a', justifyContent: 'center'}}>
               <TouchableOpacity onPress={() => {
                 this._handleAddOrders(data)
                 this.toggleModal1()
                }}>
                  
                    
                    <Image  source={{ uri: image }} style={{height: 0, width: 0}} />
                    <Text style={{height: 0, width: 0}}>{name}</Text>
                    <Text style={{height: 0, width: 0}} >{convertToMoney(price)}</Text>
                    {isStared ? (<Text></Text>) : (<Text></Text>)}
                    <Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 17, marginBottom: 20}} uppercase={false}>
                      Add to cart
                    </Text>
                  
                </TouchableOpacity>
            </Button>
            </View>
          </View>

        </Modal>
      </ScrollView>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    isLoading: state.orders.isLoading,
    message: state.orders.message
  }
}

export default connect(mapStateToProps)(MenuItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
});
