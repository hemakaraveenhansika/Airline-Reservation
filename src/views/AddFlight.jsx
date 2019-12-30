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


class AddFlight extends React.Component {

  state = {
    flightId:this.props.location.state.flightId,
    departure: null,
    arrival: null,
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    if(this.state.flightId!=0){
      this.state = {
        departure:this.props.location.state.departure,
        arrival:this.props.location.state.arrival,
      }
    }   
  }

  buildDepartureOptions() {
    var arr = [];
    var departure_data=["colombo","Mattala","w dc","Tokyo"]

    for (const [index, value] of departure_data.entries()) {
      if(this.state.flightId!=0 && value==this.state.departure){
        arr.push(<option key={index} selected value={value} >{value}</option>)
      }else{
        arr.push(<option key={index} value={value} >{value}</option>)
      }
    }

    return arr; 
  }

  buildArrivalOptions() {
    var arr = [];
    var arrival_data=["colombo","Mattala","w dc","Tokyo"]

    for (const [index, value] of arrival_data.entries()) {
      if(this.state.flightId!=0 && value==this.state.arrival){
        arr.push(<option key={index} selected defaultValue="0" value={value} >{value}</option>)
      }else{
        arr.push(<option key={index} value={value} >{value}</option>)
      }
    }

    return arr; 
  }

  submit() {
    if(this.validate()){
      this.props.history.push('/admin/flight');
      }
  }
  validate() {
    if (this.validator.allValid()) {
        return true;  
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

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
      flightId,
      departure,
      arrival,
    } = this.state;

    const validDeparture = this.validator.message(
      "departure",
      departure,
       "required"
    );
    const validArrival = this.validator.message(
      "arrival",
      arrival,
       "required"
    );
    
    return (

      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>Add Flight</label>
        </div>
        </CardHeader>
        <br/>
        <Col>
          <Form>
            <Row form className="form-group pt-3">
              <Col md className="pl-0">
              
                  <FormSelect
                    onChange={e => {
                      this.setState({
                        departure: e.target.value
                      });
                    }}
                    invalid={validDeparture}
                    style={inputstyle}


                  >
                    <option  disabled value="" >Departure</option>
                    {this.buildDepartureOptions()}
                      
                    
                  </FormSelect>
                
                </Col>

                <Col md className="pl-0">
                <FormSelect
                  onChange={e => {
                    this.setState({
                      arrival: e.target.value
                    });
                  }}
                  invalid={validArrival}
                  style={inputstyle}
                >
                  <option  disabled value="" >Arrival</option>
                  {this.buildArrivalOptions()}
                </FormSelect>
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

export default AddFlight;
