import React from "react";
import Context from "./context.js";
import {  Col, Row ,Form,Alert,Badge} from 'react-bootstrap';
import {  toaster, FilePicker ,Button,CornerDialog} from 'evergreen-ui'
import NavBar from "./NavBar";
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../assets/js/host";

const cookies = new Cookies();
class Visa extends React.Component {
    constructor() {
        super();
        this.state = {
          VisaList:[],
          Visa:[],
          Photo:[],
          Email: '',
          Password: "",
          Passport:[],
          others:[]
        };
    }


    componentDidMount() {
      

      let formData = new FormData();
      var headers = {
       "Content-Type": "application/json",
      //  token: cookies.get("token")
     };
    
      
    const urlParams = new URLSearchParams(window.location.search);
    const Nationality = urlParams.get('Nationality');
    formData.append('Nationality', Nationality);



      axios({
        url: host + `api/visa/`,
        method: "POST",
        headers: headers,
        data: formData,
      })
        .then(response => {
          if (response.data) {
        
            this.setState({
              VisaList: response.data,
              // VisaListNS:response.data,
            })
          }
        })
        .catch(function (error) {
  
        });


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
    Country(value){
if (value!==0) {
  let sort = this.state.VisaList;
let result = sort.filter(
  sort => sort._id === value
);
this.setState({
  Visa:result[0]
  
})
}
   }


submit(){

  var FirstName=document.getElementById('FirstName').value;
  var LastName=document.getElementById('LastName').value;
  var PassportNo=document.getElementById('PassportNo').value;
  var Nationality=document.getElementById('Nationality').value;
  var DateofBirth=document.getElementById('DateofBirth').value;
  var PassportIssueDate=document.getElementById('PassportIssueDate').value;
  var PassportExpiryDate=document.getElementById('PassportExpiryDate').value;
var Adults=[]
  let obj={
    FirstName:FirstName,
    LastName:LastName,
    PassportNo:PassportNo,
    Nationality:Nationality,
    DateofBirth:DateofBirth,
    PassportIssueDate:PassportIssueDate,
    PassportExpiryDate:PassportExpiryDate,
  }
  Adults.push(obj);
  let formData = new FormData();
  var headers = {
   "Content-Type": "application/json",
   token: cookies.get("token")
 };

   formData.append('AdultsData', JSON.stringify(Adults));
   formData.append('data', JSON.stringify(this.state.Visa));
   formData.append('AdultsNumber', 1);
   formData.append('ChildData', []);
   formData.append('InfantData', []);
   formData.append('price', this.state.Visa.price);
   formData.append('visaphoto', this.state.Photo);
   formData.append('visaFile', this.state.Passport);
   if (this.state.others!==[]) {
    formData.append('other', this.state.others);
   }
   
   formData.append('Type', 'visa');


   // 
   // formData.append("data", items);
   // formData.append("Adults", adtNumber);
   // formData.append("Child", chldNumber);
   // formData.append("Infant", 0);
 
  
   axios({
     url: host + `api/incomplete/addVisa`,
     method: "POST",
     data: formData,
     headers: headers
   })
     .then(response => {   
      window.location.href = "/Profile";
     })
     .catch(function (error) {
       console.log(error)
       if (error.request.response) {
         toaster.danger(error.request.response);
       }
     });




}



    render() {
      const listItems = this.state.VisaList.map((number,i) =>
      <option key={i} value={number._id}>{number.name}</option>
      // <li><a>{number}</a></li>
      );
        return (
            <Context.Consumer>
                {ctx => {
                  
                    return (
                        <div >
                            <div>
                                <NavBar />
                            </div>
                            <br></br>
                            <br></br>
<Row style={{ marginRight: 0 + "px" }}>
<Col  md={{ span: 6 , offset: 3 }}>
<Alert id="alert-primary"   variant="warning">
<Row>
<Col>
<br></br>
<div style={this.state.Visa.length === 0 ? {display: "none"} : {  }} >
<h5 id="visaHader">
    {this.state.Visa.name} <Badge id="visaBadge" variant="secondary"> {this.state.Visa.price} $</Badge>
  </h5>
  <p>APPROVED: {this.state.Visa.APPROVED}</p>
  <p>Description: {this.state.Visa.Description}</p>
  </div>
  <h5 style={this.state.Visa.length !== 0 ? {display: "none"} : {  }} id="visaHader">
  Select Country
  </h5>
</Col>
<Col md={{ span: 4 , offset: 1 }}>
<Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Select Country</Form.Label>
    <Form.Control   as="select" onChange={(e)=>{
      this.Country(e.target.value)
    }}>
       <option value={0}>Select Country</option>
{listItems}
    </Form.Control>
    </Form.Group>
    </Col>
    </Row>
  </Alert>
  </Col>
</Row>
                            <Row  style={{ marginRight: 0 + "px" }}>
                                <Col  md={{ span: 6 , offset: 3 }}>
                                <div>
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" id="FirstName" placeholder="First Name" />
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" id="LastName" placeholder="Last Name" />
    </Form.Group>

    <Form.Group as={Col} >
            <Form.Label>Nationality</Form.Label>
            <Form.Control type="text" id="Nationality" placeholder="Nationality" />
          </Form.Group>




  </Form.Row>




  <Form.Row>
    <Form.Group as={Col} >
      <Form.Label>Passport No.</Form.Label>
      <Form.Control type="text" id="PassportNo" placeholder="Passport Number" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control type="date" id="DateofBirth" placeholder="Date of Birth" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Passport Issue Date</Form.Label>
      <Form.Control type="date" id="PassportIssueDate" placeholder="Passport Issue Date" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Passport Expiry Date</Form.Label>
      <Form.Control type="date" id="PassportExpiryDate" placeholder="Passport Expiry Date" />
    </Form.Group>
  </Form.Row>



  <Form.Row>


    <Form.Group as={Col} >
    <Form.Label>Passport Scan </Form.Label>
    <FilePicker
  multiple
  width={250}
  height={36}
  marginBottom={32}
  onChange={files => 
  
this.setState({
  Photo:files[0]
})
  }
/>
</Form.Group>
<Form.Group as={Col} >
<Form.Label>Photo Scan</Form.Label>
    <FilePicker
  multiple
  width={250}
  height={36}
  marginBottom={32}
  onChange={files =>
    this.setState({
      Passport:files[0]
    })
   }
/>
</Form.Group>

<Form.Group as={Col} >
<Form.Label>Other</Form.Label>
    <FilePicker
  multiple
  width={250}
  height={36}
  marginBottom={32}
  onChange={files =>
    this.setState({
      others:files[0]
    })
   }
/>
</Form.Group>
    
  </Form.Row>


<p id="VisaLogin"   style={ ctx.value.auth === "login" 
? {display: "none"}
 : {  }}>Please Login First</p>
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
  <Button height={40}  id="BuyHotel" type="submit" onClick={()=>{
    this.submit()
  }}
  style={ ctx.value.auth === "login" 
? {}
 : {display: "none"  }}
 >
    Apply
  </Button>
</div>
                                </Col>


                            </Row>
                                
                       
                        </div>

                    )
                }}
            </Context.Consumer>
        );
    }
}

export default Visa;