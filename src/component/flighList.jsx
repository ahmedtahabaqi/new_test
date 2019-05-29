import React from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";
import { Container, Col, Row, Card, Alert, Image, Form } from 'react-bootstrap';
import { Pane, Dialog, IconButton, toaster } from 'evergreen-ui'
import 'react-rangeslider/lib/index.css'
import Component from "@reactions/component";
// import Arrow from "../assets/img/arrow.png";
import Loding from "../assets/img/loding2.gif";
import Departure from "../assets/img/Departure.png";
import Arrival from "../assets/img/arrival.png";
import Giphy from "../assets/img/giphy.gif";
import Time from "../assets/img/time.jpg";
// import FlightSearch from "./flight";
import NavBar from "./NavBar";
// import StripeCheckout from 'react-stripe-checkout';

import axios from "axios";
import moment from "moment";

import host from "../assets/js/host";
import Cookies from "universal-cookie";
const cookies = new Cookies();




class FlightList extends React.Component {
  constructor() {
    super();
    this.state = {
      volume: 0,
      horizontal: 10,
      FlightSearch: '',
      pageState: "",
      Refrash: false,
      UnsortedFlightSearch: [],
      sortState: '',
      trip: "",
      Tecket: [],
      Airlines: [],
      AirlinesUnF: [],
      AirLinesReturn: [],
      AirLinesReturnUnf: [],
      MaxPrice: 0,
      MinPice: 0,

    };

  }

  componentDidMount() {

    // this.Refrash()
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const to = urlParams.get('to');
    const DepartDate = urlParams.get('Departing');
    const ADULTS = urlParams.get('Adults');
    const CHILDREN = urlParams.get('Children');
    const Infant = urlParams.get('Infant');
    const trip = urlParams.get('flight-type');
    const CLASS = urlParams.get('class');
    const ReturnDate = urlParams.get('Returning');


    this.setState({
      pageState: "loading",

    });



    if (trip === "Oneway") {


      axios.get(host + `api/orders/oneway?from=${from}&to=${to}&data=${DepartDate}&adt=${ADULTS}&type=${CLASS}&chd=${CHILDREN}&Infant=${Infant}`

      )
        .then(response => {
          // If request is good...
          if (response.data) {

            var sort = response.data;
            sort.sort(function (a, b) {
              var fileA = parseInt(a.price, 10);

              var fileb = parseInt(b.price, 10);
              return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
            });

            var min = Math.min.apply(null, response.data.map(function (a) { return a.price; }))
              , max = Math.max.apply(null, response.data.map(function (a) { return a.price; }))

            this.setState({
              trip: "Oneway",
              pageState: "data",
              FlightSearch: sort,
              UnsortedFlightSearch: sort,
              MaxPrice: max,
              MinPice: min
            });
            let arr = []
            for (let index = 0; index < response.data.length; index++) {
              let element = response.data[index].logoCover;
              arr.push(element);


            }

            function onlyUnique(value, index, self) {
              return self.indexOf(value) === index;
            }

            // usage example:

            var unique = arr.filter(onlyUnique); // returns ['a', 1, 2, '1']
            this.setState({
              Airlines: unique,
              AirlinesUnF: unique,
            })
          }

        })
        .catch((error) => {
          this.setState({
            pageState: "404",
          });

        });

    } else {

      axios.get(host + `api/orders/twoway?from=${from}&to=${to}&Ddata=${DepartDate}&adt=${ADULTS}&type=${CLASS}&chd=${CHILDREN}&Rdata=${ReturnDate}&Infant=${Infant}`

      )
        .then(response => {
          // If request is good...
          if (response.data) {

            var sort = response.data;
            sort.sort(function (a, b) {
              var fileA = parseInt(a.price, 10);

              var fileb = parseInt(b.price, 10);
              return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
            });

            this.setState({
              trip: "Roundtrip",
              pageState: "data",
              FlightSearch: sort,
              UnsortedFlightSearch: sort

            });
          }
          let arr = []
          let arr2 = []
          for (let index = 0; index < response.data.length; index++) {
            let element = response.data[index].logoCover;
            let element2 = response.data[index].ReturnLogoCover;
            arr.push(element);
            arr2.push(element2);

          }

          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }

          // usage example:

          var unique = arr.filter(onlyUnique); // returns ['a', 1, 2, '1']
          var unique2 = arr2.filter(onlyUnique);
          this.setState({
            Airlines: unique,
            AirlinesUnF: unique,
            AirLinesReturn: unique2,
            AirLinesReturnUnf: unique2,
          })
        })
        .catch((error) => {
          this.setState({
            pageState: "404",
          });

        });


    }


  }


  Refrash() {
    setTimeout(
      () => {

        this.setState({
          Refrash: true
        })
      }, 12000);
  }

  LogoSort(item) {

    if (this.state.trip === "Oneway") {
      let sort = this.state.FlightSearch;
      const result = sort.filter(
        sort => sort.logoCover === item
      );
      this.setState({
        FlightSearch: result,
        sortState: 'sort',
        Airlines: [item],
      });
    } else {
      let sort = this.state.FlightSearch;
      let logos = []
      const result = sort.filter(
        sort => sort.logoCover === item
      );

      for (let index = 0; index < result.length; index++) {
        const element = result[index].ReturnLogoCover;
        logos.push(element)
      }

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      var unique = logos.filter(onlyUnique);
      this.setState({
        FlightSearch: result,
        sortState: 'sort',
        Airlines: [item],
        AirLinesReturn: unique,
      });
    }
  }
  LogoSortReturn(item) {

    let sort = this.state.FlightSearch;
    let logos = []
    const result = sort.filter(
      sort => sort.ReturnLogoCover === item
    );

    for (let index = 0; index < result.length; index++) {
      const element = result[index].logoCover;
      logos.push(element)
    }

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    // usage example:

    var unique = logos.filter(onlyUnique);
    this.setState({
      FlightSearch: result,
      sortState: 'sort',
      Airlines: unique,
      AirLinesReturn: [item],
    });

    if (item === 'all') {
      var sortPrice = this.state.UnsortedFlightSearch;
      sortPrice.sort(function (a, b) {
        var fileA = parseInt(a.price, 10);

        var fileb = parseInt(b.price, 10);
        return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
      });
      this.setState({
        FlightSearch: sortPrice,
        sortState: '',
        Airlines: this.state.AirlinesUnF,
        AirLinesReturn: this.state.AirLinesReturnUnf
      });

    }

  }
  StopsSort(item) {
    if (this.state.trip === 'Oneway') {
      let sort = this.state.UnsortedFlightSearch;
      let logos = []
      const result = sort.filter(
        sort => sort.stops === item
      );

      for (let index = 0; index < result.length; index++) {
        const element = result[index].logoCover;
        logos.push(element)
      }
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      // usage example:

      var unique = logos.filter(onlyUnique);

      this.setState({
        FlightSearch: result,
        Airlines: unique,
      })

      sort = this.state.UnsortedFlightSearch;

    } else {

      let sort = this.state.UnsortedFlightSearch;
      let logos = []
      let logosR = []
      const result = sort.filter(
        sort => sort.stops === item && sort.ReturnStops === item
      );

      for (let index = 0; index < result.length; index++) {
        const element = result[index].logoCover;
        const element2 = result[index].ReturnLogoCover;
        logos.push(element)
        logosR.push(element2)
      }
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      // usage example:

      // var unique = logos.filter(onlyUnique);
      var unique2 = logosR.filter(onlyUnique);
      this.setState({
        FlightSearch: result,
        Airlines: unique,
        AirLinesReturn: unique2,
      })

      sort = this.state.UnsortedFlightSearch;

    }


  }
  Sort(item) {
    if (item === 'Soonest') {
      let sort = this.state.FlightSearch;
      sort.sort(function (a, b) {
        var fileA = a.depDateAndTime;
        var fileb = b.depDateAndTime;
        return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
      });
      this.setState({
        FlightSearch: sort
      });
    }
    if (item === 'Latest') {
      let sort = this.state.FlightSearch;
      sort.sort(function (a, b) {
        var fileA = a.depDateAndTime;
        var fileb = b.depDateAndTime;
        return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
      });
      this.setState({
        FlightSearch: sort
      });
    }




    if (item === 'SoonestReturn') {
      let sort = this.state.FlightSearch;
      sort.sort(function (a, b) {
        var fileA = a.ReturnAepDateAndTime;
        var fileb = b.ReturnAepDateAndTime;
        return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
      });
      this.setState({
        FlightSearch: sort
      });
    }
    if (item === 'LatestReturn') {
      let sort = this.state.FlightSearch;
      sort.sort(function (a, b) {
        var fileA = a.ReturnAepDateAndTime;
        var fileb = b.ReturnAepDateAndTime;
        return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
      });
      this.setState({
        FlightSearch: sort
      });
    }


  }

  Purchase(value) {




    const urlParams = new URLSearchParams(window.location.search);
    // const from = urlParams.get('from');
    // const to = urlParams.get('to');
    const DepartDate = urlParams.get('Departing');
    const ADULTS = urlParams.get('Adults');
    const CHILDREN = urlParams.get('Children');
    const Infant = urlParams.get('Infant');
    const trip = urlParams.get('flight-type');
    // const CLASS = urlParams.get('class');
    const ReturnDate = urlParams.get('Returning');


    let resultDepartDate = moment(DepartDate).format('DD/MM/YYYY');
    let resultReturnDate = moment(ReturnDate).format('DD/MM/YYYY');

    var type = "flight-" + trip


    let data = {
      Data: value,
      info: {
        DepartDate: resultDepartDate,
        ReturnDate: resultReturnDate
      }
    }
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      //  token: cookies.get("token")
    };

    formData.append("type", type);
    formData.append("price", value.price);
    formData.append("data", JSON.stringify(data));
    formData.append("Adults", ADULTS);
    formData.append("Child", CHILDREN);
    formData.append("Infant", Infant);


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

    return (
      <Context.Consumer>
        {ctx => {
          const listItems = this.state.Airlines.map((number, i) =>
            <Image key={i} id="logoIcon" onClick={() => {
              document.getElementById('AllAirLines').style.display = "block"
              this.LogoSort(number);

            }} src={number} rounded />
            // <li><a>{number}</a></li>
          );

          const AirLinesReturn = this.state.AirLinesReturn.map((AirLinesReturn, i) =>
            <Image id="logoIcon" key={i} onClick={() => {
              document.getElementById('AllAirLines').style.display = "block"
              this.LogoSortReturn(AirLinesReturn);

            }} src={AirLinesReturn} rounded />

          );
          if (this.state.pageState === "data") {
            if (this.state.trip === "Oneway") {
              return (
                <div >
                  <NavBar />
                  <br></br>
                  <br></br>
                  <Container>
                    <Row style={{ marginRight: 0 + "px" }}>
                      <Col xs={12} sm={12} lg={8}>
                        {this.state.FlightSearch.map((item, i) => (
                          <Card id="CardTiket" key={i} body>
                            <Row style={{ marginRight: 0 + "px" }}>
                              <Col>
                                <img id="AirilineLogoCover" src={item.logoCover} alt='img' />

                              </Col>
                              <Col >
                                <h4 id="TimeH4">{moment(item.depDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>
                                  {item.departingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.totalDuration}</label>
                                  <span className="stops">
                                    <span style={item.stops === 1 || item.stops === 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.stops === 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.layOverCity[0]} ,{item.layOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.stops === 0 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.stops === 1 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.stops === 2 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>
                                  {item.arrivalAirportName}
                                </p>
                              </Col>

                            </Row>
                            <hr id="HrDivider" />
                            <Row>
                              <Col md={{ span: 3, offset: 3 }}>
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
                                          From {item.depCityName[0]} To {item.arrCityName[0]}
                                        </Alert>
                                        <Card id="CardTiket" body>

                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img alt='img' id="AirilineLogo" src={item.airlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.airlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.depDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>
                                                {item.departingAirportName}

                                              </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.layOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.arrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>
                                                {item.arrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>
                                        <hr />
                                        <div style={item.stops === 1 || item.stops === 2 ? {} : { display: "none" }}>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[1]} To {item.arrCityName[1]}
                                          </Alert>
                                          <Card id="CardTiket" body>

                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.airlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.depDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[0]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.arrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <div style={item.stops === 2 ? {} : { display: "none" }}>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[2]} To {item.arrCityName[2]}
                                          </Alert>
                                          <Card id="CardTiket" body>

                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.airlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.depDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.arrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>


                                        </div>

                                        <hr id="HrDivider" />
                                        <Col md={{ span: 2, offset: 4 }}>
                                          <div className="BuyBtm"
                                            onClick={() => {
                                              this.Purchase(item)

                                            }} >
                                            <span className="ChooseaTourBtm" >
                                              <span className="ChooseaTourBtm">
                                                Buy For   {item.price} $
                                          </span>
                                            </span>

                                          </div>
                                        </Col>

                                      </Dialog>
                                      <div className="DetailsDiv" onClick={() => setState({ isShown: true })}>
                                        <span className="ChooseaTourBtm" >Details</span>
                                      </div>

                                    </Pane>
                                  )}
                                </Component>


                              </Col>
                              <Col>

                                <div className="BuyBtm">
                                  <span className="ChooseaTourBtm"
                                    //to="/pay"
                                    onClick={() => {
                                      this.Purchase(item)
                                      // const urlParams = new URLSearchParams(window.location.search);
                                      // localStorage.removeItem('itemStored');
                                      // localStorage.removeItem('flight-type');

                                      // localStorage.setItem('itemStored', JSON.stringify(item));
                                      // localStorage.setItem('flight-type', JSON.stringify( urlParams.get('flight-type')));


                                    }}
                                  ><span>Purchase For </span>{item.price} $</span>

                                </div>
                              </Col>

                            </Row>
                          </Card>


                        ))}


                      </Col>

                      <Col xs={12} sm={12} lg={4}>
                        <Card    >
                          <Card.Header id="CardResult">Results Found {this.state.FlightSearch.length} </Card.Header>

                          <Card.Body>
                            <IconButton id="AllAirLines" appearance="minimal" icon="cross" intent="danger" iconSize={20}
                              onClick={() => {
                                this.LogoSortReturn('all');
                                document.getElementById("AllAirLines").style.display = "none"
                                document.getElementById('Radio').checked = false;
                                document.getElementById('Radio1').checked = false;
                                document.getElementById('Radio2').checked = false;
                                document.getElementById('Sort').checked = false;
                                document.getElementById('Sort1').checked = false;
                              }} />
                            <Card.Title>Filters</Card.Title>
                            <Form>
                              <Form.Group as={Row}>
                                <Col sm={10}>
                                  <Form.Check
                                    type="radio"
                                    label="Soonest"
                                    custom
                                    value="Soonest"
                                    name="formHorizontalRadios"
                                    id="Sort"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    custom
                                    label="Latest"
                                    value="Latest"
                                    name="formHorizontalRadios"
                                    id="Sort1"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                </Col>
                              </Form.Group>
                            </Form>
                            <hr id="HrDivider" />
                            <Card.Title>Stops</Card.Title>
                            <Card.Text>
                              <Form.Group as={Row}>
                                <Col sm={10}>
                                  <Form.Check
                                    custom
                                    type="radio"
                                    label="0 STOP"
                                    value="0"
                                    name="formHorizontalRadios"
                                    id="Radio"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="1 STOP"
                                    custom
                                    value="1"
                                    name="formHorizontalRadios"
                                    id="Radio1"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="2 STOP"
                                    custom
                                    value="2"
                                    name="formHorizontalRadios"
                                    id="Radio2"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                </Col>
                              </Form.Group>


                              <hr id="HrDivider" />
                              <Card.Title>Air Lines</Card.Title>
                              <ul>{listItems}</ul>

                              <hr />

                            </Card.Text>

                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                  </Container>
                  <br></br>

                </div>

              )
            } else {
              return (
                <div >
                  <NavBar />
                  <br></br>
                  <br></br>
                  <Container>
                    <Row style={{ marginRight: 0 + "px" }}>
                      <Col xs={12} sm={12} lg={8}>
                        {this.state.FlightSearch.map((item, i) => (
                          <Card id="CardTiket" key={i} body>
                            <Alert id="warningCard" variant="primary" >
                              Departure
                           <img alt='img' id="Departure" src={Departure} />
                            </Alert>
                            <Row style={{ marginRight: 0 + "px" }}>
                              <Col>
                                <img alt='img' id="AirilineLogoCover" src={item.logoCover} />

                              </Col>
                              <Col >
                                <h4 id="TimeH4">{moment(item.depDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>
                                  {item.departingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.totalDuration}</label>
                                  <span className="stops">
                                    <span style={item.stops === 1 || item.stops === 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.stops === 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.layOverCity[0]} ,{item.layOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.stops === 0 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.stops === 1 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.stops === 2 ? {} : { display: "none" }} id="TimeH4">{moment(item.arrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>

                                  {item.arrivalAirportName}
                                </p>
                              </Col>
                            </Row>
                            <hr id="HrDivider" />
                            <Alert id="warningCard" variant="success" >
                              Return
                              <img alt='img' id="Departure" src={Arrival} />
                            </Alert>
                            <Row style={{ marginRight: 0 + "px" }}>

                              <Col>
                                <img alt='img' id="AirilineLogoCover" src={item.ReturnLogoCover} />

                              </Col>
                              <Col >
                                <h4 id="TimeH4"> {moment(item.ReturnAepDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>

                                  {item.ReturnDepartingAirportName}
                                </p>
                              </Col>
                              <Col  >
                                <div className="stop-cn">
                                  <label className="time">{item.ReturnTotalDuration}</label>
                                  <span className="stops">
                                    <span style={item.ReturnStops === 1 || item.ReturnStops === 2 ? {} : { display: "none" }} className="stop1">
                                    </span>
                                    {/* <span  className="stop2">
                                          </span> */}
                                    <span style={item.ReturnStops === 2 ? {} : { display: "none" }} className="stop">
                                    </span>
                                  </span><label className="stopLabel">{item.ReturnLayOverCity[0]} ,{item.ReturnLayOverCity[1]}</label></div>
                              </Col>
                              <Col >
                                <h4 style={item.ReturnStops === 0 ? {} : { display: "none" }} id="TimeH4">{moment(item.ReturnArrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.ReturnStops === 1 ? {} : { display: "none" }} id="TimeH4">{moment(item.ReturnArrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <h4 style={item.ReturnStops === 2 ? {} : { display: "none" }} id="TimeH4">{moment(item.ReturnArrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                <p>
                                  {item.ReturnArrivalAirportName}
                                </p>
                              </Col>

                            </Row>
                            <hr id="HrDivider" />
                            <Row>
                              <Col md={{ span: 3, offset: 3 }}>
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
                              <img alt='img' id="Departure" src={Departure} />
                                        </Alert>
                                        <Card id="CardTiket" body>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.depCityName[0]} To {item.arrCityName[0]}
                                          </Alert>
                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img alt='img' id="AirilineLogo" src={item.airlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.airlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.depDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>
                                                {item.departingAirportName}
                                              </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.layOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.arrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>
                                                {item.arrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>

                                        <hr />

                                        <div style={item.stops === 1 || item.stops === 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.depCityName[1]} To {item.arrCityName[1]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.airlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.depDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[0]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.arrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <div style={item.stops === 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.depCityName[2]} To {item.arrCityName[2]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.airlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.airlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.depDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[1]}

                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.layOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.arrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.arrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>

                                        </div>

                                        <hr id="HrDivider" />

                                        <Alert id="warningCard" variant="success">
                                          Return
                              <img alt='img' id="Departure" src={Arrival} />
                                        </Alert>
                                        <Card id="CardTiket" body>
                                          <Alert id="warningCard" variant="warning">
                                            From {item.ReturnDepCityName[0]} To {item.ReturnArrCityName[0]}
                                          </Alert>
                                          <Row style={{ marginRight: 0 + "px" }}>

                                            <Col>
                                              <img alt='img' id="AirilineLogo" src={item.ReturnairlineLogo[0]} />
                                              <p id="AirilineName">
                                                {item.ReturnAirlineName[0]}
                                              </p>
                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.ReturnAepDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>

                                                {item.ReturnDepartingAirportName}
                                              </p>
                                            </Col>
                                            <Col  >
                                              <div className="stop-cn">
                                                <label className="time">Layover Time</label>

                                                <span className="stops"></span>

                                                <label className="stopLabel">{item.ReturnLayOverTime[0]}</label></div>

                                            </Col>
                                            <Col >
                                              <h4 id="TimeH4">{moment(item.ReturnArrDateAndTime[0]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                              <p>
                                                {item.ReturnArrAirportName[0]}
                                              </p>
                                            </Col>

                                          </Row>
                                        </Card>

                                        <hr />

                                        <div style={item.ReturnStops === 1 || item.ReturnStops === 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.ReturnDepCityName[1]} To {item.ReturnArrCityName[1]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.ReturnairlineLogo[1]} />
                                                <p id="AirilineName">
                                                  {item.ReturnAirlineName[1]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.ReturnAepDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>

                                                  {item.ReturnArrAirportName[0]}
                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.ReturnLayOverTime[1]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.ReturnArrDateAndTime[1]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[1]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>
                                        </div>
                                        <div style={item.ReturnStops === 2 ? {} : { display: "none" }}>

                                          <Card id="CardTiket" body>
                                            <Alert id="warningCard" variant="warning">
                                              From {item.ReturnDepCityName[2]} To {item.ReturnArrCityName[2]}
                                            </Alert>
                                            <Row style={{ marginRight: 0 + "px" }}>

                                              <Col>
                                                <img alt='img' id="AirilineLogo" src={item.ReturnairlineLogo[2]} />
                                                <p id="AirilineName">
                                                  {item.ReturnAirlineName[2]}
                                                </p>
                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.ReturnAepDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[1]}
                                                </p>
                                              </Col>
                                              <Col  >
                                                <div className="stop-cn">
                                                  <label className="time">Layover Time</label>

                                                  <span className="stops"></span>

                                                  <label className="stopLabel">{item.ReturnLayOverTime[2]}</label></div>

                                              </Col>
                                              <Col >
                                                <h4 id="TimeH4">{moment(item.ReturnArrDateAndTime[2]).format('DD/MM/YYYY, h:mm:ss a')}</h4>
                                                <p>
                                                  {item.ReturnArrAirportName[2]}
                                                </p>
                                              </Col>

                                            </Row>
                                          </Card>
                                        </div>
                                        <hr id="HrDivider" />
                                        <Col md={{ span: 2, offset: 4 }}>
                                          <div className="BuyBtm"
                                            onClick={() => {
                                              this.Purchase(item)

                                            }}>
                                            <span className="ChooseaTourBtm">
                                              <span className="ChooseaTourBtm">
                                                Buy For   {item.price} $
                                          </span>
                                            </span>
                                          </div>
                                        </Col>

                                      </Dialog>
                                      <div className="DetailsDiv" onClick={() => setState({ isShown: true })}>
                                        <span className="ChooseaTourBtm" >Details</span>
                                      </div>

                                    </Pane>
                                  )}
                                </Component>


                              </Col>
                              <Col>
                                <div className="BuyBtm">
                                  <span className="ChooseaTourBtm"
                                    //to="/pay"
                                    onClick={() => {
                                      this.Purchase(item)
                                      // const urlParams = new URLSearchParams(window.location.search);
                                      // localStorage.removeItem('itemStored');
                                      // localStorage.removeItem('flight-type');

                                      // localStorage.setItem('itemStored', JSON.stringify(item));
                                      // localStorage.setItem('flight-type', JSON.stringify( urlParams.get('flight-type')));

                                    }}
                                  ><span>Purchase For </span>{item.price} $</span>


                                </div>
                              </Col>

                            </Row>
                          </Card>
                        ))}
                      </Col>

                      <Col xs={12} sm={12} lg={4}>
                        <Card    >
                          <Card.Header id="CardResult">Results Found {this.state.FlightSearch.length}</Card.Header>
                          <IconButton id="AllAirLines" appearance="minimal" icon="cross" intent="danger" iconSize={20}
                            onClick={() => {
                              this.LogoSortReturn('all');
                              document.getElementById("AllAirLines").style.display = "none"
                              document.getElementById('Radio').checked = false;
                              document.getElementById('Radio1').checked = false;
                              document.getElementById('Radio2').checked = false;
                              document.getElementById('Sort').checked = false;
                              document.getElementById('Sort1').checked = false;
                              document.getElementById('Sort2').checked = false;
                              document.getElementById('Sort3').checked = false;
                            }} />
                          <Card.Body>
                            <Card.Title>Filters</Card.Title>
                            <Form>
                              <Form.Group as={Row}>
                                <Col sm={10}>
                                  <Form.Check
                                    type="radio"
                                    custom
                                    label="Soonest Departure"
                                    value="Soonest"
                                    name="formHorizontalRadios"
                                    id="Sort"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    custom
                                    label="Latest Departure"
                                    value="Latest"
                                    name="formHorizontalRadios"
                                    id="Sort1"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    custom
                                    label="Soonest Return"
                                    value="SoonestReturn"
                                    name="formHorizontalRadios"
                                    id="Sort2"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="Latest Return"
                                    custom
                                    value="LatestReturn"
                                    name="formHorizontalRadios"
                                    id="Sort3"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.Sort(event.target.value)

                                    }}
                                  />
                                </Col>
                              </Form.Group>
                            </Form>
                            <Card.Title>Stops</Card.Title>
                            <Card.Text>
                              <Form.Group as={Row}>

                                <Col sm={10}>
                                  <Form.Check
                                    type="radio"
                                    label="0 STOP"
                                    custom
                                    value="0"
                                    name="formHorizontalRadios"
                                    id="Radio"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="1 STOP"
                                    value="1"
                                    custom
                                    name="formHorizontalRadios"
                                    id="Radio1"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="2 STOP"
                                    value="2"
                                    custom
                                    name="formHorizontalRadios"
                                    id="Radio2"
                                    onChange={(event) => {
                                      document.getElementById("AllAirLines").style.display = "block"
                                      this.StopsSort(event.target.value)

                                    }}
                                  />
                                </Col>
                              </Form.Group>




                              <hr id="HrDivider" />
                              <Card.Title>Departure Air Lines</Card.Title>
                              <ul>{listItems}</ul>,

                                <hr id="HrDivider" />
                              <Card.Title>Return Air Lines</Card.Title>
                              <ul>{AirLinesReturn}</ul>,
                              <br />
                              <hr />



                            </Card.Text>

                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                  </Container>
                  <br></br>

                </div>

              )
            }

          } else if (this.state.Refrash) {
            return (
              <div>

                <Component initialState={{ isShown: true }}>
                  {({ state, setState }) => (
                    <Pane>
                      <Dialog

                        isShown={state.isShown}
                        onCloseComplete={() => window.location.href="/FlightSearch"}
                        hasFooter={false}
                        hasHeader={false}
                        width={500}
                      >
                        <div id="timer">
                          <p id="Ptimer">Maybe now the price of Tickets has been changed in this Time</p>
                          <img alt='img' src={Time} width="100%" />
                          <div className="text-center" id="timerbtn">
                            <NavLink className="link-container" to="/FlightSearch">

                              <span id="searchAginespan">Search Again </span>
                            </NavLink>
                          </div>

                        </div>
                      </Dialog>
                    </Pane>
                  )}
                </Component>
              </div>
            )
          } else if (this.state.pageState === "loading") {
            return (

              <div id="loadingDiv">
                <Row>
                  <img alt='img' id="laoding" src={Loding} />
                </Row>
                <Row style={{ marginRight: 0 + "px" }}>
                  <Col md={{ span: 8, offset: 4 }}>
                    <Alert id="loadingCard" variant="success">
                      Finding Cheapest Flights Please Wait
                     <img src={Giphy} width="80px" alt='img' />
                    </Alert>
                  </Col>

                </Row>


              </div>
            )

          } else if (this.state.pageState === "404") {
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
                          <NavLink id="searchAgine" to="/FlightSearch">
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