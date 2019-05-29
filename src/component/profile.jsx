import React from "react";
import Context from "./context.js";
import NavBar from "./NavBar";
import { Pane, Dialog, toaster } from 'evergreen-ui'
import Component from "@reactions/component";
import Logo from "../assets/img/logo54.png";
import { Container, Col, Row, Form, Button,  Badge} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from "axios";
import Home from "./home";
import {Launcher} from 'react-chat-window'
import host from "../assets/js/host";
import mp3 from "../assets/mp3/stairs.mp3";
import openSocket from 'socket.io-client';
const hostsocket=`https://www.favorite-holiday.com/`;
var io = openSocket.connect(
  hostsocket,
  // host,
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
  }
);
io.on("disconnect", () => {
  toaster.danger("Server Connection Lost");
});
io.on("connect", () => {
  // toaster.notify("Real Time Active");
});
io.on("reconnect_attempt", attemptNumber => {
  toaster.warning("Attempting To Reconnect To Server "+attemptNumber);
});




const cookies = new Cookies();

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Country: '',
      Name: '',
      PhoneNumber: '',
      Orders: [],
      OrdersOneWay: [],
      messageList:[],
      Amount: '',
      session:[],
      file:[],

    };
    this.SocketData();
  }



  play(){
    var audio = new Audio(mp3);
    audio.play();
  
  }
  _onMessageWasSent(message) {
    // this.setState({
    //   messageList: [...this.state.messageList, message]
    // })
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    formData.append("to", '5cd7143369bc692730bfe709');
    var body;

    if (message.type==="emoji") {
      body=message.data.emoji
    } else if (message.type==="text") {
      body=message.data.text
         
    }
    else if (message.type==="file") {
      formData.append("file", this.state.file[0]);
    }
 
    formData.append("body", body);
    axios({
      url: host + `api/Messages/add`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        if (response.data.type === 'text') {
          this.setState({
            messageList: [...this.state.messageList, message]
          })
        } else if (response.data.type==="file") {
          let msg={  
            author: 'me',
          type: 'file',
          data: {
            url: host+response.data.file,
            fileName: response.data.file
          }
        }
        
        this.setState({
          messageList: [...this.state.messageList, msg]
        })
      }

          
      

    
        // let Orders = [...this.state.chatData, data];
        // this.findByid(this.state.userId)
        // this.setState({
        //     chatData:Orders
        // })

      })
      .catch(function (error) {
        console.log(error)
      });
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          body:  text 
        }]

      })
    }
  }

  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    axios({
      url: host + `api/Messages/`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        let messageList=[]
          for (let index = 0; index < response.data.result.length; index++) {
            // messageList.push(response.data[index].body)
            let from;
            if (response.data.result[index].type==='text') {

              if ( response.data.result[index].from._id===response.data.session._id) {
                from="me"
              }else{
                from=response.data.result[index].from
              }
  
              let obj={
                author:from,
                data:{text: response.data.result[index].body},
                type: "text"
              }
              messageList.push(obj)

            }else if (response.data.result[index].type==='file') {
              if ( response.data.result[index].from._id===response.data.session._id) {
                from="me"
              }else{
                from=response.data.result[index].from
              }
  
              let obj={
                author:from,
                data:{
                  url: host+response.data.result[index].file,
                  fileName: response.data.result[index].file
                },
                type: "file"
              }
   messageList.push(obj)
            }
          
            
          }
          this.setState({
            messageList: messageList,
            session:response.data.session
            // sesson:response.Data[0][1].sesson
          })
        
      })
      .catch(function (error) {

      });


    axios({
      url: host + `api/user/profile/Orders`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          this.setState({
            Orders: response.data,
            // sesson:response.Data[0][1].sesson
          })
        }

        // if (response.status === 200) {
        //   toaster.success(response.Data[0]);
        //   this.NetworkRequests();
        // }
      })
      .catch(function (error) {

      });
  }

  onChangeAmount(value) {
    this.setState({
      Amount: value
    })
  }
  pay(token) {

    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };

    formData.append("stripeToken", token.id);
    formData.append("money", this.state.Amount);
    axios({
      url: host + `api/user/pay/`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {

        if (response.status === 200) {
          toaster.success(`Payment Successful Thank You`);
          setTimeout(function () {
            window.location.reload();

          }, 2000);

        }
      })
      .catch(function (error) {
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });

  }

  EditProFile(){
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var Country = document.getElementById('Country').value;

    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("Country", Country);
    axios({
      url: host + `api/user/update/`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {

        if (response.status === 200) {
          toaster.success(`Profile has update  Successful `);
          setTimeout(function () {
            window.location.reload();

          }, 1000);

        }
      })
      .catch(function (error) {
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });
    console.log(name,phone,Country)
  }

  EditPassword(){

    var password1 = document.getElementById('passwrod1').value;
    var password2 = document.getElementById('password2').value;
    var password3 = document.getElementById('passwrod3').value;

if (password2===password3) {
  let formData = new FormData();
  var headers = {
    "Content-Type": "application/json",
    token: cookies.get("token")
  };
  
  formData.append("passwordNew", password2);
  formData.append("password", password1);

  axios({
    url: host + `api/user/updatePassword/`,
    method: "POST",
    data: formData,
    headers: headers
  })
    .then(response => {

      if (response.status === 200) {
        toaster.success(`Password has Change  Successful `);
        setTimeout(function () {
          cookies.remove("token");
          window.location.href = "/";

        }, 1000);

      }
    })
    .catch(function (error) {
      if (error.request.response) {
        toaster.danger(error.request.response);
      }
    });

}else{
  toaster.danger('New password is not match with confirmation password');
}
   
  }




  SocketData() {



    io.on("chat", data => {
        console.log(data)
        this.componentDidMount()
        if (data.from!==this.state.session._id&&data.to===this.state.session._id) {
          this.play()
        }
    });
    
    io.on("typingMessage", () => {
     alert('typingMessage')
  });

  }







  render() {
    return (
      <Context.Consumer>
        {ctx => {
          if (ctx.value.auth==="login") {
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
  
                      <div className="col-xl-5 col-md-6 mb-4">
                        <div className="card border-left-danger shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-item.Data[0]s-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"><h5>Balance</h5></div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                 <Badge variant="danger">{(ctx.value.sesson.money)} $</Badge>
                                
                             
                                 </div>
         

                              </div>
                              <div className="col-mb-4">
                           
                              <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title="Edit Profile"
        onC
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Save"
        onConfirm={this.EditProFile.bind(this)}
      >
      <Form.Group >
    <Form.Label>Name</Form.Label>
    <Form.Control id="name" type="text" placeholder="Enter Name" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Phone Number</Form.Label>
    <Form.Control id="phone" type="number" placeholder="Enter Phone Number" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Country</Form.Label>
    <Form.Control id="Country" type="text" placeholder="Enter Country" />
  </Form.Group>
  <br></br>

  <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title="Change Password"
        onC
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Change"
        onConfirm={this.EditPassword.bind(this)}
      >
      <Form.Group >
    <Form.Label>Current Password</Form.Label>
    <Form.Control id="passwrod1" type="password" placeholder="Current Password" />
  </Form.Group>

  <Form.Group >
    <Form.Label>New-Password</Form.Label>
    <Form.Control id="password2" type="password" placeholder="New-Password" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Re-Enter New  Password</Form.Label>
    <Form.Control id="passwrod3" type="password" placeholder="Re-Enter New  Password" />
  </Form.Group>
      </Dialog>
    <Button onClick={() => setState({ isShown: true })}>Change Password</Button>
    </Pane>
  )}
</Component>

      </Dialog>
      <Button onClick={() => setState({ isShown: true })}>Edit ProFile</Button>
    </Pane>
  )}
</Component>




                                {/* <Component initialState={{ isShown: false }}>
                                  {({ state, setState }) => (
                                    <Pane>
                                      <Dialog
                                        isShown={state.isShown}
                                        title="No footer"
                                        onCloseComplete={() => setState({ isShown: false })}
                                        hasFooter={false}
                                      >
                                        <label >How you want to Pay?</label>
                                        <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                          </InputGroup.Prepend >
                                          <FormControl aria-label="Amount (to the nearest dollar)" value={this.state.Amount} onChange={(e) => {
                                            this.onChangeAmount(e.target.value)
                                          }} />
                                          <InputGroup.Append >
                                            <InputGroup.Text>.00</InputGroup.Text>
                                          </InputGroup.Append>
                                        </InputGroup>
  
                                        <StripeCheckout
  
                                          token={(token) => {
  
                                            this.pay(token)
  
                                          }}
                                          stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
                                        />
  
                                      </Dialog>
                                      <div className="DetailsDiv" onClick={() => setState({ isShown: true })}>
                                        <a className="ChooseaTourBtm" >Pay Now</a>
                                      </div>
  
                                    </Pane>
                                  )}
                                </Component>
   */}
  
  
  
  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  
  
                    </Row>
                    <Row>
                      <Col>
  
                        <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Orders</h6>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Payed</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Order Type</th>
                                </tr>
                              </thead>
                              <tbody>
  
                                {this.state.Orders.map(item => (
                                  <tr key={item._id}>
                                    <td>{item.uptime}</td>
                                    <td >{item.price} $</td>
                                    <td 
                                    style={ item.payed === false
                                        ? {}
                                        : { display: "none" }
                                    }> <Badge variant="danger">No</Badge></td>
                                                                        <td 
                                    style={ item.payed === false
                                        ? {display: "none"}
                                        : {  }
                                    }> <Badge variant="success">Yes</Badge></td>
                                    <td  
                                     style={item.buy===true
                                     ? { }
                                      : {display: "none" }
                                    }
                                    ><Badge variant="success">Done</Badge></td>
                                    <td  
                                     style={item.buy===true
                                     ? {display: "none"}
                                      : {  }
                                    }
                                    ><Badge variant="warning">Warning</Badge> </td>
                              <td >{item.type}</td>
                                  </tr>
                                      
                                ))}
  
                              </tbody>
                            </table>
  
                          </div>
                        </div>
  
                        <Launcher
        agentProfile={{
          teamName: 'customer support',
          imageUrl: Logo
        }}
        onFilesSelected={(files)=>{
          let msg={  author: 'me',
          type: 'file',
          data: {
            url: 'somefile.mp3',
            fileName: files[0].name
          }}
          this.setState({
            file:files
          })
          this._onMessageWasSent(msg)
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
      />
  
                        {/* <Table  bordered hover responsive>
                                                  <thead>
                                                      <tr>
                                                        
                                                          <th>Order Date</th>
                                                          <th>Price</th>
                                                          <th>More</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                  {this.state.Orders.map(item => (
                                                      <tr key={item._id}>
                                                          <td>{item.uptime}</td>
                                                          <td >{item.money} $</td>
                                                          <td>
  
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
                                              From {item.Data[0].depCityName[0]} To {item.Data[0].arrCityName[0]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>
  
                                              <Col>
                                                <img id="AirilineLogo" src={item.Data[0].airlineLogo[0]} />
                                                <p id="AirilineName">
                                                  {item.Data[0].airlineName[0]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.Data[0].depDateAndTime[0]}</h4>
                                                <p>
                                                {item.Data[0].departingAirportName}
                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>
  
                                                  <span className="stops"></span>
  
                                                  <label className="stopLabel">{item.Data[0].layOverTime[0]}</label></div>
  
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.Data[0].arrDateAndTime[0]}</h4>
                                                <p>
                                                  {item.Data[0].arrAirportName[0]}
                                                </p>
                                              </Col>
  
                                            </Row>
                                          </Card>
  
                                          <hr />
  
                                          <div style={item.Data[0].stops === 1 || item.Data[0].stops === 2 ? {} : { display: "none" }}>
  
                                            <Card id="CardTiket" body>
                                              <Alert id="warningCard" variant="warning">
                                                From {item.Data[0].depCityName[1]} To {item.Data[0].arrCityName[1]}
                                              </Alert>
                                              <Row style={{ marginRight: 0 + "px" }}>
  
                                                <Col>
                                                  <img id="AirilineLogo" src={item.Data[0].airlineLogo[1]} />
                                                  <p id="AirilineName">
                                                    {item.Data[0].airlineName[1]}
                                                  </p>
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].depDateAndTime[1]}</h4>
                                                  <p>
                                                    {item.Data[0].arrAirportName[0]}
  
                                                  </p>
                                                </Col>
                                                <Col  >
                                                  <div className="stop-cn">
                                                    <label className="time">Layover Time</label>
  
                                                    <span className="stops"></span>
  
                                                    <label className="stopLabel">{item.Data[0].layOverTime[1]}</label></div>
  
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].arrDateAndTime[1]}</h4>
                                                  <p>
                                                    {item.Data[0].arrAirportName[1]}
                                                  </p>
                                                </Col>
  
                                              </Row>
                                            </Card>
  
                                          </div>
  
                                          <div style={item.Data[0].stops === 2 ? {} : { display: "none" }}>
  
                                            <Card id="CardTiket" body>
                                              <Alert id="warningCard" variant="warning">
                                                From {item.Data[0].depCityName[2]} To {item.Data[0].arrCityName[2]}
                                              </Alert>
                                              <Row style={{ marginRight: 0 + "px" }}>
  
                                                <Col>
                                                  <img id="AirilineLogo" src={item.Data[0].airlineLogo[2]} />
                                                  <p id="AirilineName">
                                                    {item.Data[0].airlineName[2]}
                                                  </p>
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].depDateAndTime[2]}</h4>
                                                  <p>
                                                    {item.Data[0].arrAirportName[1]}
  
                                                  </p>
                                                </Col>
                                                <Col  >
                                                  <div className="stop-cn">
                                                    <label className="time">Layover Time</label>
  
                                                    <span className="stops"></span>
  
                                                    <label className="stopLabel">{item.Data[0].layOverTime[2]}</label></div>
  
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].arrDateAndTime[2]}</h4>
                                                  <p>
                                                    {item.Data[0].arrAirportName[2]}
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
                                              From {item.Data[0].ReturnDepCityName[0]} To {item.Data[0].ReturnArrCityName[0]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>
  
                                              <Col>
                                                <img id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[0]} />
                                                <p id="AirilineName">
                                                  {item.Data[0].ReturnAirlineName[0]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.Data[0].ReturnAepDateAndTime[0]}</h4>
                                                <p>
  
                                                  {item.Data[0].ReturnDepartingAirportName}
                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>
  
                                                  <span className="stops"></span>
  
                                                  <label className="stopLabel">{item.Data[0].ReturnLayOverTime[0]}</label></div>
  
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{item.Data[0].ReturnArrDateAndTime[0]}</h4>
                                                <p>
                                                  {item.Data[0].ReturnArrAirportName[0]}
                                                </p>
                                              </Col>
  
                                            </Row>
                                          </Card>
  
                                          <hr />
  
                                          <div style={item.Data[0].ReturnStops === 1 || item.Data[0].ReturnStops === 2 ? {} : { display: "none" }}>
  
                                            <Card id="CardTiket" body>
                                              <Alert id="warningCard" variant="warning">
                                                From {item.Data[0].ReturnDepCityName[1]} To {item.Data[0].ReturnArrCityName[1]}
                                              </Alert>
                                              <Row style={{ marginRight: 0 + "px" }}>
  
                                                <Col>
                                                  <img id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[1]} />
                                                  <p id="AirilineName">
                                                    {item.Data[0].ReturnAirlineName[1]}
                                                  </p>
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].ReturnAepDateAndTime[1]}</h4>
                                                  <p>
  
                                                    {item.Data[0].ReturnArrAirportName[0]}
                                                  </p>
                                                </Col>
                                                <Col  >
                                                  <div className="stop-cn">
                                                    <label className="time">Layover Time</label>
  
                                                    <span className="stops"></span>
  
                                                    <label className="stopLabel">{item.Data[0].ReturnLayOverTime[1]}</label></div>
  
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].ReturnArrDateAndTime[1]}</h4>
                                                  <p>
                                                    {item.Data[0].ReturnArrAirportName[1]}
                                                  </p>
                                                </Col>
  
                                              </Row>
                                            </Card>
                                          </div>
                                          <div style={item.Data[0].ReturnStops === 2 ? {} : { display: "none" }}>
  
                                            <Card id="CardTiket" body>
                                              <Alert id="warningCard" variant="warning">
                                                From {item.Data[0].ReturnDepCityName[2]} To {item.Data[0].ReturnArrCityName[2]}
                                              </Alert>
                                              <Row style={{ marginRight: 0 + "px" }}>
  
                                                <Col>
                                                  <img id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[2]} />
                                                  <p id="AirilineName">
                                                    {item.Data[0].ReturnAirlineName[2]}
                                                  </p>
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].ReturnAepDateAndTime[2]}</h4>
                                                  <p>
                                                    {item.Data[0].ReturnArrAirportName[1]}
                                                  </p>
                                                </Col>
                                                <Col  >
                                                  <div className="stop-cn">
                                                    <label className="time">Layover Time</label>
  
                                                    <span className="stops"></span>
  
                                                    <label className="stopLabel">{item.Data[0].ReturnLayOverTime[2]}</label></div>
  
                                                </Col>
                                                <Col >
                                                  <h4 id="TimeH4">{item.Data[0].ReturnArrDateAndTime[2]}</h4>
                                                  <p>
                                                    {item.Data[0].ReturnArrAirportName[2]}
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
                                                          </td>
                                                      </tr>
                                                  ))}
                                                  </tbody>
                                                  <thead>
                                                  </thead>
                                              </Table>
                                          */}
  
                      </Col>
                    </Row>
                  </Container>
                </div>
  
              </div>
  
            )
          } else {
            return(
              <Home/>
            )
          }

        }}
      </Context.Consumer>
    );
  }
}

export default Profile;