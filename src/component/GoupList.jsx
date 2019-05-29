import React from "react";
import Context from "./context.js";
import { Col, Row, Form, Card, Alert, ListGroup } from 'react-bootstrap';
import { Pane, Dialog, toaster, Button } from 'evergreen-ui'
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import axios from "axios";
import NavBar from "./NavBar";
import host from "../assets/js/host";
const cookies = new Cookies();
class Grouplist extends React.Component {
  constructor() {
    super();
    this.displayDataAdt = [];
    this.state = {
      Email: '',
      Country: '',
      Countries: [],
      Adtdata: this.displayDataAdt,
      Name: '',
      Tourslist: [],
      TourslistUnsort: [],
      Password: '',
      PhoneNumber: '',
      RoundtripOrders: [],
      adtNumber: 1,
      OneWayOrders: [],
      ToursDate: '',
      ToursSets: 0,
      ToursSetsBuffer: 0,
      ChildrenSets: '',
      INFANTSets: '',
      Children: 0,
      NumberOfAdt: 1,
      Infant: 0,

    };
    //this.html()
  }




  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
    };
    axios({
      url: host + `api/Group/all`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {

          this.setState({
            Tourslist: response.data,
            TourslistUnsort: response.data,
          })
          let Country = [];
          for (let index = 0; index < response.data.length; index++) {
            Country.push(response.data[index].Country)

          }
          var unique = Country.filter((v, i, a) => a.indexOf(v) === i);
          this.setState({
            Countries: unique
          })


        }
      })
      .catch(function (error) {

      });
  }


  SortbyCountry(value) {
    if (value === "all") {
      this.setState({
        Tourslist: this.state.TourslistUnsort
      });
    } else {
      let sort = this.state.TourslistUnsort;
      const result = sort.filter(sort => sort.Country === value);
      this.setState({
        Tourslist: result
      });
    }

  }
  Sort(value) {

    if (value === "price") {

      let sort = this.state.Tourslist;
      sort.sort(function (a, b) {
        var fileA = a.price;
        var fileb = b.price;
        return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
      });

      this.setState({
        Tourslist: sort
      });
    }
    if (value === "uptime") {

      let sort = this.state.Tourslist;
      sort.sort(function (a, b) {
        var fileA = a.uptime;
        var fileb = b.uptime;
        return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
      });

      this.setState({
        Tourslist: sort
      });
    }


  }


  incAdult(id, item) {
    // var adtNumber=parseInt(document.getElementById(id+"adt").value, 10);






    if (this.state.ToursSets !== 0) {
      // document.getElementById(id+"adt").value=adtNumber+1
      let NumberOfAdt = this.state.NumberOfAdt + 1;
      let ToursSets = this.state.ToursSets - 1

      // if (this.state.NumberOfAdt===1) {
      //   TadtNumber=value+singelPrice
      // document.getElementById(id+"tPrice").textContent= singelPrice

      // } else {
      //   TadtNumber=value+price
      // document.getElementById(id+"tPrice").textContent= (this.state.NumberOfAdt+1)*price

      // }



      this.setState({
        NumberOfAdt: NumberOfAdt,
        ToursSets: ToursSets
      })
      // var TadtNumber=value+price

      document.getElementById(id + "tPrice").textContent = NumberOfAdt * item.price

    }



  }

  desAdult(id, item) {
    if (this.state.NumberOfAdt > 1) {
      var value = parseInt(document.getElementById(id + "tPrice").innerText, 10);
      let NumberOfAdt = this.state.NumberOfAdt - 1;
      let ToursSets = this.state.ToursSets + 1
      if (NumberOfAdt === 1) {
        document.getElementById(id + "tPrice").textContent = item.priceSingle

      } else {
        var TadtNumber = value - item.price
        document.getElementById(id + "tPrice").textContent = TadtNumber

      }
      this.setState({
        NumberOfAdt: NumberOfAdt,
        ToursSets: ToursSets
      })


    }

  }



  incchld(id, item) {
    if (this.state.ToursSets !== 0) {
      var value = parseInt(document.getElementById(id + "tPrice").innerText, 10);
      let ChildrenNumber = this.state.Children + 1;
      let ToursSets = this.state.ToursSets - 1
      this.setState({
        Children: ChildrenNumber,
        ToursSets: ToursSets
      })
      var TadtNumber = value + item.priceCh
      document.getElementById(id + "tPrice").textContent = TadtNumber
    }
  }

  descchld(id, item) {

    if (this.state.Children > 0) {
      var value = parseInt(document.getElementById(id + "tPrice").innerText, 10);
      let ChildrenNumber = this.state.Children - 1;
      let ToursSets = this.state.ToursSets + 1
      this.setState({
        Children: ChildrenNumber,
        ToursSets: ToursSets
      })

      var TadtNumber = value - item.priceCh
      document.getElementById(id + "tPrice").textContent = TadtNumber
    }

  }


  inInfant(id, item) {
    if (this.state.ToursSets !== 0) {
      var value = parseInt(document.getElementById(id + "tPrice").innerText, 10);
      let InfantNumber = this.state.Infant + 1;
      // let ToursSets=this.state.ToursSets-0.5
      this.setState({
        Infant: InfantNumber,
      })
      var TadtNumber = value + item.priceINf
      document.getElementById(id + "tPrice").textContent = TadtNumber
    }
  }

  descInfant(id, item) {
    if (this.state.Infant > 0) {
      var value = parseInt(document.getElementById(id + "tPrice").innerText, 10);
      let InfantNumber = this.state.Infant - 1;
      // let ToursSets=this.state.ToursSets-0.5
      this.setState({
        Infant: InfantNumber,
      })
      var TadtNumber = value - item.priceINf
      document.getElementById(id + "tPrice").textContent = TadtNumber
    }
  }
  buy(id, item) {




    var setes = 0;
    if (this.state.NumberOfAdt === 1) {
      setes = this.state.ToursSets - 1
    } else {

      setes = this.state.ToursSets
    }

    let info = {
      ChildrenNumber: this.state.Children,
      InfantNumber: this.state.Infant,
      ADULTSNumber: this.state.NumberOfAdt,
      ToursDate: this.state.ToursDate,
      ToursSets: setes,

      // ToursId:item._id

    }
    let date = []
    for (let index = 0; index < item.Data.length; index++) {
      if (item.Data[index].ToursDate === this.state.ToursDate) {
        let obj = {
          id: item.Data[index].id,
          ToursDate: item.Data[index].ToursDate,
          ToursSets: setes
        }
        date.push(obj)
      } else {
        date.push(item.Data[index])
      }

    }


    let data = {
      Date: date,
      Item: item,
      info: info
    }

    var ADtPrice;
    if (this.state.NumberOfAdt === 1) {
      ADtPrice = item.priceSingle
    } else {
      ADtPrice = item.price * this.state.NumberOfAdt
    }
    let ChildrenPrice = item.priceCh * this.state.Children;
    let InfantPrice = item.priceINf * this.state.Infant;
    var TPrice = ADtPrice + ChildrenPrice + InfantPrice

    console.log(data)


    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      //  token: cookies.get("token")
    };

    formData.append("type", 'Group');
    formData.append("price", TPrice);
    formData.append("data", JSON.stringify(data));
    formData.append("Adults", this.state.NumberOfAdt);
    formData.append("Child", this.state.Children);
    formData.append("Infant", this.state.Infant);


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
        window.location.href = "/groupPay";

      })
      .catch(function (error) {
        console.log(error)
        if (error.request.response) {
          toaster.danger(error.request.response);
        }
      });

  }

  Info(e) {

    if (e.target.value !== "all") {
      this.setState({
        ToursDate: '',
        ChildrenSets: '',
        INFANTSets: '',
        Children: 0,
        NumberOfAdt: 1,
        Infant: 0,
      })
      let ToursDate = e.target.value.split("||")[0]
      let ToursSets = e.target.value.split("||")[1]
      // console.log(e.target.value)

      document.getElementById('btmBuyGroup').style.display = 'block'


      this.setState({
        ToursDate: ToursDate,
        ToursSets: parseInt(ToursSets, 10) - 1,
        ToursSetsBuffer: parseInt(ToursSets, 10),


      })
      document.getElementById('ToursPInfo').style.display = 'block'
      // console.log(ToursDate)
      // console.log(ToursSets)
      // console.log(ChildrenSets)
      // console.log(INFANTSets)
    }


  }




  render() {
    const listItems = this.state.Countries.map((number, i) =>

      <option key={i} value={number}>{number}</option>

      // <li><a>{number}</a></li>
    );
    return (
      <div>
        <Context.Consumer>
          {ctx => {
            return (
              <div width="100%">
                <NavBar />
                <br />
                <Row style={{ marginRight: 0 + "px" }} className="justify-content-md-center">
                  <Col md={{ span: 8, offset: 1 }}>


                    <Row style={{ marginRight: 0 + "px" }}>
                      {this.state.Tourslist.map((item, i) => (
                        <Col key={i} xs={12} sm={6} md={6} lg={4} xl={3}>
                          <div id="cardGroup">
                            <img id="cardToursImg" src={host + item.img} alt="Avatar" />
                            <div id="container">
                              <Card.Title id="ToursName">{item.name}</Card.Title>




                              <div className="text-letf">


                              </div>
                              <div className="text-center">
                                <hr id="HrDivider"></hr>
                                <span id="cardBody">
                                  {item.body}

                                </span>
                                <hr id="HrDivider"></hr>
                                <div>
                                  <i style={item.opt[0].Hotel ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-hotel"></i>
                                  <i style={item.opt[0].Hotel ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-hotel"></i>
                                  <i style={item.opt[0].food ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-utensils"></i>
                                  <i style={item.opt[0].food ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-utensils"></i>

                                  <i style={item.opt[0].Flight ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-plane-departure"></i>
                                  <i style={item.opt[0].Flight ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-plane-departure"></i>

                                  <i style={item.opt[0].Visa ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-map-marked-alt"></i>
                                  <i style={item.opt[0].Visa ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-map-marked-alt"></i>

                                  <i style={item.opt[0].Transport ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-bus-alt"></i>
                                  <i style={item.opt[0].Transport ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-bus-alt"></i>

                                  <i style={item.opt[0].TourismProgram ? {} : { display: "none" }} id="GroupsIcons" className="fas fa-atlas"></i>
                                  <i style={item.opt[0].TourismProgram ? { display: "none" } : {}} id="GroupsIconsFalse" className="fas fa-atlas"></i>
                                </div>
                                <hr id="HrDivider"></hr>
                                <Button marginBottom={10} id="ToursShowBtm" onClick={() => {
                                  window.open(host + item.pdf, '_blank');
                                }}>Tours Program</Button>
                                <Component initialState={{ isShown: false }}>
                                  {({ state, setState }) => (
                                    <Pane>
                                      <Dialog
                                        isShown={state.isShown}
                                        title={item.name}
                                        hasFooter={false}
                                        onCloseComplete={() => setState({ isShown: false })}
                                        confirmLabel="Custom Label"
                                      >
                                        {item.body}
                                      </Dialog>

                                      <Button id="ToursShowBtm" marginBottom={10} onClick={() => setState({ isShown: true })}>Read More</Button>
                                    </Pane>
                                  )}
                                </Component>

                                <Component initialState={{ isShown: false }}>
                                  {({ state, setState }) => (
                                    <Pane>
                                      <Dialog
                                        isShown={state.isShown}
                                        title={item.name}
                                        hasFooter={false}
                                        onCloseComplete={() => {
                                            this.setState({
                                            Children: 0
                                          })
                                          //   this.html(value)
                                          setState({ isShown: false })
                                        }}
                                        confirmLabel="Custom Label"
                                      >
                                        <Card id="CardTiket" body>
                                          <Alert id="infoRoomStars" variant="primary">

                                            <img id="HotelNameIcon" src={host + item.img} alt='img' />
                                            {item.name}





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
                                              <div className="text-center">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                  <Form.Label>Select Available Date</Form.Label>
                                                  <Form.Control as="select" onChange={(e) => {
                                                    this.Info(e)

                                                    // this.setState({
                                                    //   NumberOfsets
                                                    // })
                                                  }}>
                                                    <option value={'all'} defaultValue>Select Date</option>
                                                    {item.Data.map((date, i) => (
                                                      <option key={i} value={date.ToursDate + "||" + date.ToursSets + "||" + date.ChildrenSets + "||" + date.INFANTSets}>{date.ToursDate}</option>
                                                    ))}
                                                  </Form.Control>
                                                  <div>
                                                    <ListGroup id="itemToures">
                                                      <ListGroup.Item ><i id="toursIcons" className="fas fa-street-view"></i>ADULTS Price(+9) {item.price} $</ListGroup.Item>
                                                      <ListGroup.Item ><i id="toursIcons" className="fas fa-child"></i>Children(2-9) {item.priceCh} $</ListGroup.Item>
                                                      <ListGroup.Item ><i id="toursIcons" className="fas fa-baby"></i>INFANT Price(0-2) {item.priceINf} $</ListGroup.Item>

                                                    </ListGroup>
                                                  </div>
                                                </Form.Group>

                                                <div id="ToursPInfo">
                                                  <h5 ><b>Available Seats :</b> {this.state.ToursSets}</h5>
                                                  <hr></hr>
                                                  <h5 >Adult </h5>

                                                  <div className="input-group text-center">
                                                    <input type="button" value="-" className="button-minus" data-field="quantity" onClick={() => {
                                                      this.desAdult(i, item)
                                                    }}
                                                    />
                                                    <input type="number" step="1" id={i + "adt"} max="" value={this.state.NumberOfAdt} name="quantity" className="quantity-field" disabled />
                                                    <input type="button" value="+" onClick={() => {
                                                      this.incAdult(i, item)

                                                    }}
                                                      className="button-plus" data-field="quantity" />
                                                  </div>
                                                  <h5 >Child </h5>
                                                  <div className="input-group">
                                                    <input type="button" value="-" className="button-minus" data-field="quantitychld"
                                                      onClick={() => {
                                                        this.descchld(i, item)

                                                      }}
                                                    />
                                                    <input type="number" step="1" max="" value={this.state.Children} id={i + "chld"} name="quantitychld" className="quantity-field" disabled />
                                                    <input type="button" value="+" className="button-plus" data-field="quantitychld"
                                                      onClick={() => {
                                                        this.incchld(i, item)

                                                      }} />
                                                  </div>
                                                  <h5 >Infant </h5>
                                                  <div className="input-group">
                                                    <input type="button" value="-" className="button-minus" data-field="quantitychld"
                                                      onClick={() => {
                                                        this.descInfant(i, item)

                                                      }}
                                                    />
                                                    <input type="number" step="1" max="" value={this.state.Infant} id={i + "Infant"} name="quantitychld" className="quantity-field" disabled />
                                                    <input type="button" value="+" className="button-plus" data-field="quantitychld"
                                                      onClick={() => {
                                                        this.inInfant(i, item)

                                                      }} />
                                                  </div>
                                                </div>
                                                <Row>
                                                  {this.displayDataAdt}

                                                </Row>
                                              </div>
                                            </Col>
                                          </Row>
                                          <hr id="HrDivider" />
                                          <div id="btmBuyGroup" className="text-center">
                                            <Button id="ChooseaTourBuyBtn" iconAfter="shopping-cart" variant="primary"
                                              onClick={() => {
                                                this.buy(i, item)
                                              }}
                                            >BUY For <span className="spanTorusPrice" id={i + "tPrice"}>{item.priceSingle}</span></Button>
                                          </div>
                                        </Card>

                                      </Dialog>

                                      <Button id="ToursShowBtm" onClick={() => setState({ isShown: true })}>Show More</Button>
                                    </Pane>
                                  )}
                                </Component>

                              </div>
                            </div>
                          </div>

                        </Col>
                      ))}

                    </Row>




                    {/* </div> */}

                  </Col>
                  <Col md={{ span: 2, }}>
                    <Card style={{ marginTop: 15 + "px" }} >
                      <Card.Header id="CardResult">Results Found {this.state.Tourslist.length}</Card.Header>

                      <Card.Body>

                        <Card.Title>Filters</Card.Title>
                        <Form>
                          <Form.Group as={Row}>
                            <Col sm={10}>
                              <Form.Check
                                type="radio"
                                label="Recently Added"
                                onChange={(e) => {
                                  this.Sort(e.target.value)

                                }}
                                custom
                                value="uptime"
                                name="formHorizontalRadios"
                                id="Sort1"

                              />
                              <Form.Check
                                type="radio"
                                label="Lower Price"
                                custom
                                onChange={(e) => {
                                  this.Sort(e.target.value)
                                }}
                                value="price"
                                name="formHorizontalRadios"
                                id="Sort"

                              />
                              <br></br>

                              <Form.Label>Select  Country</Form.Label>
                              <Form.Control as="select" onChange={(e) => {
                                // console.log(e.target.value)
                                this.SortbyCountry(e.target.value)
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


              </div>
            )


          }}
        </Context.Consumer>
      </div>
    );
  }
}

export default Grouplist;