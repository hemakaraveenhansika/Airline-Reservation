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


  function createData(schedule,departure, arrival,  departureTime, arrivalTime) {
    return {schedule, departure, arrival, departureTime, arrivalTime };
  }

  const rows = [
    createData(1,'Colombo', 'DC', "6.00", "24.00"),
    createData(2,'Chennai', 'London', "9.40", "7.50"),
    createData(3,'DC', 'Colombo', "16.20", "14.25"),
    createData(4,'London', 'DC', "3.45","1.30"),
    createData(5,'Mattala', 'Colombo', "16.10", "4.10"),
  ];


class View extends React.Component {

  state = {
    schedule: null,
    classType: null,
    buttoncondition:true,
    userId: this.props.location.state.userId,
    departure:this.props.location.state.departure,
    arrival:this.props.location.state.arrival,
    classType:this.props.location.state.classType,
    passengers:this.props.location.state.passengers,
    departureDate:this.props.location.state.departureDate
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      
      this.props.history.push({
        pathname: '/user/Detail',
        state: { 
          userId: this.props.location.state.userId,
          departure:this.props.location.state.departure,
          arrival:this.props.location.state.arrival,
          classType:this.props.location.state.classType,
          passengers:this.props.location.state.passengers,
          departureDate:this.props.location.state.departureDate}
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

    const cardstyle = {
      backgroundColor:"#e9eaea"
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
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>View Flight</label>
        </div>
        </CardHeader>
        <Col>
          <Form>   
            <br/>
            <Row>
              <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",marginLeft:"40px"}}>{(this.state.departureDate).toLocaleDateString()}</label>
            </Row>
                  {rows.map(row => (
                    
                    <Card key={row.schedule} style={cardstyle}>

                      <Row form className="form-group pt-3">
                        <Col md className="col-md-3">
                          <Row>                       
                            <label style={{fontSize:"18px",fontWeight:"bold",color:"#339bb9",width:"600px",marginLeft:"50px"}}>{row.departure}</label>                                       
                          </Row>
                          <Row>
                            <label style={{fontSize:"16px",fontWeight:"bold",width:"600px",color:" #656565",marginLeft:"50px"}}>{row.departureTime}</label>
                          </Row>      
                        </Col>

                        <Col md className="col-md-1">
                          <i className="fas fa-long-arrow-alt-right fa-10x" style={{fontSize:"50px"}}></i>
                        </Col>

                        <Col md className="col-md-3">
                          <Row>
                            <label style={{fontSize:"18px",fontWeight:"bold",color:"#339bb9",width:"300px",marginLeft:"30px"}}>{row.arrival}</label>
                          </Row>
                          <Row>
                            <label style={{fontSize:"16px",fontWeight:"bold",width:"600px",color:" #656565",marginLeft:"30px"}}>{row.arrivalTime}</label>
                          </Row> 
                        </Col>
                        <Col>
                        
                          <Button
                            key={"Economy"}
                            theme={this.state.buttoncondition && row.schedule==this.state.schedule && this.state.classType=="Economy" ? "secondary": "info"}
                            className="mb-3"
                            onClick={() => {

                                this.setState({schedule: row.schedule});
                                this.setState({classType: "Economy"});
                                this.handleClick();
                            }}
                            invalid={validSchedule}  
                          >
                        
                            <Row>Economy</Row><Row>LKR 12000</Row>
                          </Button>&nbsp;&nbsp;&nbsp;

                          <Button 
                          key={"Business"}
                          theme={this.state.buttoncondition && row.schedule==this.state.schedule && this.state.classType=="Business" ? "secondary": "info"}
                          className="mb-3"
                          onClick={() => {
                            
    
                              this.setState({schedule: row.schedule});
                              this.setState({classType: "Business"});
                              this.handleClick();
                            
                          }}
                          invalid={validSchedule}
                          >
                            <Row>Business</Row><Row>LKR 18000</Row>
                            </Button>&nbsp;&nbsp;&nbsp;
                          <Button 
                          key={"Platinum"}
                          theme={this.state.buttoncondition && row.schedule==this.state.schedule && this.state.classType=="Platinum" ? "secondary": "info"}
                          className="mb-3"
                          onClick={() => {

                              this.setState({schedule: row.schedule});
                              this.setState({classType: "Platinum"});
                              
                              this.handleClick();
                          }}
                          invalid={validSchedule}
                          >

                            <Row>Platinum</Row><Row>LKR 32000</Row>
                          </Button>
                        
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
        </Col>
      </Card>
    );
  }
}

export default View;
