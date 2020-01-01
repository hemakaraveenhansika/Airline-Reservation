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

} from "shards-react";

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import update from 'immutability-helper';
import axios from 'axios';

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

const passengers=2;




class Detail extends React.Component {
  state = {
      passengers:'',
      age:'',
      seatNo:'',
      detail:[],
      passengers:passengers 
  };
  
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.updateDetail = this.updateDetail.bind(this);
    // console.log(this.props.location.state.userId);

  }

  submit() {
    if(this.validate()){
      
      // console.log(this.state.detail);
      axios.post("http://localhost:5000/addPassengers",{user_ID:this.props.location.state.userId,passengerArr:this.state.detail,schedule_ID:this.props.location.state.scheduleId,class_ID:this.props.location.state.classType}, {headers: {'Authorization': "Bearer " + this.props.location.state.token}}).then((response)=>
      {
        if(response.data.success){

          console.log(response);
          console.log(response.data.total_price);
          this.props.history.push({
            pathname: '/user/confirm',
            state: { 
              userId: this.props.location.state.userId,
              departure:this.props.location.state.departure,
              arrival:this.props.location.state.arrival,
              classType:this.props.location.state.classType,
              passengers:this.props.location.state.passengers,
              departureDate:this.props.location.state.departureDate,
              detail:this.state.detail,
              scheduleId:this.props.location.state.scheduleId,
              departureTime:response.data.departure_time,
              planeId:response.data.plane_ID,
              arrivalTime:response.data.arrival_time,
              totalPrice:response.data.total_price,
              token: this.props.location.state.token
            }
          });

        }
        
      })


    }
  }

  validate() {
    // if (this.validator.allValid()) {

    //     return true;
      
    // } else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }
    return true
  }

  buildSeatNoOptions() {
    var arr = [];
    var seat_data=this.props.location.state.seats;
    

    for (const [index, value] of seat_data.entries()) {
      arr.push(<option key={index} value={value} >{value}</option>)
    }

    return arr; 
  }

  updateDetail(event,index,passengers){
    if(this.state.detail.length<passengers){
      for (let i = 1; i <= passengers; i++) {
        const newArray = update(this.state.detail, {$push: [{firstName:'',lastName:'',passportNo:'',age:'',seatNo:''}]});
        this.state={detail:newArray}
      }
    }

    let ndetail = update(this.state, {
      detail: {    
          [index.row-1]: {
              [event.target.name] :{ $set:event.target.value }
          }       
      }
    });
    this.setState(ndetail);
    
  }
    

  render() {

    const rows = [];
    for (let i = 1; i <= this.props.location.state.passengers; i++) {
      rows.push(i);
    }

    const mystyle = {
      width: "220px",
    };

    const cardstyle = {
      marginTop:"100px",
    };

    const {
      age,
      passportNo,
      seatNo,
    } = this.state;


   

    
    
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
                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"30px"}}
                    id="firstNameId"
                    placeholder="First Name"
                    name="firstName"
                    onChange={e => {
                      this.updateDetail(e,{row},this.state.passengers);                   
                    }}


                  />
                </Col>

                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"100px"}}
                    id="lastNameId"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={e => {
                      this.updateDetail(e,{row},this.state.passengers);             
                    }}

  
                  />
                </Col>

              </Row>

              <Row form className="form-group pt-3">
                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"30px"}}
                    id="passportId"
                    placeholder="Passport No"
                    name="passportNo"
                    onChange={e => {
                      this.updateDetail(e,{row},this.state.passengers);                   
                    }}


                  />
                </Col>

                <Col md className="col-md-3">
                  <FormInput
                    style={{marginLeft:"100px"}}
                    id="ageId"
                    placeholder="Age"
                    name="age"
                    onChange={e => {
                      this.updateDetail(e,{row},this.state.passengers);             
                    }}

  
                  />
                </Col>

                <Col md className="col-md-3">
                  <FormSelect
                    onChange={e => {
                      this.updateDetail(e,{row},this.state.passengers);                 
                    }}
                    style={{marginLeft:"170px"}}
                    name="seatNo"
                  >
                    <option   value="DEFAULT" defaultValue={'DEFAULT'} >Seat</option>
                      {this.buildSeatNoOptions()}
                                         
                    </FormSelect>
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