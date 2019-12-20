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

  FormSelect,
  FormGroup,
  DatePicker,
  FormFeedback
} from "shards-react";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: " #142f37 ",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  function createData(plane_Name, model_Name, departure, arrival, departure_time, arrival_time,date,capacity,gate_no) {
    return { plane_Name, model_Name, departure, arrival, departure_time, arrival_time, date, capacity ,gate_no };
  }

  const rows = [
    createData('p01', 'm01', 'colombo', 'w dc', "12.00","17.50","2019-12-28",125,5),
    
  ];


class Report extends React.Component {
  state = {
    flightId: null,
    departureDate: null,
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  buildFlightOptions() {
    var arr = [];
    var flight_data=["report 1","report 2","report 3","report 4"]

    for (const [index, value] of flight_data.entries()) {
      arr.push(<option key={index} value={value} >{value}</option>)
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

  render() {

    const cardstyle = {
      marginTop:"100px",
    };

    const inputstyle = {
      width:"250px",
    };

    const {
      flightId,
      departureDate
    } = this.state;

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
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}> Report</label>
        </div>
        </CardHeader>
        <Form><br/>
            <Row form className="form-group pt-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <option selected disabled value="" >Select Report</option>
                    {this.buildFlightOptions()}
                  </FormSelect>
                </Col>
              <Col form >
                <Button
                  style={{marginTop:"0px"}}
                  theme="primary"
                  className="mb-3"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Search
                </Button>
            </Col>
            </Row>

          
        </Form>
        
        <br/><br/>
      </Card>
    );
  }
}

export default Report;
