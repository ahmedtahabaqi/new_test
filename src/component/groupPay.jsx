import React from "react";
import Context from "./context.js";
import { Col, Row, Form, Alert } from 'react-bootstrap';
import { FilePicker, Button, toaster, CornerDialog } from 'evergreen-ui'
import Component from "@reactions/component";
import NavBar from "./NavBar";
import axios from "axios";
import Cookies from "universal-cookie";
import host from "../assets/js/host";

const cookies = new Cookies();

var PassPort = "";

class groupPay extends React.Component {
  constructor() {
    super();
    this.displayDataAdt = [];
    this.displayDataChild = [];

    this.displayDataInfant = [];

    this.state = {
      Email: '',
      Country: '',
      Name: '',
      PhoneNumber: '',
      data: [],
      price: '',
      Type: '',
      checked: true,
      Password: "",
      Adtdata: this.displayDataAdt,
      Childdata: this.displayDataChild,
      Infantdata: this.displayDataInfant,
      files: [],
      PhotoScanAdt: [],
      othersAdt: [],
      othersAdtCheck: 0,
      filesChild: [],
      PhotoScanChl: [],
      othersChl: [],
      othersChlCheck: 0,
      filesInfant: [],
      PhotoScanInf: [],
      othersInf: [],
      othersInfCheck: 0,
      AdultsNumber: 0,
      ChildNumber: 0,
      InfantNumber: 0,
      order_id: '',

    };
  }
  onChangeCountry(value) {
    this.setState({
      Country: value
    })
    this.checkForm()
  }
  onChangePhoneNumber(value) {
    this.setState({
      PhoneNumber: value
    })
    this.checkForm()
  }
  onChangeName(value) {
    this.setState({
      Name: value
    })
    this.checkForm()
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    })
    this.checkForm()
  }
  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    })

  }
  LogincheckForm() {
    if (PassPort !== "") {
      document.getElementById('payFrom2').style.display = "flex";

    }
  }
  checkForm() {

    if (this.state.Name !== "" && this.state.Email !== "" && this.state.PhoneNumber !== "" &&
      this.state.Country !== "" && PassPort !== "") {
      document.getElementById('payFrom').style.display = "flex";
      // document.getElementById('payFrom').style.display="flex";
    }
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
        // if (response.status === 200) {
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
  PaymentCheck(e) {
    this.setState({
      checked: e.target.checked
    })
    if (e.target.checked === false) {
      document.getElementById('StripeCheckout').style.display = "none"
      document.getElementById('PayLater').style.display = "block"

    } else {
      document.getElementById('PayLater').style.display = "none"
      document.getElementById('StripeCheckout').style.display = "block"

    }

  }
  componentDidMount() {
    var AdultsNumber = 0
    var headers = {
      "Content-Type": "application/json",
      order: cookies.get("orderToken")
    };
    axios({
      url: host + `api/incomplete/`,
      method: "GET",
      headers: headers
    })
      .then(response => {

        AdultsNumber = response.data.order.Adults
        this.setState({
          AdultsNumber: response.data.order.Adults,
          ChildNumber: response.data.order.Child,
          InfantNumber: response.data.order.Infant,
          data: response.data.order.Data[0],
          price: response.data.order.price,
          Type: response.data.order.type,
          order_id: response.data.order._id
        })
        this.html(AdultsNumber)



      })
      .catch(function (error) {

      });


  }

  html(value) {
    let html = []
    for (let index = 0; index < this.state.AdultsNumber; index++) {
      html.push(
        <div id="YourID" key={index}>
          <h4>Adult {index + 1}</h4>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" id={"adlFirstName" + index} placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" id={"adlLastName" + index} placeholder="Last Name" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport No.</Form.Label>
              <Form.Control type="text" id={"adlPassportNo" + index} placeholder="Passport Number" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" id={"adlNationality" + index} placeholder="Nationality" />
            </Form.Group>

          </Form.Row>
          <Form.Row>

            <Form.Group as={Col} >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" id={"adlDateofBirth" + index} placeholder="Date of Birth" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport Issue Date</Form.Label>
              <Form.Control type="date" id={"adlPassportIssueDate" + index} placeholder="Passport Issue Date" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport Expiry Date</Form.Label>
              <Form.Control type="date" id={"adlPassportExpiryDate" + index} placeholder="Passport Expiry Date" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}  >
              <Form.Label>Passport Scan </Form.Label>
              <FilePicker
                width={"25%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }

                  let file = [...this.state.files, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    files: uniqueOrders,

                  })
                }}

              />
            </Form.Group>

            <Form.Group as={Col}  >
              <Form.Label>Photo Scan</Form.Label>
              <FilePicker
                width={"25%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }
                  let file = [...this.state.PhotoScanAdt, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    PhotoScanAdt: uniqueOrders
                  })
                }}

              />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Others</Form.Label>
              <FilePicker
                width={"25%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }
                  let file = [...this.state.othersAdt, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    othersAdt: uniqueOrders,
                    othersAdtCheck: 1,
                  })
                }}

              />
            </Form.Group>
          </Form.Row>
          <hr></hr>
        </div>
      );


    }

    this.displayDataAdt = html;
    this.setState({
      Adtdata: this.displayDataAdt,
    });




    let htmlcld = []
    for (let index = 0; index < this.state.ChildNumber; index++) {
      htmlcld.push(
        <div id="YourID" key={index}>
          <h4>Child {index + 1}</h4>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" id={"ChildFirstName" + index} placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" id={"ChildLastName" + index} placeholder="Last Name" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport No.</Form.Label>
              <Form.Control type="text" id={"ChildPassportNo" + index} placeholder="Passport Number" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" id={"ChildNationality" + index} placeholder="Nationality" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" id={"ChildDateofBirth" + index} placeholder="Date of Birth" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport Issue Date</Form.Label>
              <Form.Control type="date" id={"ChildPassportIssueDate" + index} placeholder="Passport Issue Date" />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Passport Expiry Date</Form.Label>
              <Form.Control type="date" id={"ChildPassportExpiryDate" + index} placeholder="Passport Expiry Date" />
            </Form.Group>
          </Form.Row>
          <Form.Row>

            <Form.Group as={Col}  >
              <Form.Label>Passport Scan </Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }

                  let file = [...this.state.filesChild, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    filesChild: uniqueOrders
                  })
                }}

              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Photo Scan </Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }

                  let file = [...this.state.PhotoScanChl, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    PhotoScanChl: uniqueOrders
                  })
                }}

              />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Others</Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }

                  let file = [...this.state.othersChl, obj];
                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);
                  this.setState({
                    othersChl: uniqueOrders,
                    othersChlCheck: 1,
                  })
                }}

              />
            </Form.Group>
          </Form.Row>
          <hr></hr>
        </div>
      );


    }

    this.displayDataChild = htmlcld;
    this.setState({
      Childdata: this.displayDataChild,
    });



    let htmlInfant = []
    for (let index = 0; index < this.state.InfantNumber; index++) {
      htmlInfant.push(
        <div id="YourID" key={index}>
          <h4>Infant {index + 1}</h4>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" id={"InfantFirstName" + index} placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" id={"InfantLastName" + index} placeholder="Last Name" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport No.</Form.Label>
              <Form.Control type="text" id={"InfantPassportNo" + index} placeholder="Passport Number" />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" id={"InfantNationality" + index} placeholder="Nationality" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" id={"InfantDateofBirth" + index} placeholder="Date of Birth" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Passport Issue Date</Form.Label>
              <Form.Control type="date" id={"InfantPassportIssueDate" + index} placeholder="Passport Issue Date" />
            </Form.Group>


            <Form.Group as={Col} >
              <Form.Label>Passport Expiry Date</Form.Label>
              <Form.Control type="date" id={"InfantPassportExpiryDate" + index} placeholder="Passport Expiry Date" />
            </Form.Group>
          </Form.Row>


          <Form.Row>
            <Form.Group as={Col}  >
              <Form.Label>Passport Scan </Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }
                  let file = [...this.state.filesInfant, obj];

                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  this.setState({
                    filesInfant: uniqueOrders
                  })
                }}

              />
            </Form.Group>

            <Form.Group as={Col}  >
              <Form.Label>Photo Scan</Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }
                  let file = [...this.state.PhotoScanInf, obj];

                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  this.setState({
                    PhotoScanInf: uniqueOrders
                  })
                }}

              />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Others</Form.Label>
              <FilePicker
                width={"30%"}
                height={36}
                onChange={files => {
                  let obj = {
                    id: index,
                    files: files[0]
                  }
                  let file = [...this.state.othersInf, obj];

                  var uniqueOrders = file.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id)) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  this.setState({
                    othersInf: uniqueOrders,
                    othersInfCheck: 1,
                  })
                }}

              />
            </Form.Group>

          </Form.Row>
          <hr></hr>
        </div>

      );


    }

    this.displayDataInfant = htmlInfant;
    this.setState({
      Infantdata: this.displayDataInfant,
    });




  }

  submit() {

    let Adults = [];

    let formData = new FormData();
    if (this.state.AdultsNumber !== this.state.files.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }

    if (this.state.AdultsNumber !== this.state.PhotoScanAdt.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }
    if (this.state.InfantNumber !== this.state.PhotoScanInf.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }
    if (this.state.ChildNumber !== this.state.PhotoScanChl.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }
    if (this.state.ChildNumber !== this.state.filesChild.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }
    if (this.state.InfantNumber !== this.state.filesInfant.length) {
      toaster.danger(
        'Please Fill All The Fields'
      )
      return -1;
    }
    for (let index = 0; index < this.state.AdultsNumber; index++) {
      let FirstName = document.getElementById("adlFirstName" + index).value;
      let LastName = document.getElementById("adlLastName" + index).value;
      let PassportIssueDate = document.getElementById("adlPassportIssueDate" + index).value;
      let PassportExpiryDate = document.getElementById("adlPassportExpiryDate" + index).value;
      let PassportNo = document.getElementById("adlPassportNo" + index).value;

      let Nationality = document.getElementById("adlNationality" + index).value;
      let adlDateofBirth = document.getElementById("adlDateofBirth" + index).value;

      if (Nationality === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (adlDateofBirth === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (LastName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportIssueDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportExpiryDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }


      formData.append('Adultfiles' + index, this.state.files[index].files);
      formData.append('AdultPhoto' + index, this.state.PhotoScanAdt[index].files);
      if (this.state.othersAdtCheck !== 0) {
        formData.append('AdultOther' + index, this.state.othersAdt[index].files);

      }

      let obj = {
        FirstName: FirstName,
        LastName: LastName,
        PassportIssueDate: PassportIssueDate,
        PassportExpiryDate: PassportExpiryDate,
        PassportNo: PassportNo,
        Nationality: Nationality,
        adlDateofBirth: adlDateofBirth
      }

      Adults.push(obj)

    }
    let Child = [];
    for (let index = 0; index < this.state.ChildNumber; index++) {
      let FirstName = document.getElementById("ChildFirstName" + index).value;
      let LastName = document.getElementById("ChildLastName" + index).value;
      let PassportIssueDate = document.getElementById("ChildPassportIssueDate" + index).value;
      let PassportExpiryDate = document.getElementById("ChildPassportExpiryDate" + index).value;
      let PassportNo = document.getElementById("ChildPassportNo" + index).value;
      let ChildNationality = document.getElementById("ChildNationality" + index).value;
      let ChildDateofBirth = document.getElementById("ChildDateofBirth" + index).value;


      if (ChildNationality === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (ChildDateofBirth === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (LastName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportIssueDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportExpiryDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      formData.append('Childfiles' + index, this.state.filesChild[index].files);

      formData.append('ChildPhoto' + index, this.state.PhotoScanChl[index].files);
      if (this.state.othersChlCheck !== 0) {
        formData.append('ChildOther' + index, this.state.othersChl[index].files);
      }

      let obj = {
        FirstName: FirstName,
        LastName: LastName,
        PassportIssueDate: PassportIssueDate,
        PassportExpiryDate: PassportExpiryDate,
        PassportNo: PassportNo,
        ChildNationality: ChildNationality,
        ChildDateofBirth: ChildDateofBirth
      }

      Child.push(obj)

    }

    let Infant = [];
    for (let index = 0; index < this.state.InfantNumber; index++) {
      let FirstName = document.getElementById("InfantFirstName" + index).value;
      let LastName = document.getElementById("InfantLastName" + index).value;
      let PassportIssueDate = document.getElementById("InfantPassportIssueDate" + index).value;
      let PassportExpiryDate = document.getElementById("InfantPassportExpiryDate" + index).value;
      let PassportNo = document.getElementById("InfantPassportNo" + index).value;
      let InfantNationality = document.getElementById("InfantNationality" + index).value;
      let InfantDateofBirth = document.getElementById("InfantDateofBirth" + index).value;

      if (InfantDateofBirth === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (InfantNationality === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }

      if (LastName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportIssueDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (PassportExpiryDate === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }
      if (FirstName === "") {
        toaster.danger(
          'Please Fill All The Fields'
        )
        return -1;
      }


      formData.append('Infantfiles' + index, this.state.filesInfant[index].files);
      formData.append('InfantPhoto' + index, this.state.PhotoScanInf[index].files);
      if (this.state.othersInfCheck !== 0) {
        formData.append('InfantOther' + index, this.state.othersInf[index].files);

      }

      let obj = {
        FirstName: FirstName,
        LastName: LastName,
        PassportIssueDate: PassportIssueDate,
        PassportExpiryDate: PassportExpiryDate,
        PassportNo: PassportNo,
        InfantNationality: InfantNationality,
        InfantDateofBirth: InfantDateofBirth
      }

      Infant.push(obj)

    }
    // var Adults=JSON.stringify(Adults);


    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };

    // formData.append("type", 'Tours');
    formData.append('AdultsData', JSON.stringify(Adults));
    formData.append('ChildData', JSON.stringify(Child));
    formData.append('InfantData', JSON.stringify(Infant));
    formData.append('data', JSON.stringify(this.state.data));
    formData.append('AdultsNumber', this.state.AdultsNumber);
    formData.append('ChildNumber', this.state.ChildNumber);
    formData.append('InfantNumber', this.state.InfantNumber);
    formData.append('price', this.state.price);
    formData.append('Type', this.state.Type);
    formData.append('order_id', this.state.order_id);

    // 
    // formData.append("data", items);
    // formData.append("Adults", adtNumber);
    // formData.append("Child", chldNumber);
    // formData.append("Infant", 0);


    axios({
      url: host + `api/incomplete/Group`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        if (response.status === 200) {
          cookies.remove("orderToken");
          window.location.href = "/Profile";
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
      <Context.Consumer>
        {ctx => {
          return (
            <div>
              <NavBar />
              <br />
              <br />
              <Row style={{ marginRight: 0 + "px" }}>
                <Col md={{ span: 6, offset: 3 }}>
                  <Alert id="alert-primary" variant="warning">
                    <Row>
                      <Col>
                        <h5><b>Reservation Type : {this.state.Type}</b></h5>
                        <h5><b>Total Price : {this.state.price}</b></h5>

                        <p style={ctx.value.auth === "login"
                          ? { display: "none" }
                          : {}}>Login Then you Can Sumit The Order</p>
                      </Col>
                      <div
                        style={ctx.value.auth === "login"
                          ? { display: "none" }
                          : {}}
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
                                    <Form.Control type="email" placeholder="Enter email" value={this.state.Email} onChange={(event) => {
                                      this.onEmailChange(event)
                                    }} />

                                  </Form.Group>

                                  <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={this.state.Password} onChange={(event) => {
                                      this.onPasswordChange(event)
                                    }} />
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
                    </Row>
                  </Alert>
                </Col>
              </Row>
              <Row style={{ marginRight: 0 + "px" }}>
                <Col md={{ span: 6, offset: 3 }}>
                  <div>

                    {this.displayDataAdt}

                    {this.displayDataChild}

                    {this.displayDataInfant}


                    <Button height={40} id="BuyHotel" marginRight={16} appearance="primary" iconBefore="endorsed" onClick={() => {
                      this.submit()
                    }}
                      style={ctx.value.auth === "login"
                        ? {}
                        : { display: "none" }}

                    >
                      Submit
        </Button>

                  </div>
                  <br></br>                              </Col>


              </Row>


            </div>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default groupPay;