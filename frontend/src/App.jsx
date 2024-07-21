import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Import Redux store
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
