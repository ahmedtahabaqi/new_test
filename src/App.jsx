
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Context from "./component/context";
import Dashbord from "./component/admin/Dashbord";
import Flightlsit from "./component/flighList";
import FlightSearch from "./component/flight";
import Home from "./component/home";
import Pay from "./component/pay";
import Profile from "./component/profile";
import Clients from "./component/admin/Clients";
import axios from "axios";
import openSocket from 'socket.io-client';
import { toaster } from 'evergreen-ui'
import HotelsOrders from "./component/admin/HotelsOrders";
import completedOrders from "./component/admin/completedOrders";
import allTours from "./component/admin/allTours";
import addTours from "./component/admin/addTours";
import PayTours from "./component/payTours";
import allVisa from "./component/admin/allVisa";
import FlightOneWay from './component/flightOneWay';
import addGroup from "./component/admin/addGroup";
import allGroups from "./component/admin/allGroups";
import GroupsOrders from "./component/admin/GroupsOrders";
import VisaCompleteOrder from "./component/admin/VisaCompleteOrder";
import ToursCompletedOrders from "./component/admin/ToursCompletedOrders";
import EditVisa from "./component/admin/editVisa";
import EditTours from "./component/admin/editToues";
import Chat from "./component/admin/chat";
import Invoice from "./component/invoice";
import groupPay from "./component/groupPay";
import HotelList from "./component/hotelList";
import TourOrders from "./component/admin/TourOrders";
import TicketPDF from "./component/ticketPDF";
import TourList from "./component/Tourslist";
import Visa from "./component/Visa";
import TestFrom from "./component/test";
import OffersList from "./component/offers";
import Cookies from "universal-cookie";
import VisaOrders from "./component/admin/visaOrders";
import AddHotel from "./component/admin/addHotel";
import allHotels from "./component/admin/allHotels";
import FindHotel from "./component/HotelSearch";
import GoupList from "./component/GoupList";
import Login from "./component/login";
import TourSingel from "./component/tours";
import host from "./assets/js/host";
import mp3 from "./assets/mp3/to-the-point.mp3";
import mp32 from "./assets/mp3/stairs.mp3";
const hostsocket = `https://www.favorite-holiday.com/`;
var io = openSocket.connect(
  hostsocket,
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
  }
);
io.on("disconnect", () => {
  toaster.danger("Server Connection Lost");
});
io.on("connect", () => {
});
io.on("reconnect_attempt", attemptNumber => {
  toaster.warning("Attempting To Reconnect To Server " + attemptNumber);
});
const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      OrdersOneWay: [],
      Orders: [],
      HotelsOrders: [],
      TourOrders: [],
      VisaCompleteOrder: [],
      ToursOrdersCompleted: [],
      GroupsOrders: [],
      GustOrderOneWay: [],
      GustOrderTwoWay: [],
      UnsortedFlightSearch: [],
      VisaOrders: [],
      allHotels: [],
      ListOFTour: [],
      ListOFGroups: [],
      VisaOFList: [],
      completedOrders: [],
      sortState: '',
      trip: "Oneway",
      pageState: "data",
      Tecket: [],
      Airlines: [],
      AirlinesUnF: [],
      AirLinesReturn: [],
      AirLinesReturnUnf: [],
      MaxPrice: 0,
      MinPice: 0,
      auth: '',
      TotalDEBTS: '',
      Totalpayed: '',
      Totalnotpayed: '',
      numberofGuestsOrders: '',
      sesson: [],
      Users: [],
      chatUsers: [],
      UserChat: [],
      User_idChat: []
    }
    this.SocketData();
  }
  play() {
    var audio = new Audio(mp3);
    audio.play();
  }
  chat() {
    var audio2 = new Audio(mp32);
    audio2.play();
  }
  componentDidMount() {
    if (cookies.get("token")) {
      var headers = {
        "Content-Type": "application/json",
        token: cookies.get("token")
      };
      axios({
        url: host + `api/user/checklogin`,
        method: "GET",
        headers: headers
      })
        .then(response => {
          if (response.data) {
            this.setState({
              auth: "login",
              sesson: response.data.sesson
            })
            if (response.data.sesson.role === 1) {
              this.AdminData()
            }
          } else {
            this.setState({
              auth: "notLogin",
            })
          }
        })
        .catch(function (error) {
        });
    }
  }
  AdminData(item) {
    console.log(item)
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    axios({
      url: host + `api/Messages/users`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        console.log(response.data)
        this.setState({
          chatUsers: response.data
        })
      })
      .catch(function (error) {
      });
    if (item) {
      axios({
        url: host + `api/Messages/admin/${item}`,
        method: "GET",
        headers: headers
      })
        .then(response => {
          console.log(response.data)
          this.setState({
            UserChat: response.data
          })
        })
        .catch(function (error) {
        });
    }
    axios({
      url: host + `api/orders/`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data) {
          const result = response.data.filter(sort => sort.type === "flight-Oneway");
          const OrdersRoundtrip = response.data.filter(sort => sort.type === "flight-Roundtrip");
          const HotelsOrders = response.data.filter(sort => sort.type === "Hotel");
          const ToursOrders = response.data.filter(sort => sort.type === "Tours");
          const VisaOrders = response.data.filter(sort => sort.type === "visa");
          const GroupsOrders = response.data.filter(sort => sort.type === "Group");
          this.setState({
            OrdersOneWay: result,
            Orders: OrdersRoundtrip,
            HotelsOrders: HotelsOrders,
            TourOrders: ToursOrders,
            VisaOrders: VisaOrders,
            GroupsOrders: GroupsOrders
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/orders/completedOrders`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data) {
          const ToursOrders = response.data.filter(sort => sort.type === "Tours");
          const VisaOrders = response.data.filter(sort => sort.type === "visa");
          this.setState({
            completedOrders: response.data,
            ToursOrdersCompleted: ToursOrders,
            VisaCompleteOrder: VisaOrders,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/holet/`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data) {
          this.setState({
            allHotels: response.data,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/Group/all`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          this.setState({
            ListOFGroups: response.data,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/Tours/all`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {

          this.setState({
            ListOFTour: response.data,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/visa/all`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data) {
          this.setState({
            VisaOFList: response.data,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/user/all`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          this.setState({
            Users: response.data,

          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/user/admininfo`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data[0]) {
          this.setState({
            TotalDEBTS: response.data[0].totalDEBTS,
          })
        }
      })
      .catch(function (error) {
      });
    axios({
      url: host + `api/user/admininfo/payedNumber`,
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.data) {
          this.setState({
            Totalpayed: response.data,
          })
        }
      })
      .catch(function (error) {

      });
    axios({
      url: host + `api/user/admininfo/notpayedNumber`,
      method: "GET",
      headers: headers
    })
      .then(response => {

        if (response.data) {

          this.setState({
            Totalnotpayed: response.data,

          })
        }

      })
      .catch(function (error) {

      });


    axios({
      url: host + `api/user/admininfo/geustorders`,
      method: "GET",
      headers: headers
    })
      .then(response => {

        if (response.data) {

          this.setState({
            numberofGuestsOrders: response.data,
          })
        }

      })
      .catch(function (error) {

      });



  }





  SocketData() {
    io.on("adminSound", data => {
      if (this.state.sesson.role === 1) {
        this.play()
        toaster.warning("Received new order");
        this.componentDidMount()
      }
      console.log(data)
    });
    io.on("chat", data => {
      if (this.state.sesson.role === 1) {
        this.chat()
        toaster.warning("Received new message");
        this.componentDidMount()
      }
      console.log(data)
    });
  }
  render() {
    return (
      <BrowserRouter >
        <Context.Provider
          value={
            {
              value: this.state,
              actions: {
                item: item => {
                  var sort = this.state.UnsortedFlightSearch;
                  var aa = [];
                  sort.sort(function (a, b) {
                    var fileA = parseInt(a.price);
                    var fileb = parseInt(b.price);
                    return fileA >= item.max ? aa.push(a) : fileb <= item.min ? 1 : aa.push(b);
                  });
                  this.setState({
                    FlightSearch: aa
                  })
                },
                CompanyPay: (PassPort) => {
                  var parameters = localStorage.getItem('itemStored');
                  var type = localStorage.getItem('flight-type').valueOf();
                  type = JSON.parse(type);
                  let formData = new FormData();
                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };

                  formData.append("file", PassPort);
                  formData.append("money", 'false');
                  formData.append("Data", parameters);
                  formData.append("type", type);
                  axios({
                    url: host + `api/orders/add`,
                    method: "POST",
                    data: formData,
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        localStorage.setItem('Invoice', JSON.stringify(response.data[1].Invoice));
                        localStorage.removeItem('itemStored');
                        localStorage.removeItem('flight-type');
                        window.location.href = "/Invoice";
                      }
                    })
                    .catch(function (error) {
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });
                },
                pay: (token, Name, Email, PhoneNumber, Country, PassPort) => {
                  if (this.state.auth === "login") {
                    var parameters = localStorage.getItem('itemStored');
                    var type = localStorage.getItem('flight-type').valueOf();
                    type = JSON.parse(type);
                    let formData = new FormData();
                    var headers = {
                      "Content-Type": "application/json",
                      token: cookies.get("token")
                    };
                    formData.append("stripeToken", token.id);
                    formData.append("file", PassPort);
                    formData.append("Data", parameters);
                    formData.append("money", 'true');
                    formData.append("type", type);
                    axios({
                      url: host + `api/orders/add`,
                      method: "POST",
                      data: formData,
                      headers: headers
                    })
                      .then(response => {
                        if (response.status === 200) {
                          toaster.success(`Payment Successful Please Check Your Email For Ticket`);
                          localStorage.setItem('Invoice', JSON.stringify(response.data[1].Invoice));
                          localStorage.removeItem('itemStored');
                          localStorage.removeItem('flight-type');
                          window.location.href = "/Invoice";
                        }
                      })
                      .catch(function (error) {

                        if (error.request.response) {
                          toaster.danger(error.request.response);
                        }
                      });
                  } else {

                    type = JSON.parse(type);
                    let formData = new FormData();

              
                    formData.append("stripeToken", token.id);
                    formData.append("Name", Name);
                    formData.append("Email", Email);
                    formData.append("PhoneNumber", PhoneNumber);
                    formData.append("Country", Country);
                    formData.append("file", PassPort);
                    formData.append("Data", parameters);
                    formData.append("type", type);
                    axios({
                      url: host + `api/orders/Gust/add`,
                      method: "POST",
                      data: formData,
                      headers: headers
                    })
                      .then(response => {


                        if (response.status === 200) {
                          toaster.success(`Payment Successful Please Check Your Email For Ticket`);
                          localStorage.setItem('Invoice', JSON.stringify(response.data[2].Invoice));
                          localStorage.removeItem('itemStored');
                          localStorage.removeItem('flight-type');
                          window.location.href = "/Invoice";
                        }
                      })
                      .catch(function (error) {
                      });
                  }
                },
                AddNewClient: (Name, Password, PhoneNumber, Country, Email) => {
                  let formData = new FormData();
                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  formData.append("name", Name);
                  formData.append("password", Password);
                  formData.append("phone", PhoneNumber);
                  formData.append("Country", Country);
                  formData.append("email", Email);
                  axios({
                    url: host + `api/user/register`,
                    method: "POST",
                    data: formData,
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        toaster.success(`Client has been Successful `);
                      }
                    })
                    .catch(function (error) {
                      if (error.request.response) {
                        toaster.danger('Error: There is Empty fields Or Email is already in use');
                      }
                    });
                },
                Done: (item) => {
                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  axios({
                    url: host + `api/orders/buy/${item._id}`,
                    method: "POST",
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        toaster.success(`Successful `);
                      }
                      this.componentDidMount()
                    })
                    .catch(function (error) {
                      console.log(error)
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });
                },
                DeleteHotel: (item) => {
                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  axios({
                    url: host + `api/holet/delete/${item._id}`,
                    method: "POST",
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        toaster.success(`Successful `);
                        this.componentDidMount()
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });

                },
                DeleteTours: (item) => {

                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  axios({
                    url: host + `api/Tours/delete/${item._id}`,
                    method: "POST",
                    headers: headers
                  })
                    .then(response => {


                      if (response.status === 200) {
                        toaster.success(`Successful `);
                        this.componentDidMount()

                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });

                },
                DeleteVisa: (item) => {

                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  axios({
                    url: host + `api/visa/delete/${item._id}`,
                    method: "POST",
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        toaster.success(`Successful `);
                        this.componentDidMount()

                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });
                },
                DeleteGroup: (item) => {

                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  axios({
                    url: host + `api/Group/delete/${item._id}`,
                    method: "POST",
                    headers: headers
                  })
                    .then(response => {
                      if (response.status === 200) {
                        toaster.success(`Successful `);
                        this.componentDidMount()
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                      if (error.request.response) {
                        toaster.danger(error.request.response);
                      }
                    });
                },
                chatUsers: (item) => {
                  this.setState({
                    UserChat: [],
                    User_idChat: item
                  })
                  this.AdminData(item)
                },
                sendmsg: (value) => {
                  let formData = new FormData();
                  var headers = {
                    "Content-Type": "application/json",
                    token: cookies.get("token")
                  };
                  formData.append("to", this.state.User_idChat);
                  formData.append("body", value);;
                  axios({
                    url: host + `api/Messages/add`,
                    method: "POST",
                    data: formData,
                    headers: headers
                  })
                    .then(response => {
                      let Orders = [...this.state.UserChat, response.data];
                      this.setState({
                        UserChat: Orders
                      })
                    })
                    .catch(function (error) {
                      console.log(error)
                    });
                },
              }
            }
          }
        >
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashbord} />
          <Route path="/flightlist" component={Flightlsit} />
          <Route path="/Pay" component={Pay} />
          <Route path="/HotelsOrders" component={HotelsOrders} />
          <Route path="/TourOrders" component={TourOrders} />
          <Route path="/Clients" component={Clients} />
          <Route path="/Invoice" component={Invoice} />
          <Route path="/FlightSearch" component={FlightSearch} />
          <Route path="/HotelList" component={HotelList} />
          <Route path="/TourList" component={TourList} />
          <Route path="/Tickets" component={TicketPDF} />
          <Route path="/Visa" component={Visa} />
          <Route path="/AddHotel" component={AddHotel} />
          <Route path="/findHotel" component={FindHotel} />
          <Route path="/profile" component={Profile} />
          <Route path="/visaOrders" component={VisaOrders} />
          <Route path="/allHotels" component={allHotels} />
          <Route path="/allTours" component={allTours} />
          <Route path="/allVisa" component={allVisa} />
          <Route path="/completedOrders" component={completedOrders} />
          <Route path="/PayTours" component={PayTours} />
          <Route path="/addTours" component={addTours} />
          <Route path="/addGroup" component={addGroup} />
          <Route path="/Groups" component={GoupList} />
          <Route path="/groupPay" component={groupPay} />
          <Route path="/allGroups" component={allGroups} />
          <Route path="/GroupsOrders" component={GroupsOrders} />
          <Route path="/VisaCompleteOrder" component={VisaCompleteOrder} />
          <Route path="/ToursCompletedOrders" component={ToursCompletedOrders} />
          <Route path="/EditTours" component={EditTours} />
          <Route path="/EditVisa" component={EditVisa} />
          <Route path="/login" component={Login} />
          <Route path="/Chat" component={Chat} />
          <Route path="/Offers" component={OffersList} />
          <Route path="/tour" component={TourSingel} />
          <Route path="/testF" component={TestFrom} />
          <Route path="/flightoneway" component={FlightOneWay} />
        </Context.Provider>
      </BrowserRouter>
    );
  }
}

export default App;




