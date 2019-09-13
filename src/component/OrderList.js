import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { convertToRupiah } from "../constants/functions";
import { theme, floatLeft, uppercase, textRight } from "../constants/styles";

class OrderList extends Component {
  render() {
    const {data: {status, menu, qty, price}} = this.props;
    return (
      <View style={[floatLeft, styles.listItem]}>
        <View style={{flex: 1.6, backgroundColor: 'white', justifyContent: 'center'}}>
          {status ? (
            <Text style={[uppercase, styles.textSent, {fontFamily: 'OpenSans-Semibold', fontSize: 16}]}>Sent</Text>
          ) : (
            <Text style={[uppercase, {color: '#ff6528', fontFamily: 'OpenSans-Semibold', fontSize: 16}]}>Waiting</Text>
          )}
        </View>
        <View style={{flex: 3, backgroundColor: 'white'}}>
          <Text style={[uppercase, { fontFamily: 'OpenSans-Semibold'}]} numberOfLines={1}>{menu.name}</Text>
          <Text style={{fontFamily: 'OpenSans-Light'}}>{convertToRupiah(price)} X {qty}</Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={[textRight, {fontFamily: 'Lato-Medium'}]}>{convertToRupiah(price * qty)}</Text>
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
