/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import TimePicker from 'react-time-picker';

import {
  Col,
  Form,
  FormInput,
  Card,
  CardHeader,
  Row,
  Button,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  FormSelect,
  FormGroup,
  DatePicker,

} from "shards-react";
import SimpleReactValidator from "simple-react-validator";

import moment from "moment";


const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);


class AddSchedule extends React.Component {

  state = {
    departure: null,
    planeId: null,
    flightId: null,
    departureDate: null,
    arrivalDate: null,
    gateNo:null,
    departureTime: '10:00',
    arrivalTime:'10:00'
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    
  }

  buildPlaneOptions() {
    var arr = [];
    var plane_data=["p01","p02","p03","p04"]

    for (const [index, value] of plane_data.entries()) {
      arr.push(<option key={index} value={value} >{value}</option>)
    }

    return arr; 
  }

  buildFlightOptions() {
    var arr = [];
    var flight_data=["f01","f02","f03","f04"]

    for (const [index, value] of flight_data.entries()) {
      arr.push(<option key={index} value={value} >{value}</option>)
    }

    return arr; 
  }

  buildOptions() {
    var arr = [];

    for (let i = 1; i <= 10; i++) {
        arr.push(<option key={i} value={i}>{i}</option>)
    }

    return arr; 
  }


  handleChange = (event) => {
    this.logs.unshift("change: " + event.target.value);

    this.setState({
        value: event.target.value,
        events: this.logs.slice()
    });
  }


  submit() {
    if(this.validate()){
      this.props.history.push('/admin/flight');
      }
  }
  validate() {
    if (this.validator.allValid()) {
      if (moment(this.state.departureDate) > moment(time)) {
        return true;
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onChangedepartureTime = departureTime => this.setState({ departureTime })
  onChangearrivalTime = arrivalTime => this.setState({ arrivalTime })
  render() {
    const mystyle = {
      width: "220px",
    };

    const cardstyle = {
      marginTop:"100px",
    };

    const inputstyle = {
      width:"400px",
    };

    const {
      departureDate,
      planeId,
      departureTime,
      arrivalTime,
      flightId,
      gateNo,
    } = this.state;




    const validGateNo = this.validator.message(
      "gateNo",
      gateNo,
      "required"
    );

    const validPlaneId = this.validator.message(
      "planeId",
       planeId,
       "required"
    );
    const validFlightId = this.validator.message(
      "flightId",
      flightId,
       "required"
    );
    console.log(this.state.nic);


    return (

      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>Add Schedule</label>
        </div>
        </CardHeader>
        <Col>
          <Form>
            <Row form className="form-group pt-3">
              <Col md className="pl-0">
              
                  <FormSelect
                    onChange={e => {
                      this.setState({
                        planeId: e.target.value
                      });
                    }}
                    invalid={validPlaneId}
                    style={inputstyle}
                    
                  >
                    <option selected disabled value="" >Plane</option>
                      {this.buildPlaneOptions()}
                      
                    
                  </FormSelect>
                
                </Col>

                <Col md className="pl-0">
                <FormSelect
                  onChange={e => {
                    this.setState({
                      flightId: e.target.value
                    });
                  }}
                  invalid={validFlightId}
                  style={inputstyle}
                >
                  <option selected disabled value="" >Flight</option>
                  {this.buildFlightOptions()}
                </FormSelect>
              </Col>
            </Row>

            <Row form className="form-group pt-3">
              <Col>
                  <DatePicker
                    placeholderText="Date"
                    selected={departureDate}
                    style={inputstyle}
                    className=""
                    onChange={e => {
                      this.setState({
                        departureDate: new Date(e)
                      });
                    }}
                  />
                </Col>
                <Col md className="pr-0">
                  <FormSelect
                    onChange={e => {
                      this.setState({
                        gateNo: e.target.value
                      });
                    }}
                    invalid={validGateNo}
                    style={inputstyle}
                  >
                    <option selected disabled value="" >Gate No</option>
                    {this.buildOptions()}
                  </FormSelect>

                </Col>
                
            </Row>

            <Row form className="form-group pt-3">
            <Col>
                <TimePicker

                  onChange={this.onChangedepartureTime}
                  value={this.state.departureTime}
                  style={inputstyle}
                />
              </Col>
              <Col>
                <TimePicker

                  onChange={this.onChangearrivalTime}
                  value={this.state.arrivalTime}
                  style={inputstyle}
                />
              </Col>
            </Row>

            <Row form className="justify-content-end pt-3">
              <Button
                theme="primary"
                className="mb-3"
                onClick={() => {
                  this.submit();
                }}
              >
                Search
              </Button>
            </Row>
          </Form>
        </Col>
      </Card>
      
    );
  }
}

export default AddSchedule;
