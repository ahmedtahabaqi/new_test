import React from "react";
import Context from "./context.js";
import {Form} from 'react-bootstrap';
import { Button} from 'evergreen-ui';
import axios from "axios";


class test extends React.Component {
  constructor() {
    super();
    this.displayDataAdt = [];
    this.displayDataAdt2=[];
    this.state = {
        ToursImg:[],
        Adtdata : this.displayDataAdt,
        Adtdata2 : this.displayDataAdt2,
        email:"",
        password:""

    };
    //this.html()
  }



  login(){
      var email=this.state.email;
      var password=this.state.password

      axios.post('https://aborafel.herokuapp.com/api/v1/auth/login/', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    // const listItems = this.state.Countries.map((number,i) =>

    //   <option key={i} value={number}>{number}</option>

    // // <li><a>{number}</a></li>
    // );
    return (
<div>
      <Context.Consumer>
        {ctx => {
            return(
                <div>
             <div>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control value={this.state.email} type="email" placeholder="Enter email"  onChange={(e)=>{
        this.setState({
            email:e.target.value
        })
    }}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e)=>{
        this.setState({
            password:e.target.value
        })
    }} />
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" onClick={()=>{
      this.login()
  }} >
    Submit
  </Button>
</div>
                </div>
            )
        

        }}
      </Context.Consumer>
      </div>
    );
  }
}

export default test;