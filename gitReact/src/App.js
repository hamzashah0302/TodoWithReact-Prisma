import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { Router } from './components/routes/router';
import { BrowserRouter } from "react-router-dom";
import {store} from './components/store/store';


function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
