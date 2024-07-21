import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './components/State_Manager/transactionReducer';
const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
