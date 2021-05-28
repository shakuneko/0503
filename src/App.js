import {createContext} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import Home from "./page/Home";
import Product from './page/Product';
import Shopping from "./page/Shopping";
import Shop from "./page/Shop";
import Login from './page/Login'
import Register from './page/Register'


import { StoreProvider } from "./store";

export const StoreContext = createContext();
function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/shopping" component={Shopping} />
          <Route path="/Shop" component={Shop} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
  
        </Switch>
      </BrowserRouter>
    </StoreProvider>
    
  
  );
}

export default App;