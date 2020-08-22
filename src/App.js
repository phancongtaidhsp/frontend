import React from 'react';
import logo from './logo.svg';
import './App.css';
import AdminPage from './pages/adminpage.component'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
}

export default App;
