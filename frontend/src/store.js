import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './components/State_Manager/transactionReducer';
// Create the Redux store with devtools support (built into configureStore)
const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools Extension
});

export default store;
