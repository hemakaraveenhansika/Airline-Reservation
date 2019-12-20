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
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      this.props.history.push('/user/view?'+this.state.passengers);
      }
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
    return true
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
                <FormInput
                  style={inputstyle}
                  id="departureId"
                  placeholder="Departure"
                  onChange={e => {
                    this.setState({ departure: e.target.value });
                  }}
                  invalid={validDeparture}
                />
              </Col>

              <Col md className="pr-0">
                <FormInput
                  style={inputstyle}
                  id="arrivalId"
                  placeholder="Arrival"
                  onChange={e => {
                    this.setState({ arrival: e.target.value });
                  }}
                  invalid={validArrival}
                />
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
                    <option selected disabled value="" >Class</option>
                    <option value="Economy">Economy Class</option>
                    <option value="Business ">Business Class</option>
                    <option value="Platinum ">Platinum Class</option>
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
                >
                  <option selected disabled value="">
                    Passengers
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </FormSelect>
              </Col>
            </Row>

            <Row form className="form-group pt-3">
              <Col>
                  <DatePicker
                    placeholderText="Departure Date"
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
