import React from "react";

import Context from "./context.js";
import { Container, Col, Row, Form, Card, Button, Alert, Badge } from 'react-bootstrap';
import { Pane, FilePicker, Dialog, Switch, CornerDialog, toaster } from 'evergreen-ui'
import Component from "@reactions/component";
import NavBar from "./NavBar";
import StripeCheckout from 'react-stripe-checkout';
import Departure from "../assets/img/Departure.png";
import Arrival from "../assets/img/arrival.png";
import FlightSearch from "./flight";
import axios from "axios";
import Cookies from "universal-cookie";

const host=`http://localhost:5000/`;
const cookies = new Cookies();

var PassPort="";

class Pay extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Country: '',
      Name: '',
      PhoneNumber: '',
      Flight: [],
      Flight2: [],
      price: '',
      Type: '',
      checked: true,
      Password: ""

    };
  }

  componentDidMount() {


  }
  onChangeCountry(value) {
    this.setState({
      Country: value
    })
    this.checkForm()
  }

  onChangePhoneNumber(value) {
    this.setState({
      PhoneNumber: value
    })
    this.checkForm()
  }
  onChangeName(value) {
    this.setState({
      Name: value
    })
    this.checkForm()
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    })
    this.checkForm()
  }
  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    })

  }
  LogincheckForm(){
    if (PassPort !== "") {
      document.getElementById('payFrom2').style.display="flex";
      
    }
  }
  checkForm() {
    console.log(this.state.Name,this.state.Email,this.state.PhoneNumber,this.state.Country,PassPort)
    if (this.state.Name !== "" && this.state.Email !== "" && this.state.PhoneNumber !== "" &&
      this.state.Country !== "" && PassPort !== "") {
          document.getElementById('payFrom').style.display="flex";
          // document.getElementById('payFrom').style.display="flex";
    }
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
        console.log(response)

        cookies.set("token", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        window.location.reload();
        // if (response.status == 200) {
        //   toaster.success(response.data);
        //   this.NetworkRequests();
        // }
      })
      .catch(function (error) {
        if (error.response) {
          toaster.danger("Please check your email and password then try again");
        }
      });
  }
  PaymentCheck(e) {
    this.setState({
      checked: e.target.checked
    })
    if (e.target.checked == false) {
      document.getElementById('StripeCheckout').style.display = "none"
      document.getElementById('PayLater').style.display = "block"

    } else {
      document.getElementById('PayLater').style.display = "none"
      document.getElementById('StripeCheckout').style.display = "block"

    }

  }
  componentWillMount() {
    let item = localStorage.getItem('itemStored');
    if (item) {
      var type = localStorage.getItem('flight-type').valueOf();
      type = JSON.parse(type);
      var obj = JSON.parse(item)
      this.setState({
        Flight: [obj],
        price: obj.price,
        Type: type
      })

    } else {
      this.setState({
        Type: ''
      })
    }
  }

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                
            if (this.state.Type=='Oneway') {
                    return (
                        <div >
                            <div>
                                <NavBar />
                            </div>
                            <div>
                                <br></br>
                                <br></br>
                                <Container>
                                    <Row>

                                        <Col md={4}>
                                            <Card>
                                                <Card.Header id="CardResult">Payment Information</Card.Header>
                                               
                                                <Card.Body     
                                                 style={ ctx.value.auth === "login" 
                                                ? {}
                                                : { display: "none" }
                                                    } >
                                                <Row>
                                                    <Col >
                                                    <div>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>PassPort Copy <Badge variant="danger">Images Only</Badge></Form.Label>
                                                            <FilePicker
                                                                multiple
                                                                width={250}
                                                                marginBottom={32}
                                                                onChange={(files)=>{
                                                                    PassPort=files[0]
                                                                    console.log(PassPort)
                                                                    this.LogincheckForm();
                                                                }}
                                                                />
                                                        </Form.Group>
                                                        <Form.Label>Pay Now</Form.Label>
                                                        <p id="Pdanger">* Please make sure you are entered a right information </p>
                                                        <p id="Pdanger">*Please fill all fields to continue</p>
                                                      
                                                        <br></br>
                                                        <Component initialState={{ checked: this.state.checked }}>
                                                            {({ state, setState }) => (
                                                                <Switch
                                                                height={24}
                                                                checked={this.state.checked}
                                                                onChange={(e)=>{
                                                                    this.PaymentCheck(e)
                                                                    
                                                                }}
                                                                />
                                                            )}
                                                            </Component>
                                                            <br></br>
                                                    <h5> Only <Badge variant="secondary">{(this.state.price)} $</Badge></h5>
                                                                <br></br>
                                                                <div id="payFrom2">
                                                        <div id="StripeCheckout">


                                                            <StripeCheckout

                                                                token={(token) => {

                                                                    ctx.actions.pay(token,this.state.Name,this.state.Email,this.state.PhoneNumber,this.state.Country,PassPort)
                                                                 
                                                                }}
                                                                stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
                                                            />
                                                        </div>
                                                   
                                                   <button  id="PayLater" onClick={()=>{
                                                     ctx.actions.CompanyPay(PassPort)
                                                   }}>Pay Later</button>
                                                    </div>
                                                    </div>
                                                    </Col>

                                                </Row>

                                                </Card.Body >
                                            

                                                <Card.Body  
                                                style={ ctx.value.auth === "login" 
                                                ? {display: "none" }
                                                : { }
                                                    }>
                                                <Row>
                                                    <Col >
                                                    <div>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" value={this.state.Email} placeholder="name@example.com"
                                                                onChange={(event) => {
                                                                  this.onEmailChange(event)
                                                                    // this.setState({
                                                                    //     Email:event.target.value
                                                                    // })
                                                                    console.log(this.state.Email)
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Full Name</Form.Label>
                                                            <Form.Control type="text" value={this.state.Name} placeholder="Enter your Full name"
                                                                onChange={(event) => {
                                                                  this.onChangeName(event.target.value)
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Faimly Name</Form.Label>
                                                            <Form.Control type="text" value={this.state.Name} placeholder="Enter your Faimly Name"
                                                                onChange={(event) => {
                                                                  this.onChangeName(event.target.value)
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="number" value={this.state.PhoneNumber} placeholder="example: 001-541-754-3010"
                                                                onChange={(event) => {
                                                                  this.onChangePhoneNumber(event.target.value)
                                                               
                                                                    
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Nationality</Form.Label>
                                                            <Form.Control type="text" value={this.state.Country} placeholder="Enter your Country"
                                                                onChange={(event) => {
                                                                  this.onChangeCountry(event.target.value)
                                                             
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>PassPort Copy <Badge variant="danger">Images Only</Badge></Form.Label>
                                                            <FilePicker
                                                                multiple
                                                                width={250}
                                                                marginBottom={32}
                                                                onChange={(files)=>{
                                                                    PassPort=files[0]
                                                                    this.checkForm()
                                                                }}
                                                                />
                                                        </Form.Group>
                                                        <Row>
                                                        <Col md={12} >
                                                        <p id="Pdanger">* Please make sure you are entered a right information </p>
                                                        <p id="Pdanger">* If you have membership login to continue if not please fill all fields</p>
                                                    
                                                        </Col>
                                                        </Row>
                                                       
                                                        <br></br>
                                                    <h5> Only <Badge variant="secondary">{(this.state.price)} $</Badge></h5>
                                                                <br></br>
                                                             <Row >
                                                                <Col id="payFrom">
                                                                <div id="StripeCheckout">
                                                                <StripeCheckout

                                                                    token={(token) => {

                                                                        ctx.actions.pay(token,this.state.Name,this.state.Email,this.state.PhoneNumber,this.state.Country,PassPort)
                                                                        PassPort="";
                                                                    }}
                                                                    stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
                                                                />
                                                                </div>
                                                                                                                            
                                                                    </Col>
                                                                    <Col>
                                                                   
                                                                    <Component initialState={{ isShown: false }}>
                                                                    {({ state, setState }) => (
                                                                        <React.Fragment>
                                                                        <CornerDialog
                                                                            title="Login To Continue"
                                                                            isShown={state.isShown}
                                                                            hasFooter={false}
                                                                            onCloseComplete={() => setState({ isShown: false })}
                                                                        >
  <Form>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" placeholder="Enter email" value={this.state.Email} onChange={(event)=>{
                                                                this.onEmailChange(event)
                                                            }}/>

                                                        </Form.Group>

                                                        <Form.Group controlId="formBasicPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" placeholder="Password" value={this.state.Password} onChange={(event)=>{
                                                                this.onPasswordChange(event)
                                                            }}/>
                                                            <Form.Text className="text-muted">
                                                            We'll never share your Password with anyone else.
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Button variant="primary" onClick={this.login.bind(this)} >
                                                            Login
                                                        </Button>


                                                        </Form>
                                                                        </CornerDialog>
                                                                        <button onClick={() => setState({ isShown: true })} id="PayasCompany">Membership?</button>
                                                                        </React.Fragment>
                                                                    )}
                                                                    </Component>                                                   
                                                                    </Col>
                                                                    </Row>
                                                         </div>
                                           
                                                    </Col>

                                                </Row>

                                                </Card.Body>
                                            
                                            </Card>

                                        </Col>
                                      
                                        <Col>
                                        <Col >
                                               {this.state.Flight.map((item,i) => (
                          <Card id="CardTiket" key={i} body>
                            <Row style={{ marginRight: 0 + "px" }}>
                              <Col>
                                <img id="AirilineLogoCover" src={item.logoCover} />

                              </Col>
                              <Col >
                                <h4 id="TimeH4">{item.depDateAndTime[0]}</h4>
                                <p>
                                  {item.departingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.totalDuration}</label>
                                  <span className="stops">
                                    <span style={item.stops == 1 || item.stops == 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.stops == 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.layOverCity[0]} ,{item.layOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.stops == 0 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[0]}</h4>
                                <h4 style={item.stops == 1 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[1]}</h4>
                                <h4 style={item.stops == 2 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[2]}</h4>
                                <p>
                                  {item.arrivalAirportName}
                                </p>
                              </Col>

                            </Row>
                            <hr id="HrDivider" />
                            <Row>
                              <Col md={{ span: 3, offset: 3 }}>
                                <Component initialState={{ isShown: false }}>
                                  {({ state, setState }) => (
                                    <Pane>
                                      <Dialog
                                        isShown={state.isShown}
                                        onCloseComplete={() => setState({ isShown: false })}
                                        hasFooter={false}
                                        hasHeader={false}
                                        width={700}
                                      >
                                        <Alert id="warningCard" variant="warning">
                                          From {item.depCityName[0]} To {item.arrCityName[0]}
                                        </Alert>
                                        <Card id="CardTiket" body>

                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img id="AirilineLogo" src={item.airlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.airlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.depDateAndTime[0]}</h4>
                                              <p>
                                              {item.departingAirportName}
                                              
                                             </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.layOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.arrDateAndTime[0]}</h4>
                                              <p>
                                                {item.arrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>
                                        <hr />
                                        <div style={item.stops == 1 || item.stops == 2 ? {} : { display: "none" }}>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[1]} To {item.arrCityName[1]}
                                          </Alert>
                                          <Card id="CardTiket" body>

                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.airlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.depDateAndTime[1]}</h4>
                                                <p>
                                                  {item.arrAirportName[0]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.arrDateAndTime[1]}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <div style={item.stops == 2 ? {} : { display: "none" }}>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[2]} To {item.arrCityName[2]}
                                          </Alert>
                                          <Card id="CardTiket" body>

                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.airlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.depDateAndTime[2]}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.arrDateAndTime[2]}</h4>
                                                <p>
                                                  {item.arrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>


                                        </div>

                                        <hr id="HrDivider" />
                            

                                      </Dialog>
                                      <Col  md={{ span: 4, offset: 5 }}>
                                      <div className="DetailsDiv">
                                        <a className="ChooseaTourBtm" onClick={() => setState({ isShown: true })}>Details</a>
                                      </div>
                                      </Col>
                                    </Pane>
                                  )}
                                </Component>


                              </Col>
                              <Col>
                              
                              </Col>

                            </Row>
                          </Card>
                        
                        
                        ))}

                                               </Col>
                                               
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                        </div>

                    )
                }else if (this.state.Type=='Roundtrip') {
                    return (
                        <div >
                            <div>
                                <NavBar />
                            </div>
                            <div>
                                <br></br>
                                <br></br>
                                <Container>
                                    <Row>


                                    <Col md={4}>
                                            <Card>
                                                <Card.Header id="CardResult">Payment Information</Card.Header>
                                               
                                                <Card.Body     
                                                 style={ ctx.value.auth === "login" 
                                                ? {}
                                                : { display: "none" }
                                                    } >
                                                <Row>
                                                    <Col >
                                                    <div>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>PassPort Copy <Badge variant="danger">Images Only</Badge></Form.Label>
                                                            <FilePicker
                                                                multiple
                                                                width={250}
                                                                marginBottom={32}
                                                                onChange={(files)=>{
                                                                    PassPort=files[0]
                                                                    console.log(PassPort)
                                                                    this.LogincheckForm();
                                                                }}
                                                                />
                                                        </Form.Group>
                                                        <Form.Label>Pay Now</Form.Label>
                                                        <p id="Pdanger">* Please make sure you are entered a right information </p>
                                                        <p id="Pdanger">*Please fill all fields to continue</p>
                                                      
                                                        <br></br>
                                                        <Component initialState={{ checked: this.state.checked }}>
                                                            {({ state, setState }) => (
                                                                <Switch
                                                                height={24}
                                                                checked={this.state.checked}
                                                                onChange={(e)=>{
                                                                    this.PaymentCheck(e)
                                                                    
                                                                }}
                                                                />
                                                            )}
                                                            </Component>
                                                            <br></br>
                                                    <h5> Only <Badge variant="secondary">{(this.state.price)} $</Badge></h5>
                                                                <br></br>
                                                                <div id="payFrom2">
                                                        <div id="StripeCheckout">


                                                            <StripeCheckout

                                                                token={(token) => {

                                                                    ctx.actions.pay(token,this.state.Name,this.state.Email,this.state.PhoneNumber,this.state.Country,PassPort)
                                                                 
                                                                }}
                                                                stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
                                                            />
                                                        </div>
                                                   
                                                   <button  id="PayLater" onClick={()=>{
                                                     ctx.actions.CompanyPay(PassPort)
                                                   }}>Pay Later</button>
                                                    </div>
                                                    </div>
                                                    </Col>

                                                </Row>

                                                </Card.Body >
                                            

                                                <Card.Body  
                                                style={ ctx.value.auth === "login" 
                                                ? {display: "none" }
                                                : { }
                                                    }>
                                                <Row>
                                                    <Col >
                                                    <div>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" value={this.state.Email} placeholder="name@example.com"
                                                                onChange={(event) => {
                                                                  this.onEmailChange(event)
                                                                    // this.setState({
                                                                    //     Email:event.target.value
                                                                    // })
                                                                    console.log(this.state.Email)
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control type="text" value={this.state.Name} placeholder="Enter your name"
                                                                onChange={(event) => {
                                                                  this.onChangeName(event.target.value)
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="number" value={this.state.PhoneNumber} placeholder="example: 001-541-754-3010"
                                                                onChange={(event) => {
                                                                  this.onChangePhoneNumber(event.target.value)
                                                               
                                                                    
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Country</Form.Label>
                                                            <Form.Control type="text" value={this.state.Country} placeholder="Enter your Country"
                                                                onChange={(event) => {
                                                                  this.onChangeCountry(event.target.value)
                                                             
                                                                }} />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>PassPort Copy <Badge variant="danger">Images Only</Badge></Form.Label>
                                                            <FilePicker
                                                                multiple
                                                                width={250}
                                                                marginBottom={32}
                                                                onChange={(files)=>{
                                                                    PassPort=files[0]
                                                                    this.checkForm()
                                                                }}
                                                                />
                                                        </Form.Group>
                                                        <Row>
                                                        <Col md={12} >
                                                        <p id="Pdanger">* Please make sure you are entered a right information </p>
                                                        <p id="Pdanger">* If you have membership login to continue if not please fill all fields</p>
                                                    
                                                        </Col>
                                                        </Row>
                                                       
                                                        <br></br>
                                                    <h5> Only <Badge variant="secondary">{(this.state.price)} $</Badge></h5>
                                                                <br></br>
                                                             <Row >
                                                                <Col id="payFrom">
                                                                <div id="StripeCheckout">
                                                                <StripeCheckout

                                                                    token={(token) => {

                                                                        ctx.actions.pay(token,this.state.Name,this.state.Email,this.state.PhoneNumber,this.state.Country,PassPort)
                                                                        PassPort="";
                                                                    }}
                                                                    stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
                                                                />
                                                                </div>
                                                                                                                            
                                                                    </Col>
                                                                    <Col>
                                                                   
                                                                    <Component initialState={{ isShown: false }}>
                                                                    {({ state, setState }) => (
                                                                        <React.Fragment>
                                                                        <CornerDialog
                                                                            title="Login To Continue"
                                                                            isShown={state.isShown}
                                                                            hasFooter={false}
                                                                            onCloseComplete={() => setState({ isShown: false })}
                                                                        >
  <Form>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" placeholder="Enter email" value={this.state.Email} onChange={(event)=>{
                                                                this.onEmailChange(event)
                                                            }}/>

                                                        </Form.Group>

                                                        <Form.Group controlId="formBasicPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" placeholder="Password" value={this.state.Password} onChange={(event)=>{
                                                                this.onPasswordChange(event)
                                                            }}/>
                                                            <Form.Text className="text-muted">
                                                            We'll never share your Password with anyone else.
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Button variant="primary" onClick={this.login.bind(this)} >
                                                            Login
                                                        </Button>


                                                        </Form>
                                                                        </CornerDialog>
                                                                        <button onClick={() => setState({ isShown: true })} id="PayasCompany">Membership?</button>
                                                                        </React.Fragment>
                                                                    )}
                                                                    </Component>                                                   
                                                                    </Col>
                                                                    </Row>
                                                         </div>
                                           
                                                    </Col>

                                                </Row>

                                                </Card.Body>
                                            
                                            </Card>

                                        </Col>
                                      
                                        <Col>
                                        <Col >
                                        {this.state.Flight.map((item,i) => (
                          <Card id="CardTiket" key={i} body>
                            <Alert variant="primary" id="alert-primary">
                              Departure
                           <img id="Departure" src={Departure} />
                            </Alert>
                            <Row style={{ marginRight: 0 + "px" }}>
                              <Col>
                                <img id="AirilineLogoCover" src={item.logoCover} />

                              </Col>
                              <Col >
                                <h4 id="TimeH4">{item.depDateAndTime[0]}</h4>
                                <p>
                                  {item.departingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.totalDuration}</label>
                                  <span className="stops">
                                    <span style={item.stops == 1 || item.stops == 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.stops == 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.layOverCity[0]} ,{item.layOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.stops == 0 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[0]}</h4>
                                <h4 style={item.stops == 1 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[1]}</h4>
                                <h4 style={item.stops == 2 ? {} : { display: "none" }} id="TimeH4">{item.arrDateAndTime[2]}</h4>
                                <p>

                                  {item.arrivalAirportName}
                                </p>
                              </Col>
                            </Row>
                            <hr id="HrDivider" />
                            <Alert variant="success" id="alert-success">
                              Return
                              <img id="Departure" src={Arrival} />
                            </Alert>
                            <Row style={{ marginRight: 0 + "px" }}>

                              <Col>
                                <img id="AirilineLogoCover" src={item.ReturnLogoCover} />

                              </Col>
                              <Col >
                                <h4 id="TimeH4">{item.ReturnAepDateAndTime[0]}</h4>
                                <p>
                                  {item.ReturnDepartingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.ReturnTotalDuration}</label>
                                  <span className="stops">
                                    <span style={item.ReturnStops == 1 || item.ReturnStops == 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.ReturnStops == 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.ReturnLayOverCity[0]} ,{item.ReturnLayOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.ReturnStops == 0 ? {} : { display: "none" }} id="TimeH4">{item.ReturnArrDateAndTime[0]}</h4>
                                <h4 style={item.ReturnStops == 1 ? {} : { display: "none" }} id="TimeH4">{item.ReturnArrDateAndTime[1]}</h4>
                                <h4 style={item.ReturnStops == 2 ? {} : { display: "none" }} id="TimeH4">{item.ReturnArrDateAndTime[2]}</h4>
                                <p>
                                  {item.ReturnArrivalAirportName}
                                </p>
                              </Col>

                            </Row>
                            <hr id="HrDivider" />
                            <Row>
                              <Col md={{ span: 3, offset: 3 }}>
                                <Component initialState={{ isShown: false }}>
                                  {({ state, setState }) => (
                                    <Pane>
                                      <Dialog
                                        isShown={state.isShown}
                                        onCloseComplete={() => setState({ isShown: false })}
                                        hasFooter={false}
                                        hasHeader={false}
                                        width={700}
                                      >
                                        <Alert variant="success" id="alert-primary">
                                          Departure
                              <img id="Departure" src={Departure} />
                                        </Alert>
                                        <Card id="CardTiket" body>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[0]} To {item.arrCityName[0]}
                                          </Alert>
                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img id="AirilineLogo" src={item.airlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.airlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.depDateAndTime[0]}</h4>
                                              <p>
                                              {item.departingAirportName}
                              </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.layOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.arrDateAndTime[0]}</h4>
                                              <p>
                                                {item.arrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>

                                        <hr />

                                        <div style={item.stops == 1 || item.stops == 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.depCityName[1]} To {item.arrCityName[1]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.airlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.depDateAndTime[1]}</h4>
                                                <p>
                                                  {item.arrAirportName[0]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.arrDateAndTime[1]}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <div style={item.stops == 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.depCityName[2]} To {item.arrCityName[2]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.airlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.depDateAndTime[2]}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.arrDateAndTime[2]}</h4>
                                                <p>
                                                  {item.arrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <hr id="HrDivider" />

                                        <Alert variant="success" id="alert-success">
                                          Return
                              <img id="Departure" src={Arrival} />
                                        </Alert>
                                        <Card id="CardTiket" body>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.ReturnDepCityName[0]} To {item.ReturnArrCityName[0]}
                                          </Alert>
                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img id="AirilineLogo" src={item.ReturnairlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.ReturnAirlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.ReturnAepDateAndTime[0]}</h4>
                                              <p>

                                                {item.ReturnDepartingAirportName}
                                              </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.ReturnLayOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{item.ReturnArrDateAndTime[0]}</h4>
                                              <p>
                                                {item.ReturnArrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>

                                        <hr />

                                        <div style={item.ReturnStops == 1 || item.ReturnStops == 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.ReturnDepCityName[1]} To {item.ReturnArrCityName[1]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.ReturnairlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.ReturnAirlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.ReturnAepDateAndTime[1]}</h4>
                                                <p>

                                                  {item.ReturnArrAirportName[0]}
                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.ReturnLayOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.ReturnArrDateAndTime[1]}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>
                                        </div>
                                        <div style={item.ReturnStops == 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.ReturnDepCityName[2]} To {item.ReturnArrCityName[2]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img id="AirilineLogo" src={item.ReturnairlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.ReturnAirlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.ReturnAepDateAndTime[2]}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[1]}
                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.ReturnLayOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.ReturnArrDateAndTime[2]}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>
                                        </div>
                                        <hr id="HrDivider" />

                                      </Dialog>
                                      <Col  md={{ span: 4, offset: 5 }}>
                                      <div className="DetailsDiv">
                                        <a className="ChooseaTourBtm" onClick={() => setState({ isShown: true })}>Details</a>
                                      </div>
                                      </Col>
                                    </Pane>
                                  )}
                                </Component>


                              </Col>
                              <Col>

                              </Col>

                            </Row>
                          </Card>
                        ))}

                                               </Col>
                                               
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                        </div>

                    )
                }else if(this.state.Type==''){
                    return(
                      <div>
                            <FlightSearch/>
                      </div>
                    )
                }
                }}
            </Context.Consumer>
        );
    }
}

export default Pay;