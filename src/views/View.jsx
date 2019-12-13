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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


class View extends React.Component {
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
    this.validate();
  }
  validate() {
    
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
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>View Flight</label>
        </div>
        </CardHeader>
        <Col>
          <Form>   
            <br/>
            <Paper className="paper" >
              <Table className="tlb" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" width="100px">Departure </StyledTableCell>
                    <StyledTableCell align="left" width="100px">Arrival</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Departure Time&nbsp;</StyledTableCell>
                    <StyledTableCell align="left" width="100px">Arrival Time&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="left" > {row.name} </StyledTableCell>
                      <StyledTableCell align="left" >{row.calories}</StyledTableCell>
                      <StyledTableCell align="left" >{row.fat}</StyledTableCell>
                      <StyledTableCell align="left" >{row.carbs}</StyledTableCell>
                      <StyledTableCell align="left" >{row.protein}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>      

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

export default View;
