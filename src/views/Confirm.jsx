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
  ButtonGroup, 
  FormSelect,
  FormGroup,
  DatePicker,
  FormFeedback
} from "shards-react";

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);


class Confrim extends React.Component {
  state = {
    schedule: null,
    departure: 'Colombo',
    arrival: 'DC',
    classType: 'Business',
    passengers: '2',
    departureDate: '2019-12-28',
    departureTime:'12.22',
    arrivalTime:'18.35',
    planeId:'P788e-B7',

  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      this.props.history.push({
        pathname: '/user/home',
      });
    }else{
      
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

  handleClick(){
    this.setState({
      buttoncondition:!this.state.button
    })
  }
  render() {

    const rows = [];
    for (let i = 1; i <= this.props.location.state.passengers; i++) {
      rows.push(i);
    }

    const cardstyle = {
 
      backgroundColor:" #e9eaea "
    };

    const {
      schedule,
      classType,
      buttoncondition,
    } = this.state;

    const validSchedule = this.validator.message(
      "schedule",
      schedule,
      "required"
    );
    const validClassType = this.validator.message(
      "classType",
      classType,
      "required"
    );


    
    return (

      <Card small className="mb-10 col-11" style={{marginTop:"100px"}}>
        <CardHeader className="border-bottom" >               
            <label style={{fontSize:"30px",fontWeight:"bold",color:"#339bb9",width:"400px"}}>Review Your Flight</label>                 
        </CardHeader>
        <br/>
        <Col>
            <Form>
                  {rows.map(row => (             
 
                  <Card key={row} style={cardstyle}>
                    <br/>
                    <Col style={{backgroundColor:"#339bb9"}}>
                      <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",color:"#fcfbfb  "}}>Passenger {row}</label>
                      <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",color:"#fcfbfb  ",marginLeft:"670px"}}>{this.state.classType} Class</label>
                    </Col>
                  <br/>

                    <Row>
                      <Col md className="col-md-4">
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Name of Passenger</label>
                      </Col>
                      <Col md className="col-md-3">
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Date</label>
                      </Col>
                      <Col md className="col-md-4">
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Flight</label>
                      </Col>                            
                    </Row>
                    <Row>
                      <Col md className="col-md-4">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>Alex Willson</label>
                      </Col>
                      <Col md className="col-md-3">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{this.state.departureDate}</label>
                      </Col>
                      <Col md className="col-md-4">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{this.state.planeId}</label>
                      </Col>                         
                    </Row>
                    <br/>     
                    <Row >
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>From :</label>
                        </Col>
                      
                        <Col md className="col-md-2">                      
                          <label style={{fontSize:"18px",fontWeight:"bold",marginLeft:"-70px"}}>{this.state.departure} / {this.state.departureTime}</label>                                       
                        </Col>
                        <Col md className="col-md-3">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>Seat</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>Gate No</label>
                        </Col>
                    </Row>
                    <Row >
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>To :</label>
                        </Col>
                      
                        <Col md className="col-md-2">                      
                          <label style={{fontSize:"18px",fontWeight:"bold",marginLeft:"-70px"}}>{this.state.arrival}/ {this.state.arrivalTime}</label>                                       
                        </Col>
                        <Col md className="col-md-3">
                          <label style={{fontSize:"20px",fontWeight:"bold",marginLeft:"35px"}}>B002</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",marginLeft:"35px"}}>05</label>
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
                Confirm
              </Button>
            </Row>
          </Form>
        </Col>
      </Card>
    );
  }
}

export default Confrim;
