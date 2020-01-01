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
  Card,
  CardHeader,
  Row,
  Button,

} from "shards-react";

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import axios from 'axios';

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

const rows = [];
function createData(schedule,planeId,departure, arrival,  departureTime, arrivalTime) {
  return {schedule,planeId, departure, arrival, departureTime, arrivalTime };
}

  

  // for (const [index, row_data] of this.state.scheduleData.entries()) {   
  //   rows.push(createData({index},this.state.departure, this.state.arrival,row_data[2] , row_data[3] ))
  // }

class View extends React.Component {

  state = {
    schedule: null,
    classType: null,
    buttoncondition:true,
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    

    this.state = {
      // userId: this.props.location.state.userId,
      departure:this.props.location.state.departure,
      arrival:this.props.location.state.arrival,
      classType:this.props.location.state.classType,
      passengers:this.props.location.state.passengers,
      departureDate:this.props.location.state.departureDate,
      scheduleData:this.props.location.state.scheduleData,
      prices:this.props.location.state.prices,
      token: this.props.location.state.token,
    }


    let scheduleData=this.state.scheduleData;

    console.log(this.state.scheduleData);
    for (const [index, row_data] of scheduleData.entries()) {   
      console.log(row_data[3]);
      rows.push(createData(row_data[0],row_data[1],this.state.departure, this.state.arrival,row_data[3], row_data[4]));
    }
    // rows.push(createData(scheduleData[0],scheduleData[1],this.state.departure, this.state.arrival,scheduleData[3], scheduleData[4]));
    // console.log(scheduleData[0]);
  }
  submit() {
    if(this.validate()){
      axios.post("http://localhost:5000/availableSeats",{schedule_ID:this.state.schedule,class_ID:this.state.classType}, {headers: {'Authorization': "Bearer " + this.state.token}}).then((response)=>
      {
        if(response.data.success){
          // console.log(response);
          let seatArray = []
          for (var i = 0; i < response.data.data.length; i++) {
            seatArray.push(response.data.data[i]);
          }
          // console.log(response.data);
          var jwt = require("jsonwebtoken");

          var token =this.state.token;
          var decode= jwt.decode(token);
          console.log(decode);

          this.props.history.push({
            pathname: '/user/Detail',
            state: { 
              userId: this.props.location.state.userId,
              departure:this.state.departure,
              arrival:this.state.arrival,
              classType:this.state.classType,
              passengers:this.state.passengers,
              departureDate:this.state.departureDate,
              seats:seatArray,
              scheduleId:this.state.schedule,
              token:this.state.token
            }
          });

        }
        
      })
      
      

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
    } = this.state;

    const validSchedule = this.validator.message(
      "schedule",
      schedule,
      "required"
    );

    
    return (

      <Card small className="mb-10 col-13" style={{marginTop:"100px"}}>
        <CardHeader className="border-bottom">
        <div className="search">
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>View Flight</label>
        </div>
        </CardHeader>
        <Col>
          <Form>   
            <br/>
            <Row>
              <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",marginLeft:"40px"}}>{this.state.departureDate}</label>
            </Row>
                  {rows.map(row => (
                    
                    <Card className="mb-10 col-16" key={row.schedule} style={cardstyle}>

                      <Row form className="form-group pt-3">
                      <Col md className="col-md-2">
                          <Row>                       
                            <label style={{fontSize:"18px",fontWeight:"bold",color:"#339bb9",width:"600px",marginLeft:"50px"}}>Plane</label>                                       
                          </Row>
                          <Row>
                            <label style={{fontSize:"16px",fontWeight:"bold",width:"600px",color:" #656565",marginLeft:"50px"}}>{row.planeId}</label>
                          </Row>
                            
                        </Col>
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
                            theme={this.state.buttoncondition && row.schedule===this.state.schedule && this.state.classType===2 ? "secondary": "info"}
                            className="mb-3"
                            onClick={() => {

                                this.setState({schedule: row.schedule});
                                this.setState({classType: 2});
                                this.handleClick();
                            }}
                            invalid={validSchedule}  
                          >
                        
                          <Row>Economy</Row><Row>LKR {this.state.prices[1][2]}</Row>
                          </Button>&nbsp;&nbsp;&nbsp;

                          <Button 
                          key={"Business"}
                          theme={this.state.buttoncondition && row.schedule===this.state.schedule && this.state.classType===3 ? "secondary": "info"}
                          className="mb-3"
                          onClick={() => {
                            
    
                              this.setState({schedule: row.schedule});
                              this.setState({classType: 3});
                              this.handleClick();
                            
                          }}
                          invalid={validSchedule}
                          >
                            <Row>Business</Row><Row>LKR {this.state.prices[2][2]}</Row>
                            </Button>&nbsp;&nbsp;&nbsp;
                          <Button 
                          key={"Platinum"}
                          theme={this.state.buttoncondition && row.schedule===this.state.schedule && this.state.classType===1 ? "secondary": "info"}
                          className="mb-3"
                          onClick={() => {

                              this.setState({schedule: row.schedule});
                              this.setState({classType: 1});
                              
                              this.handleClick();
                          }}
                          invalid={validSchedule}
                          >

                            <Row>Platinum</Row><Row>LKR {this.state.prices[0][2]}</Row>
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
