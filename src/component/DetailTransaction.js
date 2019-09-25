import React, { Component } from 'react';
import { View, Text } from "react-native";

import { convertToRupiah } from "../constants/functions";
import { floatLeft, uppercase, textRight } from "../constants/styles";

class DetailTransaction extends Component {
  render() {
    const {subtotal, discount, service, tax, total} = this.props.data;
    
    return (
      
      <View style={{backgroundColor: '#f6f6f6'}}>
        
        <View style={[floatLeft, {borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'OpenSans', fontSize: 15}}>Subtotal</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textRight,{fontFamily: 'OpenSans', fontSize: 15}]}>{convertToRupiah(new Number(subtotal))}</Text>
          </View>
        </View>
        {/* <View style={[floatLeft, {borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text>Discount</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={textRight}>{convertToRupiah(new Number(discount))}</Text>
          </View>
        </View> */}
        <View style={[floatLeft, {borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'OpenSans', fontSize: 15}}>Service Charge (5.5%)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textRight,{fontFamily: 'OpenSans', fontSize: 15}]}>{convertToRupiah(new Number(service))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'OpenSans', fontSize: 15}}>TAX (10%)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textRight,{fontFamily: 'OpenSans', fontSize: 15}]}>{convertToRupiah(new Number(tax))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 16}}>TOTAL</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textRight,{fontFamily: 'OpenSans-Semibold', fontSize: 15}]}>{convertToRupiah(new Number(total))}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default DetailTransaction;
