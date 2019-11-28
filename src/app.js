import React, { Component } from 'react';
import axios from 'axios';
//import jsonpAdapter from 'axios-jsonp';
import BikeTable from './components/bikeTable.js';
import jsonResponse from './components/stations.json';
import { textFilter } from 'react-bootstrap-table2-filter';
import Image from 'react-image-webp';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

class App extends Component {

  state = {
    stations: [],
    isLoading: true,
    errors: null
  };

  getStations() {
    let url = "https://feeds.citibikenyc.com/stations/stations.json";

    axios({
        url: url,
        //adapter: jsonpAdapter,
        //callbackParamName: 'c' // optional, 'callback' by default
    }).then(response => {

      this.setState({
        stations: response.data,
        isLoading: false
      }, () => { 
        //console.log( this.state.stations );
      });

    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    //this.getStations();
    this.setState({
      stations: jsonResponse.stationBeanList,
      isLoading: false
    }, () => { 
      //console.log( this.state.stations );
    });
  }

  render() {

    const columns = [{
      dataField: 'stationName',
      text: 'Station Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'statusValue',
      text: 'Status',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'availableBikes',
      text: 'Available Bikes',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'availableDocks',
      text: 'Avilable Docks',
      sort: true,
      filter: textFilter()
    }];

    const expandRow = {
      renderer: row => (
        <div className='expandDetails'>
          <p>{ `The ${row.stationName} station has the following details` }</p>
          <div className='content'>
            <p>Station Name: <span> { `${row.stationName}` } </span></p>
            <p>Status: <span> { `${row.statusValue}` } </span></p>
            <p>Available Bikes: <span> { `${row.availableBikes}` } </span></p>
            <p>Avilable Docks: <span> { `${row.availableDocks}` } </span></p>
            <p>Latitude: <span> { `${row.latitude}` } </span></p>
            <p>Longitude: <span> { `${row.longtitude}` } </span></p>
            <p>Test Station: <span> { `${row.testStation}` } </span></p>
            <p>Total Docks: <span> { `${row.totalDocks}` } </span></p>
          </div>
        </div>
      )
    };

    return (
      <div className="app">

        <div className="container">
            <div className="row">
              <div className="col-sm-12 app-logo">
                  <Image webp={require('./logo.webp')} />
                </div>
                <div className="col-sm-12">
                    <div className="">
                      <BikeTable stations={ this.state.stations } columns={ columns } expandRow={ expandRow } />
                    </div>
                </div>
            </div>
        </div>

      </div>
    );

  }


}

export default App;
