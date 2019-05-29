import React from "react";
import Context from "./context.js";
import { Form } from 'react-bootstrap';
import { toaster } from 'evergreen-ui'
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../assets/js/host";
import loginImg from "../assets/img/login.png";
const cookies = new Cookies();
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: "",
    };
  }


  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    })
  }
  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    })

  }
  login() {
    let formData = new FormData();
    // var headers = {
    //   "Content-Type": "application/json",
    //   // token: cookies.get("token")
    // };
    formData.append("email", this.state.Email);
    formData.append("password", this.state.Password);
    axios({
      url: host + `api/user/login`,
      method: "POST",
      data: formData,
      //   headers: headers
    })
      .then(response => {

        cookies.set("token", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        if (response.data.role === 1) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/Profile";
        }
      })
      .catch(function (error) {
        if (error.response) {
          toaster.danger("Please check your email and password then try again");
        }
      });
  }




  render() {
    return (
      <Context.Consumer>
        {ctx => {

          return (
            <div>
              <img src={loginImg} alt="background" class="Background" />

              <div class="form">
                <div class="container">
                  <div class="TextCon">
                    <span class="Text">LOGIN</span>
                  </div>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control value={this.state.Email} onChange={this.onEmailChange.bind(this)} type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control value={this.state.Password} onChange={this.onPasswordChange.bind(this)} type="password" placeholder="Password" />
                      <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                   </Form.Text>
                    </Form.Group>
                    <span>
                      <div className="LoginDiv" onClick={() => {
                        this.login()
                      }}>
                        <span className="SearchForTickets" >
                          Login
                                            </span>
                      </div>
                    </span>
                  </Form>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default Login;