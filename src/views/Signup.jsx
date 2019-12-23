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

import axios from 'axios';

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

class Signup extends React.Component {
  state = {
    discount: 3,   
    firstName: null,
    lastName: null,
    address: null,
    email: null,
    password: null,
    confirmPassword: null,
    status:0,    
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    // if(this.validate()){
    // this.props.history.push('/login');
    // }
    if(this.validate()){
      console.log(this.state.firstName);
      axios.post("http://localhost:5000/register",{discount_ID:this.state.discount,first_name:this.state.firstName,last_name:this.state.lastName,address:this.state.address,email:this.state.email,password:this.state.password}).then((response)=>
      {
        console.log('RESPONSE',response.data.success);
        console.log(this.state.email);
      console.log(this.state.password);

      })
      
      //  this.props.history.push('/user/home');
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
      marginTop:"120px",
      marginLeft:"500px",
      marginRight:"500px",
      backgroundColor:" #dedede "
    };

    const inputstyle = {
      width:"400px",
    };

    const {
      firstName,
      lastName,
      address,
      email,
      password,
      confirmPassword,
    } = this.state;

    const validFirstName = this.validator.message(
      "firstName",
      firstName,
      "required|alpha"
    );
    const validLastName = this.validator.message(
      "lastName",
      lastName,
      "required|alpha"
    );
    const validAddress = this.validator.message(
      "address",
      address,
      "required|alpha"
    );
    const validEmail = this.validator.message(
      "email", 
      email, 
      "required|email"
    );    
    const validPassword = this.validator.message(
      "password",
      password,
      "required|alpha"
    );
    const validPasswordConfirm = this.validator.message(
      "passwordConfirm",
      confirmPassword,
      "required"
    );
    const checkConfirmPassword = password === confirmPassword;


    
    return (

      <Card style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="signup-panel">
          <span style={{fontSize:"50px",paddingLeft:"20px",marginLeft:"80px"}}>&#9992;</span>
          <span style={{fontSize:"35px", color:"#339bb9",fontWeight:"bold"}}> Air Express</span> <br/><br/>
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>Sign-in</label><br/><br/>
        </div>
        </CardHeader>
        <Col>

          <Form>

            <Row form className="form-group pt-3">
              <Col md className="pr-0">
                <FormInput
                  id="firstNameId"
                  placeholder="First Name"
                  onChange={e => {
                    this.setState({ firstName: e.target.value });
                  }}
                  invalid={validFirstName}
                />
              </Col>
              <Col md className="pr-0">
                <FormInput
                  id="lastNameId"
                  placeholder="Last Name"
                  onChange={e => {
                    this.setState({ lastName: e.target.value });
                  }}
                  invalid={validLastName}
                />
              </Col>
            </Row>
            <Row form className="form-group">
                <FormInput
                  id="emailId"
                  placeholder="Email"
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  invalid={validEmail}
                />              
            </Row>
            <Row form className="form-group">
                <FormInput
                  id="addressId"
                  placeholder="Address"
                  onChange={e => {
                    this.setState({ address: e.target.value });
                  }}
                  invalid={validAddress}
                />              
            </Row>
            <Row form className="pb-3">
              <FormInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                invalid={validPassword}
              />
            </Row>
            <Row form className="pb-3">
              <FormInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={e => {
                  this.setState({ confirmPassword: e.target.value });
                }}
                invalid={
                  validPasswordConfirm ||
                  (confirmPassword !== null && !checkConfirmPassword)
                }
              />
            </Row>
            <Row form className="form-group pt-3">
              
            </Row>

            <Row form className="justify-content-end pt-3">
              <Button
                theme="primary"
                className="mb-3"
                onClick={() => {
                  this.submit();
                }}
              >
                Sing Up
              </Button>
            </Row>


            
          </Form>
        </Col>
      </Card>
    );
  }
}

export default Signup;
