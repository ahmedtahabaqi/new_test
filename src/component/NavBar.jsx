import React from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";
import Logo from "../assets/img/HomeLogo.png";
import { Icon, Pane, Dialog } from 'evergreen-ui'
import {  Form, Navbar, Nav } from 'react-bootstrap';
import Component from "@reactions/component";
import axios from "axios";
import Cookies from "universal-cookie";
import host from "../assets/js/host";

const cookies = new Cookies();

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
            VisaList:[]


        };

    }


    componentDidMount(){
        var headers = {
            "Content-Type": "application/json",
         //   token: cookies.get("token")
          };
          axios({
            url: host + `api/visa/`,
            method: "GET",
            headers: headers
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


    render() {
        const listItems = this.state.VisaList.map((number,i) =>
        <option key={i} value={number.Nationality}>{number.Nationality}</option>
        // <li><a>{number}</a></li>
        );
        return (
            <Context.Consumer>
                {ctx => {
                    return (

                        <Navbar bg="light" expand="xl" id="nav">
                      
                                
                                <Navbar.Brand href="#home"><img width="200" src={Logo} id="Logo" alt="img"/></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    </Nav>
                                    <Form inline>
                                        <ul className="navb">
                                            <li>
                                                <NavLink id="NavbLinks" to="/">
                                                    <Icon marginRight={7} marginTop={-2} icon="home" />Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink id="NavbLinks" to="/FlightSearch">
                                                    <Icon marginRight={7} marginTop={-2} icon="airplane" />Find Flights
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink id="NavbLinks" to="/FindHotel">
                                                    <Icon marginRight={7} marginTop={-2} icon="office" />Find Hotel
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink id="NavbLinks" to="/TourList">
                                                <i className="fas fa-bus-alt" id="NavBarIcons" ></i>Find Torus
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink id="NavbLinks" to="/Groups">
                                                <i  id="NavBarIcons" className="fas fa-suitcase-rolling"></i>Find Group
                                                </NavLink>
                                            </li>
                                            <li style={{marginTop:12}}>

                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                        <Dialog
                                                            isShown={state.isShown}
                                                            title="Apply For Visa"
                                                            onCloseComplete={() => setState({ isShown: false })}
                                                            confirmLabel="Next"
                                                            onConfirm={()=>{
                                                                document.getElementById("search").submit();

                                                            }}
                                                        >
                                                         <Form action="/Visa" id="search">
                                                         <Form.Group >
                                                            <Form.Label>Select Nationality</Form.Label>
                                                            <Form.Control as="select" name="Nationality">
                                                                {listItems}
                                                            </Form.Control>
                                                        </Form.Group>
                                                        </Form>
                                                        </Dialog>
                                                        <span id="spanHome"  onClick={() => setState({ isShown: true })}>
                                            <Icon marginRight={7}  icon="map-create" />Apply For Visa
                                                </span>
                                                  
                                                        </Pane>
                                                    )}
                                                    </Component>
                                            </li>
                                            {/* <li>
                                                <a id="NavbLinks" >
                                                    Coming Soon
                                                </a>
                                            </li> */}
                                            <li>
                                            <NavLink id="NavbLinks"  to="/login"
                                             style={ctx.value.auth === "login"
                                                                    ? { display: "none" }
                                                                    : {}
                                                                }
                                                            >
                                                                <Icon marginRight={7} marginTop={-2} icon="log-in" /> Login
                                                                         </NavLink>
                                            </li>
                                            <li>
                                            <NavLink id="NavbLinks" to="/dashboard"
                                                  style={ctx.value.sesson.role === 1
                                                   ? { }
                                                  : { display: "none"}
                                                   }
                                                ><Icon marginRight={7} marginTop={-2} icon="dashboard" /> Admin
                                                </NavLink>

                                                <NavLink id="NavbLinks" to="/Profile"
                                                  style={ctx.value.auth === "login"&&ctx.value.sesson.role === 0
                                                   ? { }
                                                  : {display: "none" }
                                                   }
                                                ><Icon marginRight={7} marginTop={-2} icon="user" /> Profile
                                                </NavLink>


                                            </li>


                                            <li style={{marginTop:12}}
                                            onClick={()=>{
                                                 cookies.remove("token");
                                                 window.location.href = "/";

                                            }}>
                                                <span id="spanHome" 
                                                  style={ctx.value.auth === "login"
                                                   ? { }
                                                  : {display: "none" }
                                                   }
                                                
                                                ><Icon marginRight={7}  icon="log-out" /> Logout
                                                </span>


                                            </li>


                                        </ul>

                                    </Form>
                                </Navbar.Collapse>
                          
                        </Navbar>
















                        // <div>
                        //     <div className="NavDiv">
                        //     <Container>
                        //         <Row style={{ marginRight: 0 + "px" }}>
                        //             <Col md={2} ><img width="200" src={Logo} /></Col>
                        //             <Col sm={12} md={{ span: 6,offset: 4 }}>
                        //                 <div >
                        //                     <ul className="navb">
                        //                         <li> 
                        //                         <NavLink id="NavbLinks" to="/">
                        //                         <Icon marginRight={7} marginTop={-2} icon="home" />Home 
                        //                         </NavLink>
                        //                             </li>
                        //                         <li>
                        //                         <NavLink id="NavbLinks" to="/FlightSearch">
                        //                         <Icon marginRight={7} marginTop={-2} icon="airplane" />Find Flights
                        //                         </NavLink>
                        //                             </li>
                        //                             <li>
                        //                         <a id="NavbLinks" >
                        //                         Coming Soon
                        //                         </a>
                        //                             </li>
                        //                         <li>
                        //                         <Component initialState={{ isShown: false }}>
                        //                         {({ state, setState }) => (
                        //                             <Pane>
                        //                             <Dialog
                        //                                 isShown={state.isShown}
                        //                                 title="No footer"
                        //                                 onCloseComplete={() => setState({ isShown: false })}
                        //                                 hasFooter={false}
                        //                             >

                        //                                 <Form>
                        //                                 <Form.Group controlId="formBasicEmail">
                        //                                     <Form.Label>Email address</Form.Label>
                        //                                     <Form.Control type="email" placeholder="Enter email" value={this.state.Email} onChange={(event)=>{
                        //                                         this.onEmailChange(event)
                        //                                     }}/>

                        //                                 </Form.Group>

                        //                                 <Form.Group controlId="formBasicPassword">
                        //                                     <Form.Label>Password</Form.Label>
                        //                                     <Form.Control type="password" placeholder="Password" value={this.state.Password} onChange={(event)=>{
                        //                                         this.onPasswordChange(event)
                        //                                     }}/>
                        //                                     <Form.Text className="text-muted">
                        //                                     We'll never share your Password with anyone else.
                        //                                     </Form.Text>
                        //                                 </Form.Group>

                        //                                 <Button variant="primary" onClick={this.login.bind(this)} >
                        //                                     Login
                        //                                 </Button>


                        //                                 </Form>
                        //                             </Dialog>
                        //                             <a id="NavbLinks" onClick={() => setState({ isShown: true })} 
                        //                            style={ ctx.value.auth === "login" 
                        //                             ? {display: "none"}
                        //                             : {  }
                        //                             }
                        //                             >
                        //                         <Icon marginRight={7} marginTop={-2}  icon="user" /> Login
                        //                         </a>
                        //                             {/* <Button onClick={() => setState({ isShown: true })}>Show Dialog</Button> */}
                        //                             </Pane>
                        //                         )}
                        //                         </Component>

                        //                             </li>
                        //                             <li>
                        //                             <NavLink id="NavbLinks" to="/Profile">


                        //                         <Icon marginRight={7} marginTop={-2} icon="user" /> Profile
                        //                         </NavLink>


                        //                         </li>

                        //                     </ul>

                        //                 </div>
                        //             </Col>
                        //         </Row>
                        //         </Container>
                        //     </div>

                        // </div>

                    )

                }}
            </Context.Consumer>
        );
    }
}

export default NavBar;