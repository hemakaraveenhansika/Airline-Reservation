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
import React from "react";
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
  FormFeedback
} from "shards-react";

import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import update from 'immutability-helper';
import axios from 'axios';

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);


class Edit extends React.Component {
  state = {
      firstName:this.props.location.state.firstName,
      lastName:this.props.location.state.lastName,
      passportNo:this.props.location.state.passportNo,
      age:this.props.location.state.age,
      seatNo:this.props.location.state.seatNo,
      classType:this.props.location.state.classType
  };
  
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    // console.log(this.props.location.state.userId);

  }

  submit() {
    if(this.validate()){
      this.props.history.push({
        pathname: '/user/viewbook',
      });
    }else{
      
    }
  }

  validate() {
    // if (this.validator.allValid()) {

    //     return true;
      
    // } else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }
    return true
  }

  buildSeatNoOptions() {
    var arr = [];
    // var seat_data=this.props.location.state.seats;
    
    var seat_data=["E001","E002","E003"]
    for (const [index, value] of seat_data.entries()) {
      arr.push(<option key={index} value={value} >{value}</option>)
    }

    return arr; 
  }


    

  render() {

    const rows = [];
    for (let i = 1; i <= this.props.location.state.passengers; i++) {
      rows.push(i);
    }

    const mystyle = {
      width: "220px",
    };

    const cardstyle = {
      marginTop:"100px",
    };

    const {
      firstName,
      lastName,
      passportNo,
      age,
      seatNo,
      classType
    } = this.state;

    
    return (
      
      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>Passenger Detail</label>
        </div>
        </CardHeader>
       
          <Form>
            <Card>

              <Row form className="form-group pt-3">
                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"30px"}}
                    id="firstNameId"
                    placeholder={this.state.firstName}
                    name="firstName"
                    onChange={e => {
                      this.setState({ firstName: e.target.value });                
                    }}


                  />
                </Col>

                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"100px"}}
                    id="lastNameId"
                    placeholder={this.state.lastName}
                    name="lastName"
                    onChange={e => {
                      this.setState({ lastName: e.target.value });            
                    }}

  
                  />
                </Col>
                <Col md className="col-md-3">
                  <FormSelect
                    onChange={e => {
                      this.setState({
                        classType: e.target.value
                      });
                    }}
                    // invalid={validClassType}
                    style={{marginLeft:"170px"}}

                  >
                    <option value="" >Class</option>
                    <option value="2">Economy Class</option>
                    <option value="3 ">Business Class</option>
                    <option value="1">Platinum Class</option>
                  </FormSelect>
                </Col>

              </Row>

              <Row form className="form-group pt-3">
                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"30px"}}
                    id="passportId"
                    placeholder={this.state.passportNo}
                    name="passportNo"
                    onChange={e => {
                      this.setState({ passportNo: e.target.value });                   
                    }}


                  />
                </Col>

                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"100px"}}
                    id="ageId"
                    placeholder={this.state.age}
                    name="age"
                    onChange={e => {
                      this.setState({ age: e.target.value });         
                    }}

  
                  />
                </Col>

                <Col md className="col-md-3">
                  <FormSelect
                    onChange={e => {
                      this.setState({ departure: e.target.value });                 
                    }}
                    style={{marginLeft:"170px"}}
                    name="seatNo"
                  >
                    <option   value="DEFAULT" defaultValue={'DEFAULT'} >Seat</option>
                      {this.buildSeatNoOptions()}
                                         
                    </FormSelect>
                </Col>
              </Row>
              </Card>

            <Row form className="justify-content-end pt-3">
              <Button
                theme="primary"
                className="mb-3"
                onClick={() => {
                  this.submit();
                }}
              >
                Next
              </Button>
            </Row>
            
          </Form>

      </Card>
        
      
    );
  }
}

export default Edit;
