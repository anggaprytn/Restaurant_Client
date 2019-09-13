const initialState = {
  token: "",
  tableNum: 0,
  orders: [],
  transaction: {},
  isLoading: false,
  message: ''
}

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_TABLE_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'REGISTER_TABLE_FULFILLED': 
      return {
        ...state,
        isLoading: false,
        token: action.payload.data.token,
        tableNum: action.payload.data.tableNumber
      }
    
    case 'REGISTER_TABLE_REJECTED': 
      return {
        ...state,
        isLoading: false,
        message: 'Failed to register table! Try again!'
      }

    case 'GET_DETAIL_TRANSACTION_PENDING': 
      return {
        ...state,
        isLoading: true
      }

    case 'GET_DETAIL_TRANSACTION_FULFILLED':
      return {
        ...state,
        isLoading: false,
        orders: action.payload.data.orders,
        transaction: action.payload.data.detailTransaction
      }

    case 'GET_DETAIL_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: true,
        message: 'Cannot get transaction'
      }

    case 'FINSIH_TRANSACTION_PENDING': 
      return {
        ...state,
        isLoading: true
      }

    case 'FINSIH_TRANSACTION_FULFILLED':
      return {
        ...state,
        isLoading: false,
        orders: [],
        transaction: {}
      }

    case 'FINISH_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: false,
        message: 'Cannot finsih your transaction'
      }
  
    default:
      return state;
  }
}

export default transaction;
