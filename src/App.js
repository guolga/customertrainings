import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Guolga's personal trainings</h1>
        </header>
        <BrowserRouter>
          <div>
            <Link to="/">About us</Link>{' '}
            <Link to="/customers">Customers</Link>{' '}
            <Link to="/trainings">Trainings</Link>{' '}
            <Link to="/calendar">Calendar</Link>{' '}

            <Switch>
              <Route exact path="/" render={() => <h2>About us</h2>} />
              <Route path="/customers" component={Customerlist} />
              <Route path="/trainings" component={Traininglist} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
