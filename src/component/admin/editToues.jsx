import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../../component/context.js";

import { Col, Row, Form } from 'react-bootstrap';
import { FilePicker, toaster, Button } from 'evergreen-ui'
import Component from "@reactions/component";
import NavBar from "../../component/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../../assets/js/host";

import "react-datepicker/dist/react-datepicker.css";
import Home from "../home.jsx";

const cookies = new Cookies();
class editTours extends React.Component {
    constructor() {
        super();
        this.displayDataAdt = [];
        this.displayDataAdt2 = [];


        this.state = {
            ToursImg: [],
            Adtdata: this.displayDataAdt,
            Adtdata2: this.displayDataAdt2,
            dateNumber: 0,
            item: [],
            name: '',
            price: 0,
            priceCh: 0,
            priceINf: 0,
            city: '',
            body: '',
            Country: '',
            OldDateNumber: 0


        };

    }


    componentDidMount() {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('Tours');
        if (id) {
            var headers = {
                "Content-Type": "application/json",
                token: cookies.get("token")
            };
            axios({
                url: host + `api/Tours/find/${id}`,
                method: "GET",
                headers: headers
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data[0]) {
                        if (response.data[0].offers) {
                            document.getElementById('specialoffers').checked = true

                        }
                        this.setState({
                            item: response.data[0],
                            name: response.data[0].name,
                            price: response.data[0].price,
                            priceCh: response.data[0].priceCh,
                            priceINf: response.data[0].priceINf,
                            city: response.data[0].city,
                            body: response.data[0].body,
                            Country: response.data[0].Country,
                            OldDateNumber: response.data[0].Data.length
                        })

                        this.html(response.data[0].Data.length)
                    }

                })
                .catch(function (error) {

                });
        } else {
            window.location.href = "/allTours";
        }


    }

    html(value) {
        console.log(value)
        let html = []

        for (let index = 0; index < value; index++) {
            html.push(
                <Component initialState={{
                    ToursDate: this.state.item.Data[index].ToursDate,
                    ToursSets: this.state.item.Data[index].ToursSets

                }}>
                    {({ state, setState }) => (
                        <div id="TorusDateDiv" key={index}>
                            <br></br>
                            <Form.Row>
                                <Col md={{ offset: 3 }}>

                                    <Form.Label>Tours Date {index + 1}</Form.Label>

                                    <Form.Control type="date" value={state.ToursDate} id={"ToursDate" + index} onChange={(e) => {
                                        console.log(e.target.value)
                                        setState({
                                            ToursDate: e.target.value
                                        })
                                    }} />

                                </Col>
                                <Col>
                                    <Form.Label>Tours Seats </Form.Label>

                                    <Form.Control type="number" value={state.ToursSets} id={"ToursSets" + index} placeholder="Enter Number of seats" onChange={(e) => {
                                        console.log(e.target.value)
                                        setState({
                                            ToursSets: e.target.value
                                        })
                                    }} />


                                </Col>
                                <Col>


                                </Col>

                            </Form.Row>
                            <br></br>
                        </div>
                    )}
                </Component>
            );


        }

        this.displayDataAdt = html;
        this.setState({
            Adtdata: this.displayDataAdt,
        });
    }


    html2(value) {
        let html = []
        var numberOFDate = 1
        if (value) {
            numberOFDate = value

        }


        for (let index = 0; index < numberOFDate; index++) {
            html.push(
                <div id="TorusDateDiv" key={index}>
                    <br></br>
                    <Form.Row>
                        <Col md={{ offset: 3 }}>

                            <Form.Label>Tours Date {index + 1}</Form.Label>

                            <Form.Control type="date" id={"ToursDateNew" + index} />

                        </Col>
                        <Col>
                            <Form.Label>Tours Seats </Form.Label>

                            <Form.Control type="number" id={"ToursSetsNew" + index} placeholder="Enter Number of seats" />


                        </Col>
                        <Col>


                        </Col>

                    </Form.Row>
                    <br></br>
                </div>
            );


        }

        this.displayDataAdt2 = html;
        this.setState({
            Adtdata2: this.displayDataAdt2,
        });
    }

    DateInc(value) {
        if (value === "+") {
            let numberOfDate = this.state.dateNumber + 1

            this.setState({
                dateNumber: numberOfDate
            })
            // document.getElementById('dateValue').value= numberOfDate
            // document.getElementById('dateValue').value=numberOfDate;
            this.html2(numberOfDate)
        } else {
            if (this.state.dateNumber >= 1) {
                let numberOfDate = this.state.dateNumber - 1
                this.setState({
                    dateNumber: numberOfDate
                })
                this.html2(numberOfDate)
            }

        }
    }


    add() {
        let formData = new FormData();


        var ToursName = document.getElementById('ToursName2').value;

        var Toursprice = document.getElementById('Toursprice').value;
        var ToursCity = document.getElementById('ToursCity').value;
        var specialoffers = document.getElementById('specialoffers').checked
        var ToursChildprice = document.getElementById('ToursChildprice').value;
        var INFANTprice = document.getElementById('INFANTprice').value;
        var ToursDescription = document.getElementById('ToursDescription').value;
        var ToursCountry = document.getElementById('ToursCountry').value;
        var date = [];

        for (let index = 0; index < this.state.dateNumber; index++) {
            var ToursDate = document.getElementById("ToursDateNew" + index).value;
            var ToursSets = document.getElementById("ToursSetsNew" + index).value;
            if (ToursDate && ToursSets) {
                let obj = {
                    id: index,
                    ToursDate: ToursDate,
                    ToursSets: parseInt(ToursSets, 10)
                }
                date.push(obj);
            }
        }

        for (let index = 0; index < this.state.OldDateNumber; index++) {
            let ToursDate = document.getElementById("ToursDate" + index).value;
            let ToursSets = document.getElementById("ToursSets" + index).value;
            if (ToursDate && ToursSets) {
                let obj = {
                    id: index,
                    ToursDate: ToursDate,
                    ToursSets: parseInt(ToursSets, 10)
                }
                date.push(obj);
            }
        }



        if (this.state.ToursImg.length !== 0) {
            formData.append("file", this.state.ToursImg);
        } else {
            console.log(this.state.item.img)
            formData.append("file", this.state.item.img);
        }





        var headers = {
            "Content-Type": "application/json",
            token: cookies.get("token")
        };


        formData.append("name", ToursName);
        formData.append("price", Toursprice);
        formData.append("priceCh", ToursChildprice);
        formData.append("priceINf", INFANTprice);
        formData.append("body", ToursDescription);
        formData.append("Country", ToursCountry);
        formData.append("offers", specialoffers);
        formData.append("City", ToursCity);

        formData.append("Date", JSON.stringify(date));


        axios({
            url: host + `api/Tours/edit/${this.state.item._id}`,
            method: "POST",
            data: formData,
            headers: headers
        })
            .then(response => {

                // window.location.reload();
                if (response.status === 200) {
                    toaster.success('Tours has been Edit successfully');
                    window.location.href = "/allTours";
                }
            })
            .catch(function (error) {
                console.log(error.response.data)
                if (error.response) {
                    toaster.danger(error.response.data);
                }
            });


    }

    onChangeName(value) {
        this.setState({
            name: value
        })
    }

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (ctx.value.sesson.role === 1) {
                        return (
                            <div >
                                <div>
                                    <NavBar />
                                </div>
                                <br></br>
                                <br></br>
                                <Row style={{ marginRight: 0 + "px" }}>
                                    <Col md={{ span: 6, offset: 3 }}>
                                        <div>

                                            <Form.Group >
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label>Tours Name</Form.Label>
                                                        <Form.Control type="text" id="ToursName2" value={this.state.name} placeholder="Enter Tours Name" onChange={(e) => {
                                                            this.onChangeName(e.target.value)
                                                        }} />

                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Tours Price</Form.Label>
                                                        <Form.Control type="number" id="Toursprice" value={this.state.price} placeholder="Enter Price" onChange={(e) => {
                                                            this.setState({
                                                                price: e.target.value
                                                            })
                                                        }} />

                                                    </Col>
                                                    <Col>

                                                        <Form.Label>Child Price</Form.Label>
                                                        <Form.Control type="number" value={this.state.priceCh} id="ToursChildprice" placeholder="Enter Child Price"
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    priceCh: e.target.value
                                                                })
                                                            }} />

                                                    </Col>
                                                    <Col>

                                                        <Form.Label>INFANT  Price</Form.Label>
                                                        <Form.Control type="number" value={this.state.priceINf} id="INFANTprice" placeholder="Enter INFANT  Price"
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    priceINf: e.target.value
                                                                })
                                                            }} />

                                                    </Col>
                                                </Form.Row>

                                                <Form.Label>Tours Description</Form.Label>
                                                <Form.Control as="textarea" value={this.state.body} rows="2" id="ToursDescription" placeholder=" Description" onChange={(e) => {
                                                    this.setState({
                                                        body: e.target.value
                                                    })
                                                }} />
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label>Tours City</Form.Label>
                                                        <Form.Control type="text" id="ToursCity" placeholder="Enter Country" value={this.state.city} onChange={(e) => {
                                                            this.setState({
                                                                city: e.target.value
                                                            })
                                                        }} />
                                                    </Col>

                                                    <Col>
                                                        <Form.Label>Tours Country</Form.Label>
                                                        <Form.Control type="text" id="ToursCountry" placeholder="Enter Country" value={this.state.Country} onChange={(e) => {
                                                            this.setState({
                                                                Country: e.target.value
                                                            })
                                                        }} />
                                                    </Col>
                                                </Form.Row>
                                                <br></br>


                                                <div >
                                                    {this.displayDataAdt}

                                                </div>
                                                <hr></hr>
                                                <center><h5>Inster New Dates</h5></center>

                                                <div className="input-group text-center">


                                                    <input type="button" value="-" className="button-minus" data-field="quantitychld"
                                                        onClick={() => {
                                                            this.DateInc('-')

                                                        }}
                                                    />
                                                    <input type="number" step="1" max="" value="" id="dateValue" name="quantitychld" className="quantity-field" disabled />
                                                    <input type="button" value="+" className="button-plus" data-field="quantitychld"
                                                        onClick={() => {
                                                            this.DateInc('+')

                                                        }} />
                                                </div>

                                                <div>

                                                    {this.displayDataAdt2}
                                                </div>

                                                <br></br>
                                                <Form.Check
                                                    custom
                                                    type={'checkbox'}
                                                    id={`specialoffers`}
                                                    label={`On Special Offers?`}
                                                />
                                                <br></br>
                                                <Form.Label>Tours Picture</Form.Label>

                                                <FilePicker
                                                    multiple
                                                    width={'30%'}
                                                    marginBottom={32}
                                                    onChange={files => {
                                                        this.setState({
                                                            ToursImg: files[0]
                                                        })

                                                    }}
                                                />

                                            </Form.Group>
                                            <NavLink to="/dashboard">
                                                <Button id="BuyHotelBack" height={40} iconAfter="arrow-left" >
                                                    Dashboard
        </Button>
                                            </NavLink>

                                            <Button id="BuyHotel" marginLeft={16} height={40} iconAfter="edit" onClick={() => {
                                                this.add()
                                            }}>
                                                Edit Tours
        </Button>



                                        </div>

                                    </Col>
                                </Row>
                                <br></br>

                            </div>

                        )
                    } else {
                        return (
                            <Home />
                        )
                    }
                }}
            </Context.Consumer>
        );
    }
}

export default editTours;