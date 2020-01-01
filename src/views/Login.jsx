import React from "react";
import {
  Col,
  Form,
  FormInput,
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

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    logstate:true,
    userId:'',
    airports:null,

  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }
  submit() {
    if(this.validate()){
      axios.post("http://localhost:5000/login",{email:this.state.email,password:this.state.password}).then((response)=>
      {
        if(response.data.success){
          // let tmpArray = []
          // for (var i = 0; i < response.data.data.length; i++) {
          //     tmpArray.push(response.data.data[i]);
          // }
          // console.log(response.data.user_id);

          // var token=response.data.token;
          // var jwt = require("jsonwebtoken");
          // var decode = jwt.decode(token);
          // console.log(decode);

          this.props.history.push({
            pathname: '/user/home',
            state: {token:response.data.token,
            userId:response.data.user_id
            },
            
          });
        }else{
          this.setState({ logstate:false }); 
        }
        
      })
      
      
      }
  }



  
  validate() {
    if (this.validator.allValid()) {

        return true;
      
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
      marginLeft:"50px",
    };

    const {
      password,
      email,

    } = this.state;
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


    return (
  

      <Card small  style={cardstyle}>
        <CardHeader className="border-bottom">
        <div className="login-panel">
          <span style={{fontSize:"50px",paddingLeft:"20px",marginLeft:"80px"}}>&#9992;</span>
          <span style={{fontSize:"35px", color:"#339bb9",fontWeight:"bold"}}> Air Express</span> <br/><br/>
          <label style={{fontSize:"28px",fontWeight:"bold",color:"#339bb9",marginLeft:"50px",}}>Log-in</label><br/><br/>
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
            {!this.state.logstate ? <span style={{color: "red",marginLeft:"50px"}}>Worng username or password</span> : ''} 

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
