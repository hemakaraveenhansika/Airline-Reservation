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

const rows = [];
for (let i = 1; i <= 3; i++) {
  rows.push(i);
}

class Detail extends React.Component {
  state = {
    passportno: [],
    age: [],
    seatNo:[],
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      
      }
  }
  validate() {
    if (this.validator.allValid()) {
      if (moment(this.state.date) > moment(time)) {
        return true;
      }
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
      age,
      passportno,
      seatNo,
    } = this.state;
    const validPassport = this.validator.message(
      "passportno",
      passportno,
      "required|alpha"
    );
    const validAge = this.validator.message(
      "age",
      age,
      "required|alpha"
    );

    
    return (
      
      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>Passenger Detail</label>
        </div>
        </CardHeader>
       
          <Form>
          {rows.map(row => (
            <Card key={row}>
              <CardHeader >
                <div>
                  <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>Passenger {row}</label>
                </div>
              </CardHeader>
              <Row form className="form-group pt-3">
                <Col md className="pr-0">
                  <FormInput
                    style={inputstyle}
                    id="passportId"
                    placeholder="Passport No"
                    onChange={e => {
                      this.setState({ passportno: e.target.value });
                    }}
                    invalid={validPassport}
                  />
                </Col>

                <Col md className="pr-0">
                  <FormInput
                    style={inputstyle}
                    id="arrivalId"
                    placeholder="Age"
                    onChange={e => {
                      this.setState({ age: e.target.value });
                    }}
                    invalid={validAge}
                  />
                </Col>
              </Row>
            </Card>
            ))}
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

export default Detail;
