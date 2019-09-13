import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Badge, Thumbnail } from "native-base";
import { connect } from "react-redux";

import { updateOrderQty } from "../_actions/orders";

class OrderItem extends Component {

  _handleMinOrders = async (data) => {
    let orders = this.props.orders;

    const index = orders.findIndex(item => {
      return item.id == data.id
    });

    let orderData = orders[index];
    if (orderData.qty > 1) {
      let incQty = orderData.qty - 1;
      let incOrder = {
        ...orderData,
        qty: incQty
      }

      orders[index] = incOrder;
    } else {
      orders.splice(index, 1);
    }
    await this.props.dispatch(updateOrderQty(orders));
  }
  
  render() {
    const {data} = this.props;
    const {image, qty} = data;

    return (
      <TouchableOpacity onPress={() => this._handleMinOrders(data)} style={styles.orderContainer}>
        <Thumbnail large source={{ uri: image }} />
        <Badge success style={styles.badge}>
          <Text>{qty}</Text>
        </Badge>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders
  }
}

export default connect(mapStateToProps)(OrderItem);

const styles = StyleSheet.create({
  orderContainer: {
    paddingHorizontal: 5,
    paddingTop: 5
  },
  badge: {
    top: 0, 
    right: 0,
    position: "absolute"
  }
})
