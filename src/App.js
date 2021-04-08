import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter
} from "react-router-dom"
import { Provider } from "react-redux"
import Store from "./store"
import AdminRoute from "./components/AdminRoute"
import Dashboard from "./screens/Dashboard"
import NoMatch from "./screens/NoMatch"

function App() {
  return (
    <Provider store={Store}>
      <Router basename="/app" forceRefresh={false}>
        <Switch>
          <AdminRoute exact path="/" name="Dashboard" component={Dashboard} />
          <AdminRoute component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
