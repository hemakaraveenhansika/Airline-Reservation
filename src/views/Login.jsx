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



import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

const now = new Date();
const time = new Date();
time.setFullYear(now.getFullYear() - 18);

class Login extends React.Component {
  state = {
    email: null,
    password: null,

  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      this.props.history.push('/user/home');
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
    };

    const inputstyle = {
      width:"400px",
    };

    const {
      password,
      email,

    } = this.state;
    const validEmail = this.validator.message(
      "email",
      email,
      "required|alpha"
    );
    const validPassword = this.validator.message(
      "password",
      password,
      "required|alpha"
    );


    console.log(this.state.nic);

    
    return (

      <Card small className="mb-5 col-4 bg-light" style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="login-panel">
          <span style={{fontSize:"50px",paddingLeft:"20px",marginLeft:"80px"}}>&#9992;</span>
          <span style={{fontSize:"35px", color:"#339bb9",fontWeight:"bold"}}> Air Express</span> <br/><br/>
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",width:"200px"}}>Log-in</label><br/><br/>
        </div>
        </CardHeader>
        <Col>

          <Form>

            <Row form className="form-group pt-3">
              <Col md className="pr-0">
                <FormInput
                  style={inputstyle}
                  id="emailId"
                  placeholder="Email"
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  invalid={validEmail}
                />
              </Col>
            </Row>
            <Row form className="form-group pt-3">
              <Col md className="pr-0">
                <FormInput
                  style={inputstyle}
                  id="passwordId"
                  type="password"
                  placeholder="Password"
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                  invalid={validPassword}
                />
              </Col>
            </Row>

            <Row form className="justify-content-end pt-3">
              <Button
                theme="primary"
                className="mb-3"
                onClick={() => {
                  this.submit();
                }}
              >
                Log
              </Button>
            </Row>


            
          </Form>
        </Col>
      </Card>
    );
  }
}

export default Login;
