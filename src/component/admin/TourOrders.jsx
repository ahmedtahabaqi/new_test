import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";
import Logo from "../../assets/img/LOGO .svg";
import { Col, Row, Card, Alert, Badge, ListGroup } from 'react-bootstrap';
import { Pane, Dialog, Icon } from 'evergreen-ui'
import Component from "@reactions/component";
import Departure from "../../assets/img/Departure.png";
import Arrival from "../../assets/img/arrival.png";
import Cookies from "universal-cookie";
import Home from "../../component/home";
import host from "../../assets/js/host";
const cookies = new Cookies();

class TourOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Country: '',
      Name: '',
      Password: '',
      PhoneNumber: '',
      Orders: [],
      OrdersOneWay: [],


    };
  }



  onChangeName(value) {
    this.setState({
      Name: value
    })

  }
  onChangeEmail(value) {
    this.setState({
      Email: value
    })

  }

  onChangePassword(value) {
    this.setState({
      Password: value
    })

  }
  onChangePhoneNumber(value) {
    this.setState({
      PhoneNumber: value
    })

  }
  onChangeCountry(value) {
    this.setState({
      Country: value
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

                      <img src={Logo} width='200px' alt='img' />

                    </Row>
                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                      <div className="sidebar-brand-icon ">


                      </div>
                      <div className="sidebar-brand-text mx-2">Favorite<sup>holiday</sup></div>
                    </Link>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                      <Link className="nav-link" to="/dashboard">

                        <i className="fa fa-plane"></i>
                        <span>Clients Orders</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/HotelsOrders">
                        <i className="fas fa-hotel"></i>

                        <span>Hotels Orders</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <span id="AdminSideBarLinkA" className="nav-link" >
                        <i className="fas fa-bus-alt"></i>

                        <span>Tours Orders</span></span>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/ToursCompletedOrders">
                        <i className="fas fa-bus-alt"></i>

                        <span>Tours Completed Orders</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/GroupsOrders">
                        <i className="fas fa-suitcase-rolling"></i>

                        <span>Groups Orders</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/VisaOrders">
                        <i className="fas fa-map-marked-alt"></i>
                        <span>Visa Orders</span>
                      </Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/VisaCompleteOrder">
                        <i className="fas fa-map-marked-alt"></i>
                        <span>Visa Completed Orders</span>
                      </Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/allHotels">
                        <i className="fas fa-hotel"></i>
                        <span>Hotels List</span>
                      </Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/allTours">
                        <i className="fas fa-bus-alt"></i>

                        <span>Tours List</span></Link>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/allGroups">
                        <i className="fas fa-suitcase-rolling"></i>
                        <span>Groups List</span>
                      </Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/allVisa">
                        <i className="fas fa-map-marked-alt"></i>
                        <span>Visa List</span>
                      </Link>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active">
                      <Link className="nav-link" to="/completedOrders">
                        <i className="fas fa-clipboard-check"></i>
                        <span>Completed Orders</span>
                      </Link>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />

                    <li className="nav-item active">
                      <Link className="nav-link" to="/clients">

                        <i className="fa fa-users"></i>
                        <span>Clients</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <li className="nav-item active"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        cookies.remove("token");
                        window.location.href= "/";

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
                            <h6 className="m-0 font-weight-bold text-primary">Tours Orders</h6>
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
                                  <th scope="col">Tours Details</th>
                                  <th scope="col">Done?</th>

                                </tr>
                              </thead>
                              <tbody>

                                {ctx.value.TourOrders.map((item, i) => (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td >{item.uptime}</td>
                                    <td>{item.user}</td>
                                    <td>{item.email}</td>
                                    <td >{item.price} $</td>
                                    <td
                                      style={item.payed === false
                                        ? {}
                                        : { display: "none" }
                                      }> <Badge variant="danger">No</Badge></td>
                                    <td
                                      style={item.payed === false
                                        ? { display: "none" }
                                        : {}
                                      }> <Badge variant="success">Yes</Badge></td>
                                    <td > <Badge variant="danger">{item.money} $</Badge></td>





                                    <td>
                                      <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                          <Pane>
                                            <Dialog
                                              isShown={state.isShown}
                                              title="Order information"
                                              hasFooter={false}
                                              onCloseComplete={() => setState({ isShown: false })}
                                              confirmLabel="Custom Label"
                                            >
                                              <div>
                                                <div>


                                                  <div >
                                                    <h5> <Badge variant="primary"> Order Information</Badge></h5>
                                                    <ListGroup>
                                                      <ListGroup.Item variant="primary"><b>Email: </b> {item.AdultsData[0].Email}</ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Full Name: </b> {item.AdultsData[0].Name}</ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Nationality: </b> {item.AdultsData[0].Nationality}</ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Phone Number: </b>{item.AdultsData[0].Phone}</ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Hotel Name: </b>{item.AdultsData[0].Hotel} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Room Number: </b>{item.AdultsData[0].Room} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>address: </b>{item.AdultsData[0].address} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>ADULTS Number: </b>{item.Data[0].info.ADULTSNumber} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Children Number: </b>{item.Data[0].info.ChildrenNumber} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>INFANT Number: </b>{item.AdultsData[0].INFANT} </ListGroup.Item>
                                                      <ListGroup.Item variant="primary"><b>Date : </b>{item.Data[0].info.ToursDate} </ListGroup.Item>
                                                    </ListGroup>
                                                  </div>

                                                </div>
                                                <br />



                                              </div>
                                            </Dialog>
                                            <Icon marginLeft={25} onClick={() => setState({ isShown: true })} style={{ cursor: 'pointer' }} icon="info-sign" color="info" size={30} />
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
                                              // title={item.Data[0].Data.name}
                                              hasFooter={false}
                                              hasHeader={false}
                                              onCloseComplete={() => setState({ isShown: false })}

                                            >
                                              <div>
                                                <Col md={{ span: 8, offset: 2 }}>
                                                  <div id="cardAdmin">
                                                    <img id="cardToursImg" src={host + item.Data[0].Item.img} alt="Avatar" />
                                                    <div id="container">
                                                      <Card.Title>{item.Data[0].Item.name}</Card.Title>
                                                      <Card.Text id="ToursBodyCard">
                                                      </Card.Text>
                                                    </div>
                                                  </div>

                                                </Col>
                                              </div>
                                            </Dialog>
                                              <span className="btn btn-info btn-circle" onClick={() => setState({ isShown: true })}>
                                              <i className="fas fa-bus-alt"></i>
                                            </span>
                                          </Pane>
                                        )}
                                      </Component>
                                    </td>
                                    <td> <Icon icon="tick-circle" style={{ cursor: 'pointer' }} color="success" marginLeft={10} size={30}
                                      onClick={() => {
                                        ctx.actions.Done(item)
                                      }}
                                    /></td>
                                  </tr>
                                ))}

                              </tbody>
                            </table>

                          </div>
                        </div>







                        <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Guests Tours Orders</h6>
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
                                  <th scope="col">Information</th>
                                  <th scope="col">Tours Details</th>
                                  <th scope="col">Done?</th>
                                </tr>
                              </thead>
                              <tbody>

                                {ctx.value.GustOrderTwoWay.map((item, i) => (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td >{item.uptime}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Email}</td>
                                    <td >{item.Data[0].price} $</td>
                                    <td >  <Icon icon="download" style={{ cursor: 'pointer' }} color="success" marginLeft={30} size={30} onClick={() => {
                                      window.open(host + item.passport, "_blank");
                                    }} /></td>
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
                                                  From {item.Data[0].depCityName[0]} To {item.Data[0].arrCityName[0]}
                                                </Alert>
                                                <Row style={{ marginRight: 0 + "px" }}>

                                                  <Col>
                                                    <img alt='img' id="AirilineLogo" src={item.Data[0].airlineLogo[0]} />
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

                                                <Card id="CardTiket" body>
                                                  <Alert id="warningCard" variant="warning">
                                                    From {item.Data[0].depCityName[1]} To {item.Data[0].arrCityName[1]}
                                                  </Alert>
                                                  <Row style={{ marginRight: 0 + "px" }}>

                                                    <Col>
                                                      <img alt='img' id="AirilineLogo" src={item.Data[0].airlineLogo[1]} />
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

                                                <Card id="CardTiket" body>
                                                  <Alert id="warningCard" variant="warning">
                                                    From {item.Data[0].depCityName[2]} To {item.Data[0].arrCityName[2]}
                                                  </Alert>
                                                  <Row style={{ marginRight: 0 + "px" }}>

                                                    <Col>
                                                      <img alt='img' id="AirilineLogo" src={item.Data[0].airlineLogo[2]} />
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

                                              <Alert variant="success" id="alert-success">
                                                Return
                       <img alt='img' id="Departure" src={Arrival} />
                                              </Alert>
                                              <Card id="CardTiket" body>
                                                <Alert id="warningCard" variant="warning">
                                                  From {item.Data[0].ReturnDepCityName[0]} To {item.Data[0].ReturnArrCityName[0]}
                                                </Alert>
                                                <Row style={{ marginRight: 0 + "px" }}>

                                                  <Col>
                                                    <img alt='img' id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[0]} />
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
                                                      <label classNameName="time">Layover Time</label>

                                                      <span className="stops"></span>

                                                      <label classNameName="stopLabel">{item.Data[0].ReturnLayOverTime[0]}</label></div>

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
                                                      <img alt='img' id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[1]} />
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
                                                        <label classNameName="time">Layover Time</label>

                                                        <span className="stops"></span>

                                                        <label classNameName="stopLabel">{item.Data[0].ReturnLayOverTime[1]}</label></div>

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
                                                      <img alt='img' id="AirilineLogo" src={item.Data[0].ReturnairlineLogo[2]} />
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
                                                        <label classNameName="time">Layover Time</label>

                                                        <span className="stops"></span>

                                                        <label classNameName="stopLabel">{item.Data[0].ReturnLayOverTime[2]}</label></div>

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
                                            <span className="btn btn-info btn-circle" onClick={() => setState({ isShown: true })}>
                                              <i className="fas fa-info-circle"></i>
                                            </span>
                                          </Pane>
                                        )}
                                      </Component>
                                    </td>
                                    <td> <Icon icon="tick-circle" color="success" size={30} onClick={() => {
                                      ctx.actions.Done(item)
                                    }} /></td>

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
                <Home />
              )
            }

          }}
        </Context.Consumer>
      </div>
    );
  }
}

export default TourOrders;