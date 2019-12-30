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

  function createData(flightId,departure, arrival) {
    return {flightId,departure, arrival};
  }

  const rows = [
    createData('f01','colombo', 'w dc'),
    createData('f02','Mattala', 'Tokyo'),
  ];


class Flight extends React.Component {
  state = {
    flightId: null,
    departure: null,
    arrival: null,
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    this.props.history.push({
      pathname: '/admin/addflight',
      state: { 
        flightId:0}
    });
  }

  edit(flightId,departure,arrival) {
    this.props.history.push({
      pathname: '/admin/addflight',
      state: { 
        flightId:flightId,
        departure:departure,
        arrival:arrival}
    });
  }

  delete(flightId) {
  
    console.log(flightId);
  }

  render() {
    const cardstyle = {
      marginTop:"100px",
    };
    
    return (

      <Card small className="mb-10 col-11" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"300px"}}>View Flight</label>
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
                Add Flight
              </Button>
          </Row>

        <Col>
          <Form>   
            <br/>
            <Paper className="paper" >
              <Table className="tlb" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" width="100px">Flight Id</StyledTableCell>
                    <StyledTableCell align="left" width="200px">Departure </StyledTableCell>
                    <StyledTableCell align="left" width="200px">Arrival</StyledTableCell>
                    <StyledTableCell align="left" width="150px"></StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <StyledTableRow key={row.flightId}>
                      <StyledTableCell align="left" > {row.flightId} </StyledTableCell>
                      <StyledTableCell align="left" >{row.departure}</StyledTableCell>
                      <StyledTableCell align="left" >{row.arrival}</StyledTableCell>
                      <StyledTableCell align="left" >
                        <Button
                          style={{width:"80px"}}
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            this.edit(row.flightId,row.departure,row.arrival);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{marginLeft:"35px"}}
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if(window.confirm('Delete the item?')){
                              this.delete(row.flightId);
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

export default Flight;
