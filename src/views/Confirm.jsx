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
    className:'',
    
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    

    this.state = {
      departure: this.props.location.state.departure,
      arrival: this.props.location.state.arrival,
      classType: this.props.location.state.classType,
      passengers:this.props.location.state.passengers,
      departureDate: this.props.location.state.departureDate,
      scheduleId:this.props.location.state.scheduleId,
      departureTime:this.props.location.state.departureTime,
      arrivalTime:this.props.location.state.arrivalTime,
      planeId:this.props.location.state.planeId,
      detail: this.props.location.state.detail,
      totalPrice:this.props.location.state.totalPrice,

    }

    // if(this.state.classType==1){
    //     this.setState({className:"Platinum"});
    // }if (this.state.classType==2) {
      
    //     this.setState({className:"Economy"});

    // } else {

    //     this.setState({className:"Business"});

    // }

    

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

    




    const cardstyle = {
 
      backgroundColor:" #e9eaea "
    };

    const {
      schedule,
      classType,
      buttoncondition,
    } = this.state;



    
    return (

      <Card small className="mb-10 col-11" style={{marginTop:"100px"}}>
        <CardHeader className="border-bottom" >               
            <label style={{fontSize:"30px",fontWeight:"bold",color:"#339bb9",width:"400px"}}>Review Your Book</label>                 
        </CardHeader>
        <br/>
        <Col>
            <Form>
                  {this.state.detail.map((row, index) => (             
 
                  <Card key={index} style={cardstyle}>
  
                    <Col style={{backgroundColor:"#339bb9"}}>
                      <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",color:"#fcfbfb  "}}>Passenger {index+1}</label>
                      <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",color:"#fcfbfb  ",marginLeft:"150px"}}>LKR {this.state.totalPrice/this.state.passengers}</label>
                      <label style={{fontSize:"25px",fontWeight:"bold",width:"200px",color:"#fcfbfb  ",marginLeft:"250px"}}>{this.state.classType==1 ? 'Platinum':this.state.classType==2 ?'Economy':'Business'} Class</label>
                    </Col>
                  

                    <Row>
                    
                      <Col md className="col-md-4"><br/>
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Name of Passenger</label>
                      </Col>
                      <Col md className="col-md-2"><br/>
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Date</label>
                      </Col>
                      <Col md className="col-md-2"><br/>
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Plane</label>
                      </Col>
                      <Col md className="col-md-2"><br/>
                        <label style={{fontSize:"20px",fontWeight:"bold",width:"300px",color:" #339bb9",marginLeft:"35px"}}>Passport No</label>
                      </Col>                            
                    </Row>
                    <Row>
                      <Col md className="col-md-4">
                  <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{row.firstName} {row.lastName}</label>
                      </Col>
                      <Col md className="col-md-2">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{this.state.departureDate}</label>
                      </Col>
                      <Col md className="col-md-2">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{this.state.planeId}</label>
                      </Col>  
                      <Col md className="col-md-2">
                        <label style={{fontSize:"18px",fontWeight:"bold",width:"300px",color:" #656565",marginLeft:"35px"}}>{row.passportNo}</label>
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
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>Seat</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>Gate No</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>Age</label>
                        </Col>
                    </Row>

                    <Row >
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",color:"#339bb9",marginLeft:"35px"}}>To :</label>
                        </Col>
                      
                        <Col md className="col-md-2">                      
                          <label style={{fontSize:"18px",fontWeight:"bold",marginLeft:"-70px"}}>{this.state.arrival}/ {this.state.arrivalTime}</label>                                       
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",marginLeft:"35px"}}>{row.seatNo}</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",marginLeft:"35px"}}>05</label>
                        </Col>
                        <Col md className="col-md-2">
                          <label style={{fontSize:"20px",fontWeight:"bold",marginLeft:"35px"}}>{row.age}</label>
                        </Col>
                    </Row>
                  </Card>

                ))}

            <Row  className="justify-content-end pt-3">
              <label style={{fontSize:"30px",fontWeight:"bold"}}>Total Price : LKR {this.state.totalPrice}</label>
            </Row>

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
