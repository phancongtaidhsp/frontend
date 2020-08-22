import React from 'react';
import './App.css';
import AdminPage from './pages/adminpage.component'
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage.component';

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
}

export default App;
