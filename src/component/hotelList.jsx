import React from "react";
import Context from "./context.js";
import { Container, Col, Row, Card, Alert, Form } from 'react-bootstrap';
import { Dialog, Button, Icon, Pane, IconButton, toaster } from 'evergreen-ui'
import 'react-rangeslider/lib/index.css'
import Component from "@reactions/component";
import Departure from "../assets/img/resort.svg";
import NavBar from "./NavBar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import moment from "moment";
import StarRatings from 'react-star-ratings';
import Cookies from "universal-cookie";
import host from "../assets/js/host";
const cookies = new Cookies();


class FlightList extends React.Component {
  constructor() {
    super();
    this.state = {
      Holetlist: [],
      HoletlistUnsort: [],
      Countries: [],
      page: '',
      Stars: [],
    };

  }



  componentDidMount() {

    const urlParams = new URLSearchParams(window.location.search);
    const Destination = urlParams.get('Destination');
    const CheckIn = urlParams.get('CheckIn');
    const ADULTS = urlParams.get('Adults');
    const CHILDREN = urlParams.get('Children');
    const CheckOut = urlParams.get('CheckOut');
    let resultCheckIn = moment(CheckIn).format('MM/DD/YYYY');
    let resultCheckOut = moment(CheckOut).format('MM/DD/YYYY');

    const ch1 = urlParams.get('ch1');
    const ch2 = urlParams.get('ch2');
    const ch3 = urlParams.get('ch3');
    const ch4 = urlParams.get('ch4');
    const ch5 = urlParams.get('ch5');

    let chAge = [ch1, ch2, ch3, ch4, ch5]

    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      //  token: cookies.get("token")
    };

    formData.append("in", resultCheckIn);
    formData.append("out", resultCheckOut);
    formData.append("adt", ADULTS);
    formData.append("city", Destination);
    formData.append("ch", CHILDREN);
    formData.append("chAge", JSON.stringify(chAge));

    axios({
      url: host + `api/holet/all`,
      method: "POST",
      headers: headers,
      data: formData,
    })
      .then(response => {
        if (response.data[0]) {

          this.setState({
            page: 'data',
            Holetlist: response.data,
            HoletlistUnsort: response.data,
          })
          let Country = [];
          let Stars = [];
          for (let index = 0; index < response.data.length; index++) {
            Country.push(response.data[index].name)
            Stars.push(response.data[index].stars)
          }
          var unique = Country.filter((v, i, a) => a.indexOf(v) === i);
          var uniqueStars = Stars.filter((v, i, a) => a.indexOf(v) === i);
          uniqueStars.sort();
          this.setState({
            Countries: unique,
            Stars: uniqueStars
          })


        }
      })
      .catch((error) => {
        console.log(error)
        // if (error) {
        this.setState({
          page: "404",
        });
        // }

      });
  }

  SortbyHotelName(value) {
    if (value === "all") {
      this.setState({
        Holetlist: this.state.HoletlistUnsort
      });

      document.getElementById("AllAirLines").style.display = "none";

    } else {
      let sort = this.state.HoletlistUnsort;
      const result = sort.filter(sort => sort.name === value);
      this.setState({
        Holetlist: result
      });
    }

  }
  Sort(value) {

    if (value === "price") {

      let sort = this.state.Holetlist;
      sort.sort(function (a, b) {
        var fileA = a.price;
        var fileb = b.price;
        return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
      });

      this.setState({
        Holetlist: sort
      });
    }
    if (value === "uptime") {

      let sort = this.state.Holetlist;
      sort.sort(function (a, b) {
        var fileA = a.uptime;
        var fileb = b.uptime;
        return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
      });

      this.setState({
        Holetlist: sort
      });
    }


  }

  SortByStars(number) {
    let sort = this.state.HoletlistUnsort;
    const result = sort.filter(sort => sort.stars === number);
    this.setState({
      Holetlist: result
    });
  }

  op(value, id, room) {

    const urlParams = new URLSearchParams(window.location.search);
    const CheckIn = urlParams.get('CheckIn');
    const ADULTS = urlParams.get('Adults');
    const CHILDREN = urlParams.get('Children');
    const CheckOut = urlParams.get('CheckOut');
    let resultCheckIn = moment(CheckIn).format('DD/MM/YYYY');
    let resultCheckOut = moment(CheckOut).format('DD/MM/YYYY');






    let op = []
    let optionsCost = 0;
    for (let i = 0; i < value.options.length; i++) {
      var Check = document.getElementById(value._id + id + i).checked

      if (Check) {
        let opCost = value.options[i].cost
        optionsCost = optionsCost + opCost
        let oj = {
          name: document.getElementById(value._id + id + i).value,
          Cost: opCost,
        }
        op.push(oj)
      }


    }
    var breakfastCheck = document.getElementById("breakfast" + value._id + id).checked
    if (breakfastCheck) {
      optionsCost = optionsCost + value.breakfastPrice
      let oj = {
        name: document.getElementById("breakfast" + value._id + id).value,
        Cost: value.breakfastPrice,
      }
      op.push(oj)
    }
    optionsCost = optionsCost * value.Nights
    let defPrice = parseInt(room.cost, 10);
    let tCost = defPrice + optionsCost

    let data = {
      Data: value,
      info: {
        CheckIn: resultCheckIn,
        CheckOut: resultCheckOut,
      },
      op: op,
    }


    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      //  token: cookies.get("token")
    };

    formData.append("type", 'Hotel');
    formData.append("price", tCost);
    formData.append("data", JSON.stringify(data));
    formData.append("Adults", ADULTS);
    formData.append("Child", CHILDREN);
    formData.append("Infant", 0);


    axios({
      url: host + `api/incomplete/add`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        cookies.set("orderToken", response.data.orderToken, {
          path: "/",
          expires: new Date(Date.now() + 21600000)
        });
        window.location.href = "/pay";


      })
      .catch(function (error) {
        console.log(error)
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });








  }


  render() {

    const listItems = this.state.Countries.map((number, i) =>

      <option key={i} value={number}>{number}</option>

    );

    const Stars = this.state.Stars.map((number, i) =>
      <Row key={i}>
        <br></br>
        <div style={{ cursor: 'pointer' }}
          onClick={() => {
            this.SortByStars(number)
            document.getElementById("AllAirLines").style.display = "block"
          }}  >
          <StarRatings

            starDimension="25px"
            starSpacing="1px"
            rating={number}
            starRatedColor="#ffc107"
            // changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
          />
        </div>
      </Row>
    );
    return (
      <Context.Consumer>
        {ctx => {
          if (this.state.page === 'data') {
            return (
              <div >
                <NavBar />
                <br></br>
                <br></br>
                <Container>
                  <Row style={{ marginRight: 0 + "px" }}>
                    <Col xs={12} sm={12} lg={8}>
                      {this.state.Holetlist.map((item, i) => (

                        <Card key={i} id="CardTiket" body>
                          <Alert id="warningCard" variant="primary">
                            <img id="HotelNameIcon" src={Departure} alt='img' />
                            {item.name}

                          </Alert>
                          <Row style={{ marginRight: 0 + "px" }}>
                            <Col md={4}>
                              <img id="HotelImg" src={host + item.img} alt='img' />

                            </Col>
                            <Col md={{ span: 8 }}>
                              <Col >
                                <div className="iFDiv" dangerouslySetInnerHTML={{ __html: item.googleMap }} />

                              </Col>
                            </Col>

                          </Row>
                          <br></br>
                          <Row>
                            <Col md={{ span: 4 }}>
                              <h4 id="TimeH4"><Icon icon="map-marker" color="info" marginRight={5} /> {item.address}  </h4>
                            </Col>
                            <Col md={{ span: 3, offset: 1 }}>
                              <div >
                                <StarRatings

                                  starDimension="25px"
                                  starSpacing="1px"
                                  rating={item.stars}
                                  starRatedColor="#ffc107"
                                  numberOfStars={5}
                                  name='rating'
                                />
                              </div>
                            </Col>
                            <Col md={{ span: 3, offset: 1 }}>
                              <h4 id="TimeH4">{item.City},{item.country}</h4>
                            </Col>
                          </Row>

                          <hr id="HrDivider" />
                          <Row>
                            <p id="Hotelbody"> {item.body}</p>

                          </Row>
                          <hr id="HrDivider" />
                          <div className="text-center">
                            <Component initialState={{ isShown: false }}>
                              {({ state, setState }) => (
                                <Pane>
                                  <Dialog
                                    isShown={state.isShown}
                                    title={item.name}
                                    hasFooter={false}
                                    onCloseComplete={() => setState({ isShown: false })}

                                  >
                                    {item.Rooms.map((room, r) => (
                                      <Card key={r} id="CardTiket" body>
                                        <Alert id="infoRoomStars" variant="primary">

                                          <img id="HotelNameIcon" src={host + item.img} alt='img' />
                                          {room.name}
                                          <StarRatings

                                            starDimension="25px"
                                            starSpacing="1px"
                                            rating={item.stars}
                                            starRatedColor="#ffc107"
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                          />

                                          {/* <StarRatingComponent
                                style="margin-bottom: -16px;"
                                    value={item.stars.toFixed(2)} 
                                    starColor={"#ffc107"} 
                                    id="infoRoomStars"
                                    emptyStarColor={'#cccccc'} /> */}


                                        </Alert>
                                        <Row style={{ marginRight: 0 + "px" }}>
                                          <Col md={{ span: 8 }}>
                                            <Row>
                                              <Col >


                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col>
                                            <div >
                                              <center><h4>Customize Your Room</h4></center>
                                              <br></br>
                                              {item.options.map((option, o) => (

                                                <Form.Check
                                                  key={o}

                                                  custom
                                                  inline
                                                  value={option.name}
                                                  type={'checkbox'}
                                                  id={item._id + r + o}
                                                  onChange={() => {
                                                    var Check = document.getElementById(item._id + r + o).checked
                                                    if (Check) {
                                                      var cost = document.getElementById(item._id + r).innerText
                                                      cost = parseInt(cost, 10);
                                                      var optionCost = option.cost;
                                                      optionCost = parseInt(optionCost, 10) * item.Nights;
                                                      cost = cost + optionCost;
                                                     document.getElementById(item._id + r).textContent = cost
                                                    } else {
                                                      let cost = document.getElementById(item._id + r).innerText
                                                      cost = parseInt(cost, 10);
                                                      let optionCost = option.cost;
                                                      optionCost = parseInt(optionCost, 10) * item.Nights;
                                                      cost = cost - optionCost;
                                                     document.getElementById(item._id + r).textContent = cost
                                                    }
                                                  }}
                                                  label={option.name + ' (+' + option.cost + '$ x ' + item.Nights + 'Nights)'}
                                                />

                                              ))}
                                              <Form.Check
                                                custom

                                                disabled
                                                checked

                                                label={'breakfas (+' + item.breakfastPrice + '$ x ' + item.Nights + 'Nights)'}
                                                type={'checkbox'}
                                                inline
                                                id={item._id}
                                                style={item.breakfast ? {} : { display: "none" }}

                                              />
                                              <Form.Check
                                                custom
                                                inline
                                                value={'breakfast'}
                                                label={'breakfast (+' + item.breakfastPrice + '$ x ' + item.Nights + 'Nights)'}
                                                type={'checkbox'}
                                                style={item.breakfast ? { display: "none" } : {}}
                                                id={"breakfast" + item._id + r}
                                                onChange={() => {
                                                  var Check = document.getElementById("breakfast" + item._id + r).checked
                                                  if (Check) {
                                                    let cost = document.getElementById(item._id + r).innerText
                                                    cost = parseInt(cost, 10);
                                                    let optionCost = item.breakfastPrice;
                                                    optionCost = parseInt(optionCost, 10) * item.Nights;
                                                    cost = cost + optionCost;
                                                   document.getElementById(item._id + r).textContent = cost
                                                  } else {
                                                    let cost = document.getElementById(item._id + r).innerText
                                                    cost = parseInt(cost, 10);
                                                    let optionCost = item.breakfastPrice;
                                                    optionCost = parseInt(optionCost, 10) * item.Nights;
                                                    cost = cost - optionCost;
                                                     document.getElementById(item._id + r).textContent = cost
                                                  }
                                                }}
                                              />
                                            </div>
                                          </Col>

                                        </Row>
                                        <hr id="HrDivider" />
                                        <div className="text-center">

                                          <Button id="BuyHotel" marginRight={5} height={40} iconAfter="shopping-cart" variant="primary"

                                            onClick={() => {
                                              this.op(item, r, room)
                                            }}
                                          >Purchase For <span id={item._id + r}> {' ' + room.cost}</span>  $ </Button>


                                        </div>
                                      </Card>
                                    ))}
                                  </Dialog>

                                  <Button id="BuyHotel" marginRight={5} height={40} iconAfter="eye-open" variant="primary" onClick={() => setState({ isShown: true })}>Show Rooms </Button>
                                </Pane>
                              )}
                            </Component>







                            {/* <Button id="BuyHotel" marginRight={5}  height={40} iconAfter="shopping-cart" variant="primary"
                            onClick={()=>{
                              this.op(item)
                            }}
                            >BUY For <span id={item._id}>{item.Rooms.cost}</span>  $ For Dual</Button>     
                             */}

                          </div>
                        </Card>


                      ))}


                    </Col>

                    <Col xs={12} sm={12} lg={4}>
                      <Card    >
                        <Card.Header id="CardResult">Results Found {this.state.Holetlist.length}</Card.Header>
                        <IconButton id="AllAirLines" appearance="minimal" icon="cross" intent="danger" iconSize={20}
                          onClick={() => {
                            document.getElementById("AllAirLines").style.display = "none";
                            this.SortbyHotelName('all')
                          }}
                        />
                        <Card.Body>

                          <Card.Title>Filters</Card.Title>
                          <Form>
                            <Form.Group as={Row}>
                              <Col sm={10}>

                                {Stars}


                                <br></br>

                                <Form.Label>Select  Hotel</Form.Label>
                                <Form.Control as="select" onChange={(e) => {
                                  document.getElementById("AllAirLines").style.display = "block";
                                  this.SortbyHotelName(e.target.value)
                                }}>
                                  <option>all</option>
                                  {listItems}
                                </Form.Control>
                              </Col>
                            </Form.Group>
                          </Form>

                        </Card.Body>

                      </Card>
                    </Col>

                  </Row>

                </Container>
                <br></br>

              </div>

            )
          } else if (this.state.page === '404') {
            return (
              <div>
                <NavBar />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Container>
                  <Row style={{ marginRight: 0 + "px" }}>
                    <Col md={{ span: 8, offset: 4 }}>
                      <h2>Oops there is no results found</h2>
                      <br></br>
                      <Row>
                        <Col>
                          <NavLink id="searchAgine" to="/FindHotel">
                            Search Again
                              </NavLink>
                        </Col>
                        <Col>
                          <NavLink id="HomePage" to="/">
                            Home Page
                              </NavLink>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>

                </Container>
              </div>

            )
          }





        }}
      </Context.Consumer>
    );
  }
}

export default FlightList;