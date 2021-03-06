import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

// import Auth from '../../lib/Auth';
import User from '../../lib/User';
// import Location from '../../lib/Location';


import Form from './Form';

class NewRoute extends React.Component {

  state = {
    username: User.getUser().username,
    pos: '',
    reportName: '',
    crime: '',
    location: {
      lat: 0,
      lng: 0
    },
    locationAddress: '',
    date: '',
    incidentDescription: '',
    submitReport: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value }, () => console.log('STATE', this.state));
  }

  // handleLocationChange = (e) => {
  //   console.log(e.target.value);
  //   const { location, address } = e.target.value;
  //   this.setState({ location, address }, () => console.log(this.state));
  // }

  toggleSubmitReport = () =>{
    this.setState({ submitReport: !this.state.submitReport });
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...this.state };
    data.address = data.locationAddress;
    delete data.locationAddress;

    axios.post('/api/crimes', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/crimes'), () => console.log(this.state))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div>{this.state.pos}</div>
        <Form
          toggleSubmitReport={this.toggleSubmitReport}
          handleChange={this.handleChange}
          // handleLocationChange={this.handleLocationChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </div>
    );
  }
}

export default NewRoute;
