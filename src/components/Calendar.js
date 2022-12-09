import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default class Calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    const trainings = await axios
      .get(`https://customerrest.herokuapp.com/api/trainings`)
      .then((res) => res.data.content);

    let events = [];

    trainings.forEach((training) => {
      const { date, activity, duration } = training;
      events.push({
        start: moment(date).toDate(),
        end: moment(date).add(duration, "minutes").toDate(),
        title: activity,
      });
    });

    this.setState({ events });
  }

  render() {
    const localizer = momentLocalizer(moment);
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
