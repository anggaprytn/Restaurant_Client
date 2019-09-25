import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { convertToRupiah } from "../constants/functions";
import { theme, floatLeft, uppercase, textRight } from "../constants/styles";

class OrderList extends Component {
  render() {
    const {data: {status, menu, qty, price}} = this.props;
    return (
      <View style={[floatLeft, styles.listItem]}>
        <View style={{flex: .9, backgroundColor: 'white', justifyContent: 'center'}}>
          {status ? (
            <Text style={[uppercase, styles.textSent, {fontFamily: 'OpenSans-Semibold', fontSize: 16}]} numberOfLines={1}>Sent</Text>
          ) : (
            <Text style={[uppercase, {color: '#ff6528', fontFamily: 'OpenSans-Semibold', fontSize: 16}]} numberOfLines={1}>Waiting</Text>
          )}
        </View>
        <View style={{flex: 1.9, backgroundColor: 'white'}}>
          <Text style={[uppercase, { fontFamily: 'OpenSans-Semibold'}]} numberOfLines={1}>{menu.name}</Text>
        
        </View>
        <View style={{flex: .5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          
          <Text style={{fontFamily: 'OpenSans'}} numberOfLines={1}>{qty}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <Text style={[textRight, {fontFamily: 'Lato-Medium'}]} >{convertToRupiah(price * qty)}</Text>
        </View>
      </View>
    )
  }
}

export default OrderList;

const styles = StyleSheet.create({
  textSent: {
    color: theme.color.primary
  },
  textPending: {
    color: theme.color.secondary
  },
  listItem: {
    borderBottomColor: '#f6f5f5',
    borderBottomWidth: 1
  }
})
