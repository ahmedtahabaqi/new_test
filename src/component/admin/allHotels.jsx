import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";
import Logo from "../../assets/img/LOGO .svg";
import {  Row} from 'react-bootstrap';
import { Icon} from 'evergreen-ui'
import Cookies from "universal-cookie";
import Home from "../../component/home";
const cookies = new Cookies();

class allHotels extends React.Component {
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
       <span  id="AdminSideBarLinkA" className="nav-link">
       <i className="fas fa-hotel"></i>
           <span>Hotels List</span></span>
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
               <Link className="nav-link" to="/clients">
               
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
  
  
          
                
                    <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Hotels List</h6>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">City</th>
                                  <th scope="col">Number of Rooms</th>
                                  <th scope="col">Country</th>
                                  <th scope="col">Stars</th>
                                  <th scope="col">Delete</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
  
                                {ctx.value.allHotels.map((item,i) => (
                                  <tr key={i}>
                                    <td >{i}</td>
                                    <td>{item.name}</td>
                                    <td>{item.City}</td>
                                    <td >{item.Room.length}</td>
                                    <td > {item.country} </td>
                                    <td > {item.stars} </td>
                                    <td> <Icon icon="trash" style={{cursor: 'pointer'}} color="danger" marginLeft={10} size={30} 
                                    onClick={()=>{
                                      ctx.actions.DeleteHotel(item)
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

export default allHotels;