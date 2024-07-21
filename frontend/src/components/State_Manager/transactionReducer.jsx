// Initial state
const initialState = {
  transactions: [],
  filters: {
    type: '',
    category: '',
    currency: '',
    title: ''
  }
};

// Action 
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
const SET_FILTERS = 'SET_FILTERS';

// Reducer
const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default transactionReducer;
