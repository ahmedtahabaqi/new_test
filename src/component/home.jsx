import React from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";
import Airline from "../assets/img/Airline Tickets1.png";
import {  Col, Row, Image ,Form} from 'react-bootstrap';
import Hotel from "../assets/img/hotel.png";
import { Pane, Dialog } from 'evergreen-ui'
import Car from "../assets/img/car rent.png";
import Tours from "../assets/img/bus.png";
import Groups from "../assets/img/group .png";
import Visa from "../assets/img/passport.png";
import Component from "@reactions/component";
import axios from "axios";
import host from "../assets/js/host";
import QAir from "../assets/img/8Q.png";
import ME from "../assets/img/ME.png";
import GF from "../assets/img/GF.png";
import TK from "../assets/img/TK.png";
import PC from "../assets/img/PC.png";
import KK from "../assets/img/KK.png";
import MS from "../assets/img/MS.png";
import QR from "../assets/img/QR.png";
import RJ from "../assets/img/RJ.png";
import G9 from "../assets/img/G9.png";
import FZ from "../assets/img/FZ.png";
import EK from "../assets/img/EK.png";
import SV from "../assets/img/SV.png";
import EY from "../assets/img/EY.png";
import NavBar from "./NavBar";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
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

    render() {
        const listItems = this.state.VisaList.map((number,i) =>
        <option key={i} value={number.Nationality}>{number.Nationality}</option>
        );
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                         <NavBar/>
                            <div className="text-center">
                            <Row id="row1" className="justify-content-md-center">
                            
                            <Col md={{  span: 11,offset: 0 }} id="col1">
                            <div className="text-center">
                            <h2 className="titel"> Favorite Holiday - Travelling Services </h2>
                            </div>
                            </Col>
                           
                                <Col md={{  span: 12, }} id="col1">
                                <ul >
         
                                <Image id="homeimg"  width="80" height="80" src={QAir} rounded />
                                <Image id="homeimg"  width="80" height="80" src={ME} rounded />
                                <Image id="homeimg"  width="80" height="80" src={GF} rounded />
                                <Image id="homeimg"  width="80" height="80" src={TK} rounded />
                                <Image id="homeimg"  width="80" height="80" src={PC} rounded />
                                <Image id="homeimg"  width="80" height="80" src={KK} rounded />
                                <Image id="homeimg"  width="80" height="80" src={MS} rounded />
                                <Image id="homeimg"  width="80" height="80" src={QR} rounded />
                                <Image id="homeimg"  width="80" height="80" src={RJ} rounded />
                                <Image id="homeimg"  width="80" height="80" src={G9} rounded />
                               

                                <Image id="homeimg"  width="80" height="80" src={FZ} rounded />
                                <Image id="homeimg"  width="80" height="80" src={EK} rounded />
                                <Image id="homeimg"  width="80" height="80" src={SV} rounded />
                                <Image id="homeimg"  width="80" height="80" src={EY} rounded />



                                {/* <Image id="homeimg"  width="80" height="80" src="https://static.flyinstatic.com/img/flights/1x/airline-logos/KL.png" rounded /> */}
                                    {/* <h2 className="titel">Favorite Holiday - Travelling Services </h2>
                                    <p id="text">Favorite Holiday is a travel and tourism company located in Turkey – Istanbul. We work in the field of airplane tickets and hotel/apartment reservations. Our team also can offer you direct hotel reservations or special hotel offers, tours, transfers, car rental, and other travelling services.</p> */}
                               </ul>
                                </Col>
                            </Row>
                            </div>

                            <Row id="row2">
                                <Col md={{ span: 8, offset: 2 }}>
                               
                                    <h2 className="s2Test">See the World with Favorite Holiday</h2>
                                    <h2 className="s2Titel">Meet your new super powers.</h2>

                                    <p className="s2p"><span  >Many countries around the world have such an impressive nature and architecture that they can easily be a home for excellent tourist destinations. Just imagine how many exquisite spots are there across the globe! There are spiritual temples, picturesque riverbanks, virgin forests, awesome buildings, and abandoned tropical beaches. Favorite Holiday company travelling services are here to help you make your choice and experience the best rest, relaxation or adventures that you could ever imagine!</span></p>
                                </Col>
                            </Row>

                            <div className="text-center">
                            <Row id="row3">
                                <Col md={{ span: 2, offset: 2 }}>
                                    <Image src={Airline} thumbnail id="img" />

                                    <h4 className="card1T">Airline Tickets</h4>
                                    <p className="card1p">Scan our options to get the best deals on airline tickets, whatever your destination is.</p>
                                    <div className="ChooseaTourDiv" id="homeBtm">
                                        <NavLink className="SearchForTickets" to="/FlightSearch">
                                        Find Flights
                                        </NavLink>
                                    </div>

                                </Col>
                                <Col md={{ span: 2, offset: 1 }}>
                                    <Image src={Car} thumbnail id="img" />

                                    <h4 className="card1T">Car Rental</h4>
                                    <p className="card1p">Get cheap and convenient car hire deals from the top car rental companies around the world.</p>
                                  
                                    <div className="ChooseaTourDiv" id="homeBtm">
                                        <p className="SearchForTickets" >
                                        Car Rental Soon
                                            </p>
                                    </div>

                                </Col>
                                <Col md={{ span: 2, offset: 1 }}>
                                    <Image src={Hotel} thumbnail id="img" />

                                    <h4 className="card1T" id="card1T">Hotel Reservations</h4>
                                    <p className="card1p">You can check hotel offers available as well as checking our special offers or ask us for special reservation.</p>
                                    <div className="ChooseaTourDiv" id="homeBtm">
                                    <NavLink to="/FindHotel" className="SearchForTickets" >
                                       Find Hotel 
                                            </NavLink>
                                    </div>
                             

                                </Col>
                            </Row>

                           
                          
                           </div>
                       {/* <Container> */}
                            <Row id="row1btm" className="justify-content-md-center">
                            {/* <Col md={{ span: 1, offset: 1 }}>
                                </Col> */}
                                <Col md={{ span: 2, offset: 2}}>
                                <NavLink to="/FlightSearch">
                                    <div className="ChooseaTourDiv">
                                        {/* <a className="SearchForTickets"> */}
                                        Find Flights
                                        {/* </a> */}
                                    </div>
                                    </NavLink>
                                </Col>
                                <Col md={{ span: 3, offset: 1 }}>
                                    <div className="ChooseaTourDiv">
                                   
                                        Car Rental Soon
                                       
                                    </div>
                                </Col>
                                <Col md={{ span: 2, offset: 0 }}>

                                    <div className="ChooseaTourDiv">
                                        <NavLink to="/FindHotel" className="SearchForTickets" >
                                       Find Hotel 
                                            </NavLink>
                                    </div>
                                </Col>
                                <Col md={{ span: 1, offset: 1 }}>
                                </Col>
                            </Row>
                            
                            
                            {/* </Container> */}
                          
                            <div className="text-center">
                            <Row id="row4">
                                <Col md={{ span: 2, offset: 2 }}>
                                    <Image src={Tours} thumbnail id="img" />


                                    <h4 className="card1T">Various Tours</h4>
                                    <p className="card1p">Favorite Holiday company offers many different tours, from the basic ones to a variety of very special and customized tours.</p>

                                    <div className="ChooseaTourDiv" id="homeBtm">
                                        <NavLink to="/TourList" className="SearchForTickets" >
                                       Find Tours
                                            </NavLink>
                                    </div>

                                </Col>
                                <Col md={{ span: 2, offset: 1 }}>
                                    <Image src={Groups} thumbnail id="img" />

                          
                                    <h4 className="card1T">Tourist Groups</h4>
                                    <p className="card1p">Get the best of your holidays visiting different unexplored places, with specially planned Favorite Holiday deals.</p>
                                    <NavLink to="/Groups">
                                    <div className="ChooseaTourDiv" id="homeBtm">
                                        <span className="SearchForTickets" >
                                        Find Groups
</span>
                                    </div>
                                    </NavLink>
                                </Col>
                                <Col md={{ span: 2, offset: 1 }}>
                                    <Image src={Visa} thumbnail id="img" />


                                    <h4 className="card1T">Apply For Visa</h4>
                                    <p className="card1p">Save time, complete your online visa application with Favorite Holiday and make the holiday of your dream come true!.</p>

                                    <div className="ChooseaTourDiv" id="homeBtm">
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
                                                        <a className="SearchForTickets" onClick={() => setState({ isShown: true })} href="URL" >  
                                        Visa 
                                            </a>

                                                  
                                                        </Pane>
                                                    )}
                                                    </Component>

                                    </div>
                                </Col>
                            </Row>
                            </div>
                         
                            <Row id="row1btm" className="justify-content-md-center">
                            {/* <Col md={{ span: 1, offset: 1 }}>
                                </Col> */}
                                <Col md={{ span: 2, offset: 2}}>
                                {/* <NavLink > */}
                                    <div className="ChooseaTourDiv">
                                    <NavLink to="/TourList" className="SearchForTickets" >
                                       Find Tours
                                            </NavLink>
                                    </div>
                                    {/* </NavLink> */}
                                </Col>
                                <Col md={{ span: 3, offset: 1 }}>
                                <NavLink to="/Groups">
                                    <div className="ChooseaTourDiv">
                                        <span className="SearchForTickets" >
                                        Find Groups
                                            </span>
                                    </div>
                                    </NavLink>
                                </Col>
                                <Col md={{ span: 2, offset: 0 }}>
                                    <div className="ChooseaTourDiv">
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
                                                        <span className="SearchForTickets" onClick={() => setState({ isShown: true })}>
                                                           Visa 
                                                        </span>

                                                  
                                                        </Pane>
                                                    )}
                                                    </Component>

                                    </div>
                                </Col>
                                <Col md={{ span: 1, offset: 1 }}>
                                </Col>
                            </Row>
                            
                            
                            <div className="text-center"  id="row5">
                            <Row  style={{ marginRight: 0 + "px" }}>
                            <Col md={{ span: 4, offset: 4 }}>
                            <p className="s3Ti">Contact US</p>
                            </Col>
                            </Row>
                            <Row  style={{ marginRight: 0 + "px" }}>
                            {/* <center>  <p className="s3Ti">Contact US</p></center> */}
                            <Col md={{ span: 12, offset: 0 }}>
                           

                                {/* <Col md={{ span: 4, offset: 4 }}>                */}
                                    <samp className="s3p">Address: Turkey / Istanbul / Ergenekon Mah. Halaskargazi Cad. 19/A - Sisli, </samp>
                                    <samp className="s3p">Email:info@favorite-holiday.com, </samp>
                                    <samp className="s3p">Land Line: +90 212 225 1899, </samp>
                                    <samp className="s3p">Mob.: +90 538 443 3030</samp>
                                </Col>
                            </Row>

                            <Row  style={{ marginRight: 0 + "px" }}>
                            {/* <center>  <p className="s3Ti">Contact US</p></center> */}
                            <Col md={{ span: 12, offset: 0 }}>
                           

                                {/* <Col md={{ span: 4, offset: 4 }}>                */}
                                <samp className="s3p">Address: Iraq / Erbil / Ain Kawa / Qasra complex Office No.: 36, </samp>
                                    <samp className="s3p">Email: info@favorite-holiday.com, </samp>
                                    <samp className="s3p">Mob.: +964 750 687 8789</samp>
                                </Col>
                            </Row>

                            <br></br>
                            </div>

                            {/* <div className="text-center"  id="row5">
                            <Row  style={{ marginRight: 0 + "px" }}>
                            <Col md={{ span: 4, offset: 4 }}>
                            <center>  <p className="s3Ti">Contact US</p></center>
                            </Col>
                            </Row>
                            <Row  style={{ marginRight: 0 + "px" }}>

                                <Col md={{ span: 4, offset: 4 }}>               
                                    <h2 className="s3p">Turkey – Istanbul – Ergenekon Mah. Halaskargazi Cad. 19/A - Sisli</h2>
                                    <h2 className="s3p">info@favorite-holiday.com</h2>
                                    <h2 className="s3p">Land Line: +90 212 225 1899</h2>
                                    <h2 className="s3p">Mob.: +90 538 443 3030</h2>
                                </Col>
                            </Row>
                            <Row style={{ marginRight: 0 + "px" }}>
                            <Col  md={{ span: 4, offset: 4 }}>               
                                    <h2 className="s3p">Iraq / Erbil / Ain Kawa / Qasra complex Office No.: 36</h2>
                                    <h2 className="s3p">info@favorite-holiday.com</h2>
                                    <h2 className="s3p">Mob.: +964 750 687 8789</h2>
                                </Col>
                            </Row>
                            <br></br>
                            </div> */}
                        </div>
                    )
                }}
            </Context.Consumer>
        );
    }
}

export default Home;