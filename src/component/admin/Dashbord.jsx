import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";
import Logo from "../../assets/img/LOGO .svg";
import { Col, Row, Form, Card, Alert, Badge,ListGroup} from 'react-bootstrap';
import { Pane, Dialog,  toaster, Icon ,Button} from 'evergreen-ui'
import Component from "@reactions/component";
import Departure from "../../assets/img/Departure.png";
import Home from "../../component/home";
import Arrival from "../../assets/img/arrival.png";
import Cookies from "universal-cookie";
import axios from "axios";
import jsPDF from 'jspdf';
import Base64img from '../../component/Base64img'

import host from "../../assets/js/host";
const cookies = new Cookies();

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Country: '',
      Name: '',
      Password:'',
      PhoneNumber: '',
      Orders: [],
      HotelImg:[],
      OrdersOneWay: [],
      ToursImg:[],
      ToursPDF:[],
    

    };
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

  PrintPDF(){
    var doc = new jsPDF();
    var imgData = Base64img;
    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

    var PNR = document.getElementById('PNR').value;
    var DATEOFBOOKING = document.getElementById('DATEOFBOOKING').value;
    var DATEOFISSUE = document.getElementById('DATEOFISSUE').value;
    var Passenger = document.getElementById('Passenger').value;
    var AIRLINECODELEGEND = document.getElementById('AIRLINECODELEGEND').value;

    var FLIGHTNumber = document.getElementById('FLIGHTNumber').value;

    var ORIGIN = document.getElementById('ORIGIN').value;
    var DESTINATIONCITY = document.getElementById('DESTINATIONCITY').value;
    

    var DEPARTURE = document.getElementById('DEPARTURE').value;

    var ARRIVAL = document.getElementById('ARRIVAL').value;

    var CHECKIN = document.getElementById('CHECK-IN').value;


    var CLASS = document.getElementById('CHECK-CLASS').value;

    var Duration = document.getElementById('CHECK-Duration').value;


    var Aircraft = document.getElementById('CHECK-Aircraft').value;


    var Transit = document.getElementById('CHECK-Transit').value;


    var Remarks = document.getElementById('CHECK-Remarks').value;


    var weight = document.getElementById('CHECK-weight').value;



    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(3.0);
    doc.text(5, 50, "AIRLINE CODE LEGEND: "+AIRLINECODELEGEND);

    doc.text(135, 50, "RESERVATION NUMBER (PNR): "+PNR);

    doc.text(5, 60, "DATE OF BOOKING: "+DATEOFBOOKING);
    doc.text(135, 60, "DATE OF ISSUE: "+DATEOFISSUE);
    doc.text(70, 70, "Passenger Name: "+Passenger);
    doc.text(80, 80, "TRAVEL SEGMENTS");

    doc.text(5, 90, "FLIGHT");
    doc.text(5, 100, FLIGHTNumber);
    
 
    doc.text(25, 90, "ORIGIN / DESTINATION");
    doc.text(25, 100, ORIGIN);
    doc.text(25, 110, DESTINATIONCITY);
    

    doc.text(75, 90, "DEPARTURE / ARRIVAL");
    doc.text(75, 100, DEPARTURE);
    doc.text(75, 110, ARRIVAL);

    doc.text(125, 90, "CHECK-IN FROM");

    doc.text(125, 100, CHECKIN);


    doc.text(160, 90, "CLASS OF SERVICE");
   doc.text(160, 100, CLASS);
    
   doc.text(10, 120, "Duration: "+Duration);
   doc.text(40, 120, "Aircraft: "+Aircraft);
   doc.text(90, 120, "Transit: "+Transit);
   doc.text(155, 120, "Remarks: "+Remarks);

   doc.text(65, 130, "Weight: "+weight);
   doc.text(150, 130, "STATUS: OK");

    doc.save(Passenger + '.pdf');
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





AddTours(){
  var  ToursName = document.getElementById('ToursName').value;
  var ToursDestination= document.getElementById('ToursDestination').value;
  var Toursprice= document.getElementById('Toursprice').value;
  var  ToursCountry= document.getElementById('ToursCountry').value;
  var ToursChildprice= document.getElementById('ToursChildprice').value;
  var Food= document.getElementById('Food').checked;
  var Transportation= document.getElementById('Transportation').checked;
  let formData = new FormData();
  var headers = {
   "Content-Type": "application/json",
   token: cookies.get("token")
 };
 
  formData.append("name", ToursName);
  formData.append("body", ToursDestination);
  formData.append("Country", ToursCountry);

  formData.append("priceCh", ToursChildprice);
  
  formData.append("price", Toursprice);

  formData.append("Food", Food);
  formData.append("Transportation", Transportation);

  formData.append("file", this.state.ToursPDF);
  formData.append("img", this.state.ToursImg);


 
  axios({
    url: host + `api/Tours/add`,
    method: "POST",
    data: formData,
    headers: headers
  })
    .then(response => {
 
      if (response.status === 200) {
        toaster.success(`Successful `);
      
      }
    })
    .catch(function (error) {
      console.log(error)
      if (error.request.response) {
        toaster.danger(error.request.response);
      }
    });
 
 

}


  
  addVisa(){
    var visaTitle=document.getElementById('visaTitle').value;
    var visaCountry=document.getElementById('visaCountry').value;
    var visaDescription=document.getElementById('visaDescription').value;
    var visaAPPROVED=document.getElementById('visaAPPROVED').value;
    var visaPrice=document.getElementById('visaPrice').value;
    var visaNationality=document.getElementById('visaNationality').value;
    var specialoffers=document.getElementById('specialoffers').checked

    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    
    formData.append("name", visaTitle);
    formData.append("price", visaPrice);
    formData.append("country", visaCountry);
    formData.append("Description", visaDescription);
    formData.append("APPROVED", visaAPPROVED);
    formData.append("offers", specialoffers);
    formData.append("Nationality", visaNationality);

    axios({
      url: host + `api/visa/add`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
   
        if (response.status === 200) {
          toaster.success('Add Success');
        }
      })
      .catch(function (error) {
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });
  
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
                  <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                  <div className="sidebar-brand-icon ">
  
                  
                  </div>
                  <div className="sidebar-brand-text mx-2">Favorite<sup>holiday</sup></div>
                </Link>
          
                <hr className="sidebar-divider my-0"/>
       
       <li className="nav-item active">
       <span className="nav-link" id="AdminSideBarLinkA" >
      
           <i className="fa fa-plane"></i>
           <span>Clients Orders</span></span>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/HotelsOrders">
          
           <i className="fas fa-hotel"></i>
           <span>Hotels Orders</span></Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/TourOrders">
       <i className="fas fa-bus-alt"></i>
           
           <span>Tours Orders</span></Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/ToursCompletedOrders">
       <i className="fas fa-bus-alt"></i>
           
           <span>Tours Completed Orders</span></Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/GroupsOrders">
       <i className="fas fa-suitcase-rolling"></i>
           
           <span>Groups Orders</span></Link>
       </li>


       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/VisaOrders">
       <i className="fas fa-map-marked-alt"></i>
           <span>Visa Orders</span>
           </Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/VisaCompleteOrder">
       <i className="fas fa-map-marked-alt"></i>
           <span>Visa Completed Orders</span>
           </Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/allHotels">
       <i className="fas fa-hotel"></i>
           <span>Hotels List</span>
           </Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/allTours">
       <i className="fas fa-bus-alt"></i>
           
           <span>Tours List</span></Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/allGroups">
       <i className="fas fa-suitcase-rolling"></i>
           <span>Groups List</span>
           </Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/allVisa">
       <i className="fas fa-map-marked-alt"></i>
           <span>Visa List</span>
           </Link>
       </li>
       <hr className="sidebar-divider d-none d-md-block"/>
       <li className="nav-item active">
       <Link className="nav-link" to="/completedOrders">
       <i className="fas fa-clipboard-check"></i>
       <span>Completed Orders</span>
           </Link>
       </li>
              <hr className="sidebar-divider d-none d-md-block"/>
               

               
               <li className="nav-item active">
               <Link className="nav-link" to="/Clients">
           
                   <i className="fa fa-users"></i>
                   <span>Clients</span></Link>
               </li>
               <hr className="sidebar-divider d-none d-md-block"/>  
               <li className="nav-item active" 
               style={{cursor: 'pointer'}}
               onClick={()=>{
                cookies.remove("token");
                window.location.href = "/";

               }}>
               <span className="nav-link"  >
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
  
                    <div className="row">
          
  
                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-danger shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Total DEBTS</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">${ctx.value.TotalDEBTS}</div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Number of Payed Ticket</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{ctx.value.Totalpayed}</div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-hand-holding-usd fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
            
                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">NUMBER OF UN-PAYED TICKET</div>
                                <div className="row no-gutters align-items-center">
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{ctx.value.Totalnotpayed}</div>
                                  <div className="col">
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-cash-register fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
           
                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Guests orders</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{ctx.value.numberofGuestsOrders}</div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
          
                
<div className="row">

<div className="col">



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

                  <Button height={40} appearance="primary" iconAfter="new-person" onClick={() => setState({ isShown: true })}>
         Add New Client
        </Button>
              </Pane>
              )}
              </Component>
              
          





</div>

<div className="col">
<Link to="/AddHotel">
<Button  height={40} appearance="primary" iconAfter="office">
        Add New Hotel
        </Button>       
        </Link>   

</div>

<div className="col">

<Link to="addTours">
<Button  height={40} appearance="primary" iconAfter="globe" >
          Add New Torus
        </Button>
        </Link>





</div>
<div className="col">

<Link to="/addGroup">
<Button  height={40} appearance="primary" iconAfter="globe" >
          Add New Group
        </Button>
        </Link>





</div>
<div className="col">
<Button  height={40} appearance="primary" iconAfter="drive-time">
        Add New Car
        </Button>
</div>
<div className="col">



<Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title=" Add Country For Visa"
        onConfirm={this.addVisa.bind(this)}
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Add"
      >
       <div>
       <Form.Group >
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" id="visaTitle" placeholder="Title" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Country</Form.Label>
    <Form.Control type="text"  id="visaCountry" placeholder="Country" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Nationality</Form.Label>
    <Form.Control type="text"  id="visaNationality" placeholder="Country" />
  </Form.Group>
  <Form.Group>
    <Form.Label>Description</Form.Label>
    <Form.Control type="text" id="visaDescription" placeholder="Exp: Rejection : Nonrefundable" />
  </Form.Group>
  <Form.Group >
    <Form.Label>APPROVED</Form.Label>
    <Form.Control type="text" id="visaAPPROVED" placeholder="Exp: 10-14 DAYS" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Price</Form.Label>
    <Form.Control type="number" id="visaPrice" placeholder="Price" />
  </Form.Group>

<Form.Check 
        custom
        type={'checkbox'}
        id={`specialoffers`}
        label={`On Special Offers?`}
      />
       </div>
      </Dialog>

      <Button onClick={() => setState({ isShown: true })} height={40} appearance="primary" iconAfter="send-to-map">
          Add New Visa
        </Button>

      {/* <Button onClick={() => setState({ isShown: true })}>Show Dialog</Button> */}
    </Pane>
  )}
</Component>







</div>

<div className="col">

<Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title="PDF Ticket"
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Save AS PDF"
        onConfirm={()=>{
          this.PrintPDF()
        }}
      >
       <Form.Group>
    <Form.Label>Reservation Number (PNR)</Form.Label>
    <Form.Control type="text" id="PNR" placeholder="Enter Reservation Number (PNR)" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Date Of Booking</Form.Label>
    <Form.Control type="date" id="DATEOFBOOKING" placeholder="Enter Date Of Booking" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Date Of Issus</Form.Label>
    <Form.Control type="date" id="DATEOFISSUE" placeholder="Enter Date Of Issus" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Airline Code</Form.Label>
    <Form.Control type="text" id="AIRLINECODELEGEND" placeholder="Enter Airline Code" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Passenger Name</Form.Label>
    <Form.Control type="text" id="Passenger" placeholder="Enter Passenger Name" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Flight Number</Form.Label>
    <Form.Control type="text" id="FLIGHTNumber"  placeholder="Enter Flight Number" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Origin City</Form.Label>
    <Form.Control type="text" id="ORIGIN" placeholder="Enter Origin City" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Destination City</Form.Label>
    <Form.Control type="text" id="DESTINATIONCITY" placeholder="Enter Destination City" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Departure Date</Form.Label>
    <Form.Control type="text" id="DEPARTURE"  placeholder="Enter Departure Date " />
  </Form.Group>

  <Form.Group>
    <Form.Label> Arrival Date</Form.Label>
    <Form.Control type="text" id="ARRIVAL"  placeholder="Enter Arrival Date" />
  </Form.Group>


  <Form.Group >
    <Form.Label>CHECK-IN FROM</Form.Label>
    <Form.Control type="text" id="CHECK-IN" placeholder="Enter Check-IN From" />
  </Form.Group>


  <Form.Group >
    <Form.Label>CLASS OF SERVICE</Form.Label>
    <Form.Control type="text" id="CHECK-CLASS" placeholder="Enter the Class" />
  </Form.Group>


  <Form.Group >
    <Form.Label>Duration Time</Form.Label>
    <Form.Control type="text" id="CHECK-Duration" placeholder="Enter Duration Time" />
  </Form.Group>
  <Form.Group >
    <Form.Label> Aircraft</Form.Label>
    <Form.Control type="text"  id="CHECK-Aircraft" placeholder="Enter Aircraft model" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Transit</Form.Label>
    <Form.Control type="text"  id="CHECK-Transit" placeholder="Enter Transit" />
  </Form.Group>


  <Form.Group >
    <Form.Label>Remarks</Form.Label>
    <Form.Control type="text" id="CHECK-Remarks" placeholder="Enter Remarks" />
  </Form.Group>


  <Form.Group >
    <Form.Label>Weight</Form.Label>
    <Form.Control type="text" id="CHECK-weight" placeholder="Enter weight" />
  </Form.Group>
  
  
   

      </Dialog>

    
<Button height={40} appearance="primary" iconAfter="print" onClick={() => setState({ isShown: true })}>
Print Ticket
        </Button>
    </Pane>
  )}
</Component>


</div>
<div className="col">
<Link to="/chat">
<Button  height={40} appearance="primary" iconAfter="chat">
        Live Chat
        </Button>       
        </Link>   

</div>
</div>
<br></br>
<br></br>

                    <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">One Way Orders</h6>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th>#</th>
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Payed</th>
                                  <th scope="col">Debts</th>
                                  <th scope="col">Information</th>
                                  <th scope="col">Ticket Details</th>
                                  <th scope="col">Done?</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
  
                                {ctx.value.OrdersOneWay.map((item,i) => (
                                  <tr key={i}>
                                  <td>{i+1}</td>
                                    <td >{item.uptime}</td>
                                    <td>{item.user}</td>
                                    <td>{item.email}</td>
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
                                    <td > <Badge variant="danger">{item.money} $</Badge></td>
                                      <td>
                                      <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                          <Pane>
                                            <Dialog
                                              isShown={state.isShown}
                                              title="personal information"
                                              hasFooter={false}
                                              onCloseComplete={() => setState({ isShown: false })}
                                              confirmLabel="Custom Label"
                                            >
                                            <div>
                                            <div>
                                            {item.AdultsData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="primary"> Adult {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="primary"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                         
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br/>

                                             <div>
                                            {item.ChildData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="success"> Child {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="success"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                        
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br/>
                                             <div>
                                            {item.InfantData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="info"> Infant {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="info"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                          
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br></br>
                                              <div>
                                            {item.Files.map((Adult,i) => (    
                                              
                                              <Button key={i} height={30} marginBottom={5} marginRight={10} appearance="primary" iconAfter="download"
                                              onClick={()=>{
                                               window.open(host + Adult, "_blank");

                                              }}
                                              >
                                                  Passport Scan {i+1}
                                                </Button>
                                            ))}                                      
                                              </div>

                                             </div>
                                            </Dialog>
                                            <Icon marginLeft={25} style={{    cursor: 'pointer'}} onClick={() => setState({ isShown: true })} icon="info-sign" color="info" size={30} />
                                            {/* <Button >Show Dialog</Button> */}
                                          </Pane>
                                        )}
                                      </Component>
                                      </td>
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
                                                From {item.Data[0].Data.depCityName[0]} To {item.Data[0].Data.arrCityName[0]}
                                              </Alert>
                                              <Card id="CardTiket" body>
  
                                                <Row style={{ marginRight: 0 + "px" }}>
  
                                                  <Col>
                                                    <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[0]} alt='img'/>
                                                    <p id="AirilineName">
                                                      {item.Data[0].Data.airlineName[0]}
                                                    </p>
                                                  </Col>
                                                  <Col >
                                                    <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[0]}</h4>
                                                    <p>
                                                      {item.Data[0].Data.departingAirportName}
  
                                                    </p>
                                                  </Col>
                                                  <Col  >
                                                    <div className="stop-cn">
                                                      <label classNameName="time">Layover Time</label>
  
                                                      <span className="stops"></span>
  
                                                      <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[0]}</label></div>
  
                                                  </Col>
                                                  <Col >
                                                    <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[0]}</h4>
                                                    <p>
                                                      {item.Data[0].Data.arrAirportName[0]}
                                                    </p>
                                                  </Col>
  
                                                </Row>
                                              </Card>
                                              <hr />
                                              <div style={item.Data[0].Data.stops === 1 || item.Data[0].Data.stops === 2 ? {} : { display: "none" }}>
                                                <Alert id="warningCard" variant="warning">
                                                  From {item.Data[0].Data.depCityName[1]} To {item.Data[0].Data.arrCityName[1]}
                                                </Alert>
                                                <Card id="CardTiket" body>
  
                                                  <Row style={{ marginRight: 0 + "px" }}>
  
                                                    <Col>
                                                      <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[1]} alt='img' />
                                                      <p id="AirilineName">
                                                        {item.Data[0].Data.airlineName[1]}
                                                      </p>
                                                    </Col>
                                                    <Col >
                                                      <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[1]}</h4>
                                                      <p>
                                                        {item.Data[0].Data.arrAirportName[0]}
  
                                                      </p>
                                                    </Col>
                                                    <Col  >
                                                      <div className="stop-cn">
                                                        <label classNameName="time">Layover Time</label>
  
                                                        <span className="stops"></span>
  
                                                        <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[1]}</label></div>
  
                                                    </Col>
                                                    <Col >
                                                      <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[1]}</h4>
                                                      <p>
                                                        {item.Data[0].Data.arrAirportName[1]}
                                                      </p>
                                                    </Col>
  
                                                  </Row>
                                                </Card>
  
                                              </div>
  
                                              <div style={item.Data[0].Data.stops === 2 ? {} : { display: "none" }}>
                                                <Alert id="warningCard" variant="warning">
                                                  From {item.Data[0].Data.depCityName[2]} To {item.Data[0].Data.arrCityName[2]}
                                                </Alert>
                                                <Card id="CardTiket" body>
  
                                                  <Row style={{ marginRight: 0 + "px" }}>
  
                                                    <Col>
                                                      <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[2]} alt='img'/>
                                                      <p id="AirilineName">
                                                        {item.Data[0].Data.airlineName[2]}
                                                      </p>
                                                    </Col>
                                                    <Col >
                                                      <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[2]}</h4>
                                                      <p>
                                                        {item.Data[0].Data.arrAirportName[1]}
  
                                                      </p>
                                                    </Col>
                                                    <Col  >
                                                      <div className="stop-cn">
                                                        <label classNameName="time">Layover Time</label>
  
                                                        <span className="stops"></span>
  
                                                        <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[2]}</label></div>
  
                                                    </Col>
                                                    <Col >
                                                      <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[2]}</h4>
                                                      <p>
                                                        {item.Data[0].Data.arrAirportName[2]}
                                                      </p>
                                                    </Col>
  
                                                  </Row>
                                                </Card>
  
  
                                              </div>
  
                                              <hr id="HrDivider" />
  
  
                                            </Dialog>
                                            <span className="btn btn-info btn-circle" onClick={() => setState({ isShown: true })}>
                                            <i className="fas fa-plane"></i>
                                            </span>
                                          </Pane>
                                        )}
                                      </Component>
 
                                    </td>
                                    <td> <Icon style={{cursor: 'pointer'}} icon="tick-circle" color="success" size={30} onClick={()=>{
                                     ctx.actions.Done(item)
                                    
                                    }}/></td>     
                                  </tr>
                                ))}
  
                              </tbody>
                            </table>
  
                          </div>
                        </div>
  
                 
                 
                 
                 
                 
  
                 <div className="card shadow mb-4">
                 <div className="card-header py-3">
                   <h6 className="m-0 font-weight-bold text-primary">Round Trip Orders</h6>
                 </div>
                 <div className="card-body">
                   <table className="table">
                     <thead className="thead-dark">
                       <tr>
                         <th>#</th>
                       <th scope="col">Order Date</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Payed</th>
                                  <th scope="col">Debts</th>
                                  <th scope="col">Information</th>
                                  <th scope="col">Ticket Details</th>
                                  <th scope="col">Done?</th>
                       </tr>
                     </thead>
                     <tbody>
  
                       {ctx.value.Orders.map((item,i)=> (
                         <tr key={i}>
                           <td>{i+1}</td>
                          <td >{item.uptime}</td>
                                    <td>{item.user}</td>
                                    <td>{item.email}</td>
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
                                    <td > <Badge variant="danger">{item.money} $</Badge></td>

                                    <td>
                                      <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                          <Pane>
                                            <Dialog
                                              isShown={state.isShown}
                                              title="personal information"
                                              hasFooter={false}
                                              onCloseComplete={() => setState({ isShown: false })}
                                              confirmLabel="Custom Label"
                                            >
                                            <div>
                                            <div>
                                            {item.AdultsData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="primary"> Adult {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="primary"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="primary"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                           
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br/>

                                             <div>
                                            {item.ChildData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="success"> Child {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="success"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="success"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                        
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br/>
                                             <div>
                                            {item.InfantData.map((Adult,i) => (    
                                             <div key={i} >
                                               <h5> <Badge variant="info"> Infant {i+1}</Badge></h5>
                                             <ListGroup>
                                            <ListGroup.Item  variant="info"><b>First Name: </b> {Adult.FirstName}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Last Name: </b> {Adult.LastName}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport No: </b> {Adult.PassportNo}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport Expiry Date: </b>{Adult.PassportExpiryDate}</ListGroup.Item>
                                            <ListGroup.Item variant="info"><b>Passport Issue Date: </b>{Adult.PassportIssueDate} </ListGroup.Item>
                                            
                                          </ListGroup>
                                             </div>
                                            ))}
                                             </div>
                                             <br></br>
                                              <div>
                                            {item.Files.map((Adult,i) => (    
                                              
                                              <Button key={i} height={30} marginBottom={5} marginRight={10} appearance="primary" iconAfter="download"
                                              onClick={()=>{
                                               window.open(host + Adult, "_blank");

                                              }}
                                              >
                                                  Passport Scan {i+1}
                                                </Button>
                                            ))}                                      
                                              </div>

                                             </div>
                                            </Dialog>
                                            <Icon marginLeft={25} onClick={() =>  setState({ isShown: true })} style={{    cursor: 'pointer'}} icon="info-sign" color="info" size={30} />
                                            {/* <Button >Show Dialog</Button> */}
                                          </Pane>
                                        )}
                                      </Component>
                                      </td>
                        
                        
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
                       <img id="Departure" src={Departure} alt='img'/>
                                     </Alert>
                                     <Card id="CardTiket" body>
                                       <Alert id="warningCard" variant="warning">
                                         From {item.Data[0].Data.depCityName[0]} To {item.Data[0].Data.arrCityName[0]}
                                       </Alert>
                                       <Row style={{ marginRight: 0 + "px" }}>
  
                                         <Col>
                                           <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[0]} alt='img'/>
                                           <p id="AirilineName">
                                             {item.Data[0].Data.airlineName[0]}
                                           </p>
                                         </Col>
                                         <Col >
                                           <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[0]}</h4>
                                           <p>
                                             {item.Data[0].Data.departingAirportName}
                                           </p>
                                         </Col>
                                         <Col  >
                                           <div className="stop-cn">
                                             <label classNameName="time">Layover Time</label>
  
                                             <span className="stops"></span>
  
                                             <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[0]}</label></div>
  
                                         </Col>
                                         <Col >
                                           <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[0]}</h4>
                                           <p>
                                             {item.Data[0].Data.arrAirportName[0]}
                                           </p>
                                         </Col>
  
                                       </Row>
                                     </Card>
  
                                     <hr />
  
                                     <div style={item.Data[0].Data.stops === 1 || item.Data[0].Data.stops === 2 ? {} : { display: "none" }}>
  
                                       <Card id="CardTiket" body>
                                         <Alert id="warningCard" variant="warning">
                                           From {item.Data[0].Data.depCityName[1]} To {item.Data[0].Data.arrCityName[1]}
                                         </Alert>
                                         <Row style={{ marginRight: 0 + "px" }}>
  
                                           <Col>
                                             <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[1]} alt='img'/>
                                             <p id="AirilineName">
                                               {item.Data[0].Data.airlineName[1]}
                                             </p>
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[1]}</h4>
                                             <p>
                                               {item.Data[0].Data.arrAirportName[0]}
  
                                             </p>
                                           </Col>
                                           <Col  >
                                             <div className="stop-cn">
                                               <label classNameName="time">Layover Time</label>
  
                                               <span className="stops"></span>
  
                                               <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[1]}</label></div>
  
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[1]}</h4>
                                             <p>
                                               {item.Data[0].Data.arrAirportName[1]}
                                             </p>
                                           </Col>
  
                                         </Row>
                                       </Card>
  
                                     </div>
  
                                     <div style={item.Data[0].Data.stops === 2 ? {} : { display: "none" }}>
  
                                       <Card id="CardTiket" body>
                                         <Alert id="warningCard" variant="warning">
                                           From {item.Data[0].Data.depCityName[2]} To {item.Data[0].Data.arrCityName[2]}
                                         </Alert>
                                         <Row style={{ marginRight: 0 + "px" }}>
  
                                           <Col>
                                             <img id="AirilineLogo" src={item.Data[0].Data.airlineLogo[2]} alt='img'/>
                                             <p id="AirilineName">
                                               {item.Data[0].Data.airlineName[2]}
                                             </p>
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.depDateAndTime[2]}</h4>
                                             <p>
                                               {item.Data[0].Data.arrAirportName[1]}
  
                                             </p>
                                           </Col>
                                           <Col  >
                                             <div className="stop-cn">
                                               <label classNameName="time">Layover Time</label>
  
                                               <span className="stops"></span>
  
                                               <label classNameName="stopLabel">{item.Data[0].Data.layOverTime[2]}</label></div>
  
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.arrDateAndTime[2]}</h4>
                                             <p>
                                               {item.Data[0].Data.arrAirportName[2]}
                                             </p>
                                           </Col>
  
                                         </Row>
                                       </Card>
  
                                     </div>
  
                                     <hr id="HrDivider" />
  
                                     <Alert variant="success" id="alert-success">
                                       Return
                       <img id="Departure" src={Arrival} alt='img'/>
                                     </Alert>
                                     <Card id="CardTiket" body>
                                       <Alert id="warningCard" variant="warning">
                                         From {item.Data[0].Data.ReturnDepCityName[0]} To {item.Data[0].Data.ReturnArrCityName[0]}
                                       </Alert>
                                       <Row style={{ marginRight: 0 + "px" }}>
  
                                         <Col>
                                           <img id="AirilineLogo" src={item.Data[0].Data.ReturnairlineLogo[0]} alt='img'/>
                                           <p id="AirilineName">
                                             {item.Data[0].Data.ReturnAirlineName[0]}
                                           </p>
                                         </Col>
                                         <Col >
                                           <h4 id="TimeH4">{item.Data[0].Data.ReturnAepDateAndTime[0]}</h4>
                                           <p>
  
                                             {item.Data[0].Data.ReturnDepartingAirportName}
                                           </p>
                                         </Col>
                                         <Col  >
                                           <div className="stop-cn">
                                             <label classNameName="time">Layover Time</label>
  
                                             <span className="stops"></span>
  
                                             <label classNameName="stopLabel">{item.Data[0].Data.ReturnLayOverTime[0]}</label></div>
  
                                         </Col>
                                         <Col >
                                           <h4 id="TimeH4">{item.Data[0].Data.ReturnArrDateAndTime[0]}</h4>
                                           <p>
                                             {item.Data[0].Data.ReturnArrAirportName[0]}
                                           </p>
                                         </Col>
  
                                       </Row>
                                     </Card>
  
                                     <hr />
  
                                     <div style={item.Data[0].Data.ReturnStops === 1 || item.Data[0].Data.ReturnStops === 2 ? {} : { display: "none" }}>
  
                                       <Card id="CardTiket" body>
                                         <Alert id="warningCard" variant="warning">
                                           From {item.Data[0].Data.ReturnDepCityName[1]} To {item.Data[0].Data.ReturnArrCityName[1]}
                                         </Alert>
                                         <Row style={{ marginRight: 0 + "px" }}>
  
                                           <Col>
                                             <img id="AirilineLogo" src={item.Data[0].Data.ReturnairlineLogo[1]} alt='img'/>
                                             <p id="AirilineName">
                                               {item.Data[0].Data.ReturnAirlineName[1]}
                                             </p>
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.ReturnAepDateAndTime[1]}</h4>
                                             <p>
  
                                               {item.Data[0].Data.ReturnArrAirportName[0]}
                                             </p>
                                           </Col>
                                           <Col  >
                                             <div className="stop-cn">
                                               <label classNameName="time">Layover Time</label>
  
                                               <span className="stops"></span>
  
                                               <label classNameName="stopLabel">{item.Data[0].Data.ReturnLayOverTime[1]}</label></div>
  
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.ReturnArrDateAndTime[1]}</h4>
                                             <p>
                                               {item.Data[0].Data.ReturnArrAirportName[1]}
                                             </p>
                                           </Col>
  
                                         </Row>
                                       </Card>
                                     </div>
                                     <div style={item.Data[0].Data.ReturnStops === 2 ? {} : { display: "none" }}>
  
                                       <Card id="CardTiket" body>
                                         <Alert id="warningCard" variant="warning">
                                           From {item.Data[0].Data.ReturnDepCityName[2]} To {item.Data[0].Data.ReturnArrCityName[2]}
                                         </Alert>
                                         <Row style={{ marginRight: 0 + "px" }}>
  
                                           <Col>
                                             <img id="AirilineLogo" src={item.Data[0].Data.ReturnairlineLogo[2]} alt='img'/>
                                             <p id="AirilineName">
                                               {item.Data[0].Data.ReturnAirlineName[2]}
                                             </p>
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.ReturnAepDateAndTime[2]}</h4>
                                             <p>
                                               {item.Data[0].Data.ReturnArrAirportName[1]}
                                             </p>
                                           </Col>
                                           <Col  >
                                             <div className="stop-cn">
                                               <label classNameName="time">Layover Time</label>
  
                                               <span className="stops"></span>
  
                                               <label classNameName="stopLabel">{item.Data[0].Data.ReturnLayOverTime[2]}</label></div>
  
                                           </Col>
                                           <Col >
                                             <h4 id="TimeH4">{item.Data[0].Data.ReturnArrDateAndTime[2]}</h4>
                                             <p>
                                               {item.Data[0].Data.ReturnArrAirportName[2]}
                                             </p>
                                           </Col>
  
                                         </Row>
                                       </Card>
                                     </div>
                                     <hr id="HrDivider" />
  
                                   </Dialog>
                                   <span  className="btn btn-info btn-circle" onClick={() => setState({ isShown: true })}>
                                   <i  className="fas fa-plane"></i>
                                   </span>
                                   {/* <Col  md={{ span: 4, offset: 5 }}>
                               <div classNameName="DetailsDiv">
                                 <a classNameName="ChooseaTourBtm" onClick={() => setState({ isShown: true })}>Details</a>
                               </div>
                               </Col> */}
                                 </Pane>
                               )}
                             </Component>
                           </td>
                           <td> <Icon style={{cursor: 'pointer'}} icon="tick-circle" color="success" size={30} onClick={()=>{
                                      ctx.actions.Done(item)
                                    }}/></td>     
                        
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
          } else {
            return (
            <Home/> 
            )
         

        }
        }}
      </Context.Consumer>
      </div>
    );
  }
}

export default Dashboard;