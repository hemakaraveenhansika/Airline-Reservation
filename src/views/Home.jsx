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
import axios from 'axios';

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

class Home extends React.Component {
  state = {
    departure: '',
    arrival: '',
    classType: '',
    passengers: '',
    departureDate: '',
    airports:'',
    nextstate:true
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      airports:this.props.location.state.airports
      // airports:[[1,"BIK"],[3,"JFK"]]

    }
    
    
  }

  submit() {
    if(this.validate()){
      var d = this.state.departureDate;
      var date_fix = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2),('0' + d.getDate()).slice(-2)].join('-');
      axios.post("http://localhost:5000/search_flight",{departureAirport:this.state.departure,arrivalAirport:this.state.arrival,departureDate:date_fix,passengers:this.state.passengers,requiredClass:this.state.classType}).then((response)=>
      {

        if(response.data.success){
          let tmpArray = []
          for (var i = 0; i < response.data.data.length; i++) {
              tmpArray.push(response.data.data[i]);
          }
          console.log(response.data);
          this.props.history.push({
            pathname: '/user/view',
            state: { 
              // userId: this.props.location.state.userId,
              departure:response.data.departure,
              arrival:response.data.arrival,
              classType:this.state.classType,
              passengers:this.state.passengers,
              departureDate:date_fix,
              scheduleData:tmpArray[0],
              prices:response.data.prices
            }
          });

        
        }else{
          this.setState({ nextstate:false }); 
        }
        
      })
      
      
      }
  }

  buildAirportsOptions() {
    var arr = [];
    var departure_data=this.state.airports;
    
    for (const [index, row_data] of departure_data.entries()) {   
      arr.push(<option key={index} value={row_data[0]} >{row_data[1]}</option>)
    }

    return arr; 
  }


  validate() {
    // if (this.validator.allValid()) {
    //   if (moment(this.state.departureDate) > moment(time)) {
    //     return true;
    //   }
    // } else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }
    return true;
  
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
      arrival,
      departureDate,
      departure,
      classType,
      passengers
    } = this.state;
    const validDeparture = this.validator.message(
      "departure",
      departure,
      "required|alpha"
    );
    const validArrival = this.validator.message(
      "arrival",
      arrival,
      "required|alpha"
    );

    const validClassType = this.validator.message(
      "classType",
       classType,
       "required"
    );
    const validPassenger = this.validator.message(
      "passengers",
      passengers,
       "required"
    );

    
    
    return (

      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>Search Flight</label>
        </div>
        </CardHeader>
        <Col>
          <Form>

            <Row form className="form-group pt-3">
              <Col md className="pr-0">
                <FormSelect
                  style={inputstyle}
                  id="departureId"
                  placeholder="Departure"
                  onClick={e => {
                    this.setState({ departure: e.target.value });
                  }}
                  invalid={validDeparture}
                >
                    <option  disabled value="" >Departure</option>
                    {this.buildAirportsOptions()}
                                          
                  </FormSelect>

              </Col>

              <Col md className="pr-0">
                <FormSelect
                  style={inputstyle}
                  id="arrivalId"
                  placeholder="Arrival"
                  onClick={e => {
                    this.setState({ arrival: e.target.value });
                  }}
                  invalid={validArrival}
                >
                    <option  disabled value="" >Arrival</option>
                    {this.buildAirportsOptions()}
                                          
                  </FormSelect>
              </Col>
            </Row>

            <Row form className="form-group pt-3">
              <Col md className="pl-0">
                  <FormSelect
                    onChange={e => {
                      this.setState({
                        classType: e.target.value
                      });
                    }}
                    invalid={validClassType}
                    style={inputstyle}

                  >
                    <option value="" >Class</option>
                    <option value="2">Economy Class</option>
                    <option value="3 ">Business Class</option>
                    <option value="1">Platinum Class</option>
                  </FormSelect>
                </Col>

                <Col md className="pl-0">
                <FormSelect
                  onChange={e => {
                    this.setState({
                      passengers: e.target.value
                    });
                  }}
                  invalid={validPassenger}
                  style={inputstyle}
                  placeholder="aaa"
                >
                  <option value=""> Passenger </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>

                </FormSelect>
              </Col>
            </Row>

            <Row form className="form-group pt-3">
              <Col>
                  <DatePicker
                    placeholderText="Departure Date"
                    selected={departureDate}
                    style={inputstyle}
                    dateFormat="yyyy/MM/dd"
                    className=""
                    onChange={e => {
                      this.setState({
                        departureDate: new Date(e),

                      });
                    }}
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

export default Home;
