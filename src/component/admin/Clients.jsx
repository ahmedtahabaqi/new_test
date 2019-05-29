import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";
import Logo from "../../assets/img/LOGO .svg";
import { Row,  Badge,InputGroup,FormControl,Table} from 'react-bootstrap';
import Cookies from "universal-cookie";
import {  Icon ,Pane,Dialog,toaster,SideSheet} from 'evergreen-ui'
import Component from "@reactions/component";
import axios from "axios";
import Home from "../../component/home";

import host from "../../assets/js/host";
const cookies = new Cookies();

class Clients extends React.Component {
  constructor() {
    super();
    this.state = {
        Email: '',
        Country: '',
        Name: '',
        Password:'',
        PhoneNumber: '',
        RoundtripOrders:[],
        OneWayOrders:[],
        money:0,
        ClientsHistory:[]
    

    };
  }




GetClient(id){
    var headers = {
        "Content-Type": "application/json",
        token: cookies.get("token")
      };
      axios({
        url: host + `api/user/client/${id}`,
        method: "GET",
        headers: headers
      })
        .then(response => {
          if (response.data[0]) {
            this.setState({
                RoundtripOrders: response.data,
              // sesson:response.Data[0][1].sesson
            })
          }
  
          // if (response.status == 200) {
          //   toaster.success(response.Data[0]);
          //   this.NetworkRequests();
          // }
        })
        .catch(function (error) {
  
        });
        axios({
            url: host + `api/user/client/oneWay/${id}`,
            method: "GET",
            headers: headers
          })
            .then(response => {
              if (response.data[0]) {
                console.log(response.data[0])
                this.setState({
                    OneWayOrders: response.data,
                  // sesson:response.Data[0][1].sesson
                })
              }
      
              // if (response.status == 200) {
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

  Add(item){

var Amount=document.getElementById('Amount').value

Amount=parseFloat(Amount)
var money=parseFloat(item.money)

var t=money+Amount
t=parseFloat(t)

console.log(item.id)

  let formData = new FormData();
  var headers = {
   "Content-Type": "application/json",
   token: cookies.get("token")
 };
 
  formData.append("Amount", t);
  formData.append("money", Amount);
  axios({
    url: host + `api/user/updateMoney/${item.id}`,
    method: "POST",
    data: formData,
    headers: headers
  })
    .then(response => {
 
      if (response.status === 200) {
        toaster.success(`Successful `);
        window.location.reload(1);

      
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
<div>
      <Context.Consumer>
        {ctx => {
          if (ctx.value.sesson.role === 1) {
            return (
              <div id="wrapper">
  
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
              <Row>
                 
                  <img src={Logo}  alt="img" width='200px'/>
               
                  </Row>
                  <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                  <div className="sidebar-brand-icon ">
  
                  
                  </div>
                  <div className="sidebar-brand-text mx-2">Favorite<sup>holiday</sup></div>
                </Link>
          
                <hr className="sidebar-divider my-0"/>
       
       <li className="nav-item active">
       <Link className="nav-link" to="/dashboard">
      
           <i className="fa fa-plane"></i>
           <span>Clients Orders</span></Link>
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
           
           <span>Visa Orders</span></Link>
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
       <p  id="AdminSideBarLinkA" className="nav-link">
       <i className="fa fa-users"></i>

           <span>Clients</span></p>
       </li>
               <hr className="sidebar-divider d-none d-md-block"/>  
               <li className="nav-item active" 
               style={{cursor: 'pointer'}}
               onClick={()=>{
                cookies.remove("token");
                window.location.href = "/";

               }}>
               <p className="nav-link" >
               <i className="fas fa-sign-out-alt"></i>
                   {/* <i className="fa fa-users"></i> */}
                   <span>Logout</span></p>
               </li>
              </ul>
  
              
              <div id="content-wrapper" className="d-flex flex-column">
          
                <div id="content">
          
            
     <br></br>
     <br></br>
     <br></br>
  
                  <div className="container-fluid">
  
  
          
                
                    <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">All Clients</h6>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                             <th>#</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Balance</th>
                                  <th scope="col">Phone Number</th>
                                  <th scope="col">Join Date</th>

                                  <th scope="col">Information</th>
                                  <th scope="col">Edit Balance</th>
                                </tr>
                              </thead>
                              <tbody>
  
                                {ctx.value.Users.map((item,i) => (
                                  <tr key={i}>
                                    <td>{i+1}</td>
                                    <td >{item.name}</td>
                                    <td>{item.Email}</td>
                                    <td>  <Badge variant="danger"><b>{(item.money)} </b>$</Badge></td>
                                    <td>{item.phone}</td>
                                    <td>{item.uptime}</td>
                                    <td>
                                    <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <React.Fragment>
      <SideSheet
        isShown={state.isShown}
        onCloseComplete={() => {
          this.setState({
            ClientsHistory: [],
          // sesson:response.Data[0][1].sesson
        })
          setState({ isShown: false })
        }}
      >
      <br></br>
      <br></br>
<center><h5><b>Debt Payment History</b></h5></center>
<br></br>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Amount</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
  {this.state.ClientsHistory.map((Order,i) => (
    <tr>
      <td>{i}</td>
      <td>{Order.Amount}</td>
      <td>{Order.uptime}</td>
    </tr>
  ))}
  </tbody>
</Table>



      </SideSheet>
      <Icon  onClick={() => {
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
axios({
  url: host + `api/user/clientMoney/${item.id}`,
  method: "GET",
  headers: headers
})
  .then(response => {
    if (response.data[0]) {
      this.setState({
          ClientsHistory: response.data,
        // sesson:response.Data[0][1].sesson
      })
    }

    // if (response.status == 200) {
    //   toaster.success(response.Data[0]);
    //   this.NetworkRequests();
    // }
  })
  .catch(function (error) {

  });



        setState({ isShown: true })
        
        }} marginLeft={25} style={{    cursor: 'pointer'}} icon="info-sign" color="info" size={30} />
    </React.Fragment>
  )}
</Component>
                                   
                                      </td>
                                  
                                  
                                  
                                    <td>

                                    <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title={item.name}
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Change"
        onConfirm={this.Add.bind(this,item)}
      >
   <center>   <h5>{item.name} Balance <Badge variant="danger">{(item.money*-1)} $</Badge></h5></center>
         <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>$</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl type="number" id="Amount" aria-label="Amount (to the nearest dollar)" />
    <InputGroup.Append>
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>



      </Dialog>
      <Icon icon="edit" onClick={() => setState({ isShown: true })} style={{cursor: 'pointer'}} color="info" marginLeft={10} size={30} />
    </Pane>
  )}
</Component>

                                    
                                    
                                    
                                    </td>
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

export default Clients;