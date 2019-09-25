const initialState = {
  orders: [],
  isLoading: false,
  message: ''
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload
        ]
      };

    case 'UPDATE_ORDER_QTY': 
      return {
        ...state,
        orders: [
          ...action.payload
        ]
      };

    case 'SEND_ORDERS_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'SEND_ORDERS_FULFILLED':
        return {
          ...state,
          isLoading: false
        };

    case 'SEND_ORDERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        message: 'Unable to send data'
      };

    case 'TRUNCATE_ORDERS': 
      return {
        ...state,
        orders: []
      }
  
    default:
      return state;
  }
}

export default orders;