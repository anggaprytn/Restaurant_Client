const initialState = 0;

const timer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_TIMER':
      return state + 1;
  
    default:
      return state;
  }
}

export default timer;
