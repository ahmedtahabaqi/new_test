import React from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";
import Logo from "../assets/img/LOGO .svg";
import {  Col, Row, Form, Card, Alert } from 'react-bootstrap';
import { Pane, Dialog, Icon ,Button} from 'evergreen-ui'
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import Home from "./home";
import axios from "axios";

const host=`http://localhost:5000/`;
const cookies = new Cookies();

class TicketPDF extends React.Component {
  constructor() {
    super();
    this.state = {
        Email: '',
        Country: '',
        Name: '',
        Password:'',
        PhoneNumber: '',
      Orders: [],
      OrdersOneWay: [],
    

    };
  }


  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    axios({
      url: host + `api/orders/client/twoWay`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          console.log(response.data[0])
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


    axios({
      url: host + `api/orders/GustOrder/oneWay`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          console.log(response.data[0])
          this.setState({
            OrdersOneWay: response.data,
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

  onChangeName(value){
    this.setState({
      Name:value
    })
 
  }
  onChangeEmail(value){
    this.setState({
      Email:value
    })

  }

  onChangePassword(value){
    this.setState({
      Password:value
    })

  }
  onChangePhoneNumber(value){
    this.setState({
      PhoneNumber:value
    })

  }
  onChangeCountry(value){
    this.setState({
      Country:value
    })

  }

  render() {
    return (
<div>
      <Context.Consumer>
        {ctx => {
          if (ctx.value.sesson.role === 1) {
            return (
              <div id="wrapper">
  
      
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
              <Row>
                 
                  <img src={Logo}   width='200px' alt='img'/>
               
                  </Row>
                  <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                  <div className="sidebar-brand-icon ">
  
                  
                  </div>
                  <div className="sidebar-brand-text mx-2">Favorite<sup>holiday</sup></div>
                </NavLink>
          
                <hr className="sidebar-divider my-0"/>
       
       <li className="nav-item active">
       <NavLink className="nav-link" to="/dashboard">
      
           <i className="fa fa-plane"></i>
           <span>Clients Orders</span></NavLink>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <span  id="AdminSideBarLinkA" className="nav-link" >
           <i className="fa fa-plane"></i>
           <span>Guests Orders</span></span>
       </li>
  
       <hr className="sidebar-divider d-none d-md-block"/>
                  <Component initialState={{ isShown: false }}>
              {({ state, setState }) => (
              <Pane>
              <Dialog
              isShown={state.isShown}
              title="Add New Client"
              onConfirm={()=>{
  
              ctx.actions.AddNewClient(this.state.Name,this.state.Password,this.state.PhoneNumber,this.state.Country,this.state.Email)
  
              setState({ isShown: false })
  
  
              }}
              onCloseComplete={() => setState({ isShown: false })}
              confirmLabel="Add"
              >
              <div>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={this.state.Name} placeholder="Enter Name" onChange={(e)=>{
              this.onChangeName(e.target.value)
              }}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={this.state.Email} placeholder="name@example.com" onChange={(e)=>{
              this.onChangeEmail(e.target.value)
              }}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={this.state.Password} placeholder="Password"  onChange={(e)=>{
              this.onChangePassword(e.target.value)
              }}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" value={this.state.PhoneNumber} placeholder="Enter Phone Number" onChange={(e)=>{
              this.onChangePhoneNumber(e.target.value)
              }}/>
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" value={this.state.Country} placeholder="Enter Country" onChange={(e)=>{
              this.onChangeCountry(e.target.value)
              }}/>
              </Form.Group>
  
              </div>
              </Dialog>
              <li className="nav-item active" onClick={() => setState({ isShown: true })}>
                  <span className="nav-link">
                      <i className="fa fa-user-plus"></i>
                      <span>Add New Client</span></span>
                  </li>
  
              </Pane>
              )}
              </Component>
              
          
              <hr className="sidebar-divider d-none d-md-block"/>
               
               <li className="nav-item active">
               <NavLink className="nav-link" to="/clients">
               
                   <i className="fa fa-users"></i>
                   <span>Clients</span></NavLink>
               </li>
               <hr className="sidebar-divider d-none d-md-block"/>  
               <li className="nav-item active" 
               style={{cursor: 'pointer'}}
               onClick={()=>{
                cookies.remove("token");
                window.location.href = "/";

               }}>
               <span className="nav-link" >
               <i className="fas fa-sign-out-alt"></i>
                   {/* <i className="fa fa-users"></i> */}
                   <span>Logout</span></span>
               </li>
              </ul>
  
  
              <div id="content-wrapper" className="d-flex flex-column">
          
                <div id="content">
          
            
     <br></br>
     <br></br>
     <br></br>
  



                  <div className="container-fluid">
  
                  <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title="Dialog title"
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Custom Label"
      >
        Dialog content
      </Dialog>

      <Button onClick={() => setState({ isShown: true })}>Add Ticket</Button>
    </Pane>
  )}
</Component>
<br></br>

                
                    <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">One Way Orders</h6>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Passport Copy</th>
                                  <th scope="col">Ticket Details</th>
                                  <th scope="col">Done?</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
  
                                {ctx.value.GustOrderOneWay.map((item,i) => (
                                  <tr key={i}>
                                    <td >{item.uptime}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Email}</td>
                                    <td >{item.Data[0].price} $</td>
                                    <td >  <Icon icon="download" style={{cursor: 'pointer'}} color="success" marginLeft={30} size={30} onClick={()=>{
                                        window.open(host + item.passport, "_blank");
                                    }}/></td>
  
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
                                              <Alert id="warningCard" variant="warning">
                                                From {item.Data[0].depCityName[0]} To {item.Data[0].arrCityName[0]}
                                              </Alert>
                                              <Card id="CardTiket" body>
  
                                                <Row style={{ marginRight: 0 + "px" }}>
  
                                                  <Col>
                                                    <img id="AirilineLogo" src={item.Data[0].airlineLogo[0]} alt='img'/>
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
                                                      <label classNameName="time">Layover Time</label>
  
                                                      <span className="stops"></span>
  
                                                      <label classNameName="stopLabel">{item.Data[0].layOverTime[0]}</label></div>
  
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
                                                <Alert id="warningCard" variant="warning">
                                                  From {item.Data[0].depCityName[1]} To {item.Data[0].arrCityName[1]}
                                                </Alert>
                                                <Card id="CardTiket" body>
  
                                                  <Row style={{ marginRight: 0 + "px" }}>
  
                                                    <Col>
                                                      <img id="AirilineLogo" src={item.Data[0].airlineLogo[1]} alt='img'/>
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
                                                        <label classNameName="time">Layover Time</label>
  
                                                        <span className="stops"></span>
  
                                                        <label classNameName="stopLabel">{item.Data[0].layOverTime[1]}</label></div>
  
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
                                                <Alert id="warningCard" variant="warning">
                                                  From {item.Data[0].depCityName[2]} To {item.Data[0].arrCityName[2]}
                                                </Alert>
                                                <Card id="CardTiket" body>
  
                                                  <Row style={{ marginRight: 0 + "px" }}>
  
                                                    <Col>
                                                      <img id="AirilineLogo" src={item.Data[0].airlineLogo[2]} alt='img'/>
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
                                                        <label classNameName="time">Layover Time</label>
  
                                                        <span className="stops"></span>
  
                                                        <label classNameName="stopLabel">{item.Data[0].layOverTime[2]}</label></div>
  
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
  
  
                                            </Dialog>
                                            <span className="btn btn-info btn-circle" onClick={() => setState({ isShown: true })}>
                                              <i className="fas fa-info-circle"></i>
                                            </span>
                                          </Pane>
                                        )}
                                      </Component>
  
                                    </td>
                                    <td> <Icon icon="tick-circle" style={{cursor: 'pointer'}} color="success" marginLeft={10} size={30} 
                                    onClick={()=>{
                                      ctx.actions.gDone(item)
                                    }}
                                    /></td>     
                                  </tr>
                                ))}
  
                              </tbody>
                            </table>
  
                          </div>
                        </div>
  
                 
                 
                 
                 
  
  
                 </div>
      
                </div>
  
          
              </div>
   
          
            </div>
  
            )
          }else{
return(
  <Home/>
)
          }

        }}
      </Context.Consumer>
      </div>
    );
  }
}

export default TicketPDF;