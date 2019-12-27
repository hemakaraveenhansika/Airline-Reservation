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

  function createData(scheduleId,plane_Name, model_Name, departure, arrival, departure_time, arrival_time,date,capacity,gate_no) {
    return { scheduleId,plane_Name, model_Name, departure, arrival, departure_time, arrival_time, date, capacity ,gate_no };
  }

  const rows = [
    createData('s04','p02', 'm04', 'colombo', 'w dc', '12:00','17:50',"2019-12-28",125,5),
    createData('s01','p03', 'm01', 'Mattala', 'w dc', '2:00','18:50',"2019-12-28",125,2),
  ];


class Schedule extends React.Component {
  state = {
    departure: null,
    arrival: null,
    classType: null,
    passengers: null,
    departureDate: null,
    arrivalDate: null,

  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    this.props.history.push({
      pathname: '/admin/addschedule',
      state: { 
        scheduleId:0}
    });
  }

  edit(id,plane_Name,flightId,date,gate_no,departure_time,arrival_time) {
    this.props.history.push({
      pathname: '/admin/addschedule',
      state: { 
        scheduleId: id,
        planeId:plane_Name,
        flightId:flightId,
        departureDate:date,
        gateNo:gate_no,
        departureTime:departure_time,
        arrivalTime:arrival_time}
    });
    console.log(id);
  }

  delete(id) {
    // this.props.history.push('/admin/addschedule');
    console.log(id);
  }

  render() {

    const cardstyle = {
      marginTop:"100px",
    };

    const {
      arrival,
      departureDate,
      arrivalDate,
      departure,
      classType,
      passengers
    } = this.state;

    console.log(this.state.nic);

    
    return (

      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>View Schedule</label>
        </div>
        </CardHeader>

          <Row form >
              <Button
                style={{marginLeft:"25px",marginTop:"25px"}}
                theme="primary"
                className="mb-3"
                onClick={() => {
                  this.submit();
                }}
              >
                Add Schedule
              </Button>
          </Row>

        <Col>
          <Form>   
            <br/>
            <Paper className="paper" >
              <Table className="tlb" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" width="100px">Plane</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Model</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Departure </StyledTableCell>
                    <StyledTableCell align="left" width="100px">Arrival</StyledTableCell>
                    <StyledTableCell align="left" width="115px">Departure Time&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Arrival Time&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Capacity&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Gate No&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="220px"></StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <StyledTableRow key={row.scheduleId}>
                      <StyledTableCell align="left" > {row.plane_Name} </StyledTableCell>
                      <StyledTableCell align="left" >{row.model_Name}</StyledTableCell>
                      <StyledTableCell align="left" >{row.departure}</StyledTableCell>
                      <StyledTableCell align="left" >{row.arrival}</StyledTableCell>
                      <StyledTableCell align="left" >{row.departure_time}</StyledTableCell>
                      <StyledTableCell align="left" >{row.arrival_time}</StyledTableCell>
                      <StyledTableCell align="left" >{row.date}</StyledTableCell>
                      <StyledTableCell align="left" >{row.capacity}</StyledTableCell>
                      <StyledTableCell align="left" >{row.gate_no}</StyledTableCell>
                      <StyledTableCell align="left" >
                        <Button
                          style={{width:"80px"}}
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            this.edit(row.scheduleId,row.plane_Name,"f04",row.date,row.gate_no,row.departure_time,row.arrival_time);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{marginLeft:"5px"}}
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if(window.confirm('Delete the item?')){
                              this.delete(row.scheduleId);
                            };
                            
                          }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>      

            
          </Form>
        </Col>
        <br/><br/>
      </Card>
    );
  }
}

export default Schedule;
