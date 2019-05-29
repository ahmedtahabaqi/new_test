import React from "react";
import Context from "./context.js";
import {  Col, Row, Form, Alert } from 'react-bootstrap';
import { FilePicker, Button, toaster,CornerDialog } from 'evergreen-ui'
import Component from "@reactions/component";
import NavBar from "./NavBar";
import axios from "axios";
import Cookies from "universal-cookie";
import host from "../assets/js/host";

const cookies = new Cookies();

var PassPort="";

class PayTorus extends React.Component {
  constructor() {
    super();
    this.displayDataAdt = [];
    this.displayDataChild=[];

    this.displayDataInfant=[];

    this.state = {
      Email: '',
      Country: '',
      Name: '',
      PhoneNumber: '',
      data: [],
      price: '',
      Type: '',
      checked: true,
      Password: "",
      Adtdata : this.displayDataAdt,
      Childdata:this.displayDataChild,
      Infantdata : this.displayDataInfant,
      files:[],
      filesChild:[],
      filesInfant:[],
      AdultsNumber:0,
      ChildNumber:0,
      InfantNumber:0,
      order_id:'',

    };
  }


  onChangeCountry(value) {
    this.setState({
      Country: value
    })
    // this.checkForm()
  }

  onChangePhoneNumber(value) {
    this.setState({
      PhoneNumber: value
    })
    // this.checkForm()
  }
  onChangeName(value) {
    this.setState({
      Name: value
    })
    // this.checkForm()
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    })
    // this.checkForm()
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
    })
      .then(response => {
      
        cookies.set("token", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        window.location.reload();
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
    if (e.target.checked === false) {
      document.getElementById('StripeCheckout').style.display = "none"
      document.getElementById('PayLater').style.display = "block"

    } else {
      document.getElementById('PayLater').style.display = "none"
      document.getElementById('StripeCheckout').style.display = "block"

    }

  }
  componentDidMount() {
 
    var headers = {
      "Content-Type": "application/json",
      order: cookies.get("orderToken")
    };
    axios({
      url: host + `api/incomplete/`,
      method: "GET",
      headers: headers
    })
      .then(response => {
          this.setState({
            AdultsNumber:response.data.order.Adults,
            ChildNumber:response.data.order.Child,
            InfantNumber:response.data.order.Infant,
            data: response.data.order.Data[0],
            price: response.data.order.price,
            Type: response.data.order.type,
            order_id:response.data.order._id
          })
    //   this.html(AdultsNumber)



      })
      .catch(error=> {
  console.log(error);
  
      });


  }

  html(){
    let html =[]
    for (let index = 0; index <this.state.AdultsNumber; index++) {
      html.push(
        <div id="YourID" key={index}>
        <h4>Adult {index+1}</h4>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" id={"adlFirstName"+index}  placeholder="First Name" />
          </Form.Group>
      
          <Form.Group as={Col} >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" id={"adlLastName"+index} placeholder="Last Name" />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>Passport No.</Form.Label>
            <Form.Control type="text" id={"adlPassportNo"+index} placeholder="Passport Number" />
          </Form.Group>
        </Form.Row>
        <Form.Row>

        
          <Form.Group as={Col} >
            <Form.Label>Passport Issue Date</Form.Label>
            <Form.Control type="date" id={"adlPassportIssueDate"+index} placeholder="Passport Issue Date" />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>Passport Expiry Date</Form.Label>
            <Form.Control type="date" id={"adlPassportExpiryDate"+index} placeholder="Passport Expiry Date" />
          </Form.Group>
          <Form.Group as={Col}  >
          <Form.Label>Passport Scan </Form.Label>
          <FilePicker
        width={"90%"}
        height={36}
        marginBottom={32}
        onChange={files => {
          let obj={
            id:index,
            files:files[0]
          }
          let file = [...this.state.files,obj];
          var uniqueOrders = file.reduce((unique, o) => {
            if (!unique.some(obj => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          this.setState({
            files:uniqueOrders
          })
        }}

      />
      </Form.Group>    
       

        </Form.Row>
        <hr></hr>
        </div>
      );

      
    }

    this.displayDataAdt=html;
    this.setState({
       Adtdata : this.displayDataAdt,
    });




    let htmlcld =[]
    for (let index = 0; index <this.state.ChildNumber; index++) {
      htmlcld.push(
        <div id="YourID" key={index}>
        <h4>Child {index+1}</h4>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" id={"ChildFirstName"+index}  placeholder="First Name" />
          </Form.Group>
      
          <Form.Group as={Col} >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" id={"ChildLastName"+index} placeholder="Last Name" />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>Passport No.</Form.Label>
            <Form.Control type="text" id={"ChildPassportNo"+index} placeholder="Passport Number" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>Passport Issue Date</Form.Label>
            <Form.Control type="date" id={"ChildPassportIssueDate"+index} placeholder="Passport Issue Date" />
          </Form.Group>
      
          <Form.Group as={Col} >
            <Form.Label>Passport Expiry Date</Form.Label>
            <Form.Control type="date" id={"ChildPassportExpiryDate"+index} placeholder="Passport Expiry Date" />
          </Form.Group>
          <Form.Group as={Col}  >
          <Form.Label>Passport Scan </Form.Label>
          <FilePicker
        width={"90%"}
        height={36}
        marginBottom={32}
        onChange={files => {
          let obj={
            id:index,
            files:files[0]
          }

          let file = [...this.state.filesChild, obj];
          var uniqueOrders = file.reduce((unique, o) => {
            if (!unique.some(obj => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          this.setState({
            filesChild:uniqueOrders
          })
        }}

      />
      </Form.Group>    
       

        </Form.Row>
        <hr></hr>
        </div>
      );

      
    }

    this.displayDataChild=htmlcld;
    this.setState({
      Childdata : this.displayDataChild,
    });



    let htmlInfant =[]
    for (let index = 0; index <this.state.InfantNumber; index++) {
      htmlInfant.push(
        <div id="YourID" key={index}>
        <h4>Infant {index+1}</h4>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" id={"InfantFirstName"+index}  placeholder="First Name" />
          </Form.Group>
      
          <Form.Group as={Col} >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" id={"InfantLastName"+index} placeholder="Last Name" />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>Passport No.</Form.Label>
            <Form.Control type="text" id={"InfantPassportNo"+index} placeholder="Passport Number" />
          </Form.Group>
        </Form.Row>
        <Form.Row>

          <Form.Group as={Col} >
            <Form.Label>Passport Issue Date</Form.Label>
            <Form.Control type="date" id={"InfantPassportIssueDate"+index} placeholder="Passport Issue Date" />
          </Form.Group>
      
          <Form.Group as={Col} >
            <Form.Label>Passport Expiry Date</Form.Label>
            <Form.Control type="date" id={"InfantPassportExpiryDate"+index} placeholder="Passport Expiry Date" />
          </Form.Group>
          <Form.Group as={Col}  >
          <Form.Label>Passport Scan </Form.Label>
          <FilePicker
        width={"90%"}
        height={36}
        marginBottom={32}
        onChange={files => {
          let obj={
            id:index,
            files:files[0]
          }
          let file = [...this.state.filesInfant, obj];

          var uniqueOrders = file.reduce((unique, o) => {
            if (!unique.some(obj => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);

          this.setState({
            filesInfant:uniqueOrders
          })
        }}

      />
      </Form.Group>    
       

        </Form.Row>
        <hr></hr>
        </div>
        
      );

      
    }

    this.displayDataInfant=htmlInfant;
    this.setState({
      Infantdata : this.displayDataInfant,
    });




  }
  submit(){
    let formData = new FormData();   
    var headers = {
     "Content-Type": "application/json",
     token: cookies.get("token")
   };
var Email=document.getElementById('email').value;
var Phone=document.getElementById('Phone').value;
var Name=document.getElementById('Name').value;
var Nationality=document.getElementById('Nationality').value;
var Hotel=document.getElementById('Hotel').value;
var Room=document.getElementById('Room').value;
var address=document.getElementById('address').value;
var INFANT=document.getElementById('INFANT').value;

let Adults={
    Email:Email,
    Phone:Phone,
    Nationality:Nationality,
    Name:Name,
    Hotel:Hotel,
    Room:Room,
    address:address,
    INFANT:INFANT,
}
    formData.append('AdultsData', JSON.stringify(Adults));
    formData.append('ChildData', []);
    formData.append('InfantData', []);
    formData.append('data', JSON.stringify(this.state.data));
    formData.append('AdultsNumber', this.state.AdultsNumber);
    formData.append('ChildNumber', this.state.ChildNumber);
    formData.append('InfantNumber', this.state.InfantNumber);
    formData.append('price', this.state.price);
    formData.append('Type', this.state.Type);
    formData.append('order_id', this.state.order_id);
    axios({
      url: host + `api/incomplete/ToursOrder`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
       if (response.status===200) {
        cookies.remove("orderToken");
        window.location.href = "/Profile";
       }  
  
      })
      .catch(function (error) {
        console.log(error)
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });
  }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                return(
                  <div>
                    <NavBar/>
                    <br/>
                    <br/>
                    <Row style={{ marginRight: 0 + "px" }}>
<Col md={{ span: 8 , offset: 2 }}>
<Alert id="alert-primary"   variant="warning">
<Row>
<Col>
<h5><b>Reservation Type : {this.state.Type}</b></h5>
<h5><b>Total Price : {this.state.price}</b></h5>
<h5><b>Total Adults  : {this.state.AdultsNumber}</b></h5>
<h5><b>Total Children  : {this.state.ChildNumber}</b></h5>

<p style={ ctx.value.auth === "login" 
? {display: "none" }
 : { }}>Login Then you Can Sumit The Order</p>
</Col>
<div 
style={ ctx.value.auth === "login" 
? {display: "none" }
 : { }}
>
                                                                   
 <Component initialState={{ isShown: false }}>
                                                                   {({ state, setState }) => (
                                                                       <React.Fragment>
                                                                       <CornerDialog
                                                                           title="Login To Continue"
                                                                           isShown={state.isShown}
                                                                           hasFooter={false}
                                                                           onCloseComplete={() => setState({ isShown: false })}
                                                                       >
 <div>
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


                                                       </div>
                                                                       </CornerDialog>
                                                                       <button onClick={() => setState({ isShown: true })} id="PayasCompany">Login</button>
                                                                       </React.Fragment>
                                                                   )}
                                                                   </Component>                                                   
                                                                   </div>
    </Row>
  </Alert>
  </Col>
</Row>
                    <Row  style={{ marginRight: 0 + "px" }}>
                                <Col  md={{ span: 8 , offset: 2 }}>
                                <div>
                                 
<div>
<Row>
    <Col>
    <Form.Group>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" id="email" placeholder="Enter email" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group>
    <Form.Label>Phone Number With Whatsapp</Form.Label>
    <Form.Control type="number" id="Phone" placeholder="Enter Phone Number" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group >
    <Form.Label>Full Name</Form.Label>
    <Form.Control type="text" id="Name" placeholder="Exp: First Name,Second Name,Last Name" />
  </Form.Group>
    </Col>
  </Row>

  <Row>
  <Col>
    <Form.Group >
    <Form.Label>Nationality</Form.Label>
    <Form.Control type="text" id="Nationality" placeholder="Enter Nationality" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group >
    <Form.Label>Hotel Name</Form.Label>
    <Form.Control type="text" id="Hotel" placeholder="Enter Hotel Name" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group >
    <Form.Label>Hotel Room Number</Form.Label>
    <Form.Control type="number" id="Room" placeholder="Enter Hotel Name" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group >
    <Form.Label>Hotel address</Form.Label>
    <Form.Control type="text" id="address" placeholder="Enter Hotel address" />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group >
    <Form.Label>INFANT (0-2) Number</Form.Label>
    <Form.Control type="number" id="INFANT" placeholder="Enter INFANT Number" />
  </Form.Group>
    </Col>
  </Row>
</div>




       <Button height={40} id="BuyHotel" marginRight={16} appearance="primary" iconBefore="endorsed"onClick={()=>{
  this.submit()
}}
style={ ctx.value.auth === "login" 
? { }
 : {display: "none" }}

>
          Submit
        </Button>
   
</div>
<br></br>                              </Col>


                            </Row>
                            

       </div>
                )
                }}
            </Context.Consumer>
        );
    }
}

export default PayTorus;