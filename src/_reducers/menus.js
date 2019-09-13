const initialState = {
  menus: [],
  isLoading: false,
  message: ''
}

const menu = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MENUS_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'GET_MENUS_FULFILLED': 
      return {
        ...state,
        isLoading: false,
        menus: action.payload.data,
      }

    case 'GET_MENUS_REJECTED': 
      return {
        ...state,
        isLoading: false,
        message: 'Cannot get data menus'
      }
  
    default:
      return state;
  }
}

export default menu;
