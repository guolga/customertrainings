import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calendar extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      view: 'month'
    };
  }


  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(resData => {
        this.setState({ events: resData });
        console.log(typeof (new Date(this.state.events[0].date)))
      })
  }

  render() {

    return (

      <div style={{ height: 700, marginTop: 10 }}>

        <div style={{ marginBottom: 15 }}>

        <button className="btn btn-primary" style={{ width: 90 }} onClick={() => this.setState({ view: "day" })}>Day</button>
          &nbsp;&nbsp;
        <button className="btn btn-primary" style={{ width: 90 }} onClick={() => this.setState({ view: "week" })}>Week</button>
          &nbsp;&nbsp;
        <button className="btn btn-primary" style={{ width: 90 }} onClick={() => this.setState({ view: "month" })}>Month</button>

        </div >

        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={this.state.events}
          startAccessor={(events) => { return moment(events.date).toDate() }}
          endAccessor={(events) => { return moment(events.date).add(events.duration, 'minutes').toDate() }}
          titleAccessor={(events) => { return (events.activity) }}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => { }}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}/>

      </div>
    );
  }
}


export default Calendar;