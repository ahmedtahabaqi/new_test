import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../../component/context.js";

import {  Col, Row ,Form} from 'react-bootstrap';
import {  FilePicker ,toaster,Button} from 'evergreen-ui'

import NavBar from "../../component/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../../assets/js/host";
 
import "react-datepicker/dist/react-datepicker.css";
import Home from "../home.jsx";

const cookies = new Cookies();
class AddHotel extends React.Component {
    constructor() {
        super();
    this.displayDataAdt = [];

        this.state = {
          ToursImg:[],
      Adtdata : this.displayDataAdt,
            dateNumber:1,
        };
        this.html()
    }




html(value){
    let html =[]
    var numberOFDate=1
    if (value) {
    numberOFDate=value
        
    }


    for (let index = 0; index <numberOFDate; index++) {
      html.push(
        <div id="TorusDateDiv" key={index}>
  <br></br>
        <Form.Row>
    <Col md={{ offset: 3 }}>

    <Form.Label>Tours Date {index+1}</Form.Label>

    <Form.Control type="date" id={"ToursDate"+index}  />
    
    </Col>
    <Col>
    <Form.Label>Tours Seats </Form.Label>

    <Form.Control type="number" id={"ToursSets"+index} placeholder="Enter Number of seats" />

    
    </Col>
    <Col>
    

    </Col>

</Form.Row>
<br></br>
        </div>
      );

      
    }

    this.displayDataAdt=html;
    this.setState({
       Adtdata : this.displayDataAdt,
    });
}
    
DateInc(value){
    if (value==="+") {
        let numberOfDate=this.state.dateNumber+1
        
        this.setState({
            dateNumber:numberOfDate    
        })
        // document.getElementById('dateValue').value= numberOfDate
        // document.getElementById('dateValue').value=numberOfDate;
        this.html(numberOfDate)
    }else{
        if (this.state.dateNumber>=1) {
            let numberOfDate=this.state.dateNumber-1
            this.setState({
                dateNumber:numberOfDate    
            })
            this.html(numberOfDate)    
        }
 
    }
}


add(){
 
    var ToursName =document.getElementById('NameofTours').value;
    var Toursprice =document.getElementById('Toursprice').value;
    var ToursChildprice =document.getElementById('ToursChildprice').value;
    var INFANTprice =document.getElementById('INFANTprice').value;
    var ToursDescription =document.getElementById('ToursDescription').value;
    var ToursCountry =document.getElementById('ToursCountry').value;
    var ToursCity =document.getElementById('City').value;

    
    var date=[];

    for (let index = 0; index < this.state.dateNumber; index++) {
    var ToursDate =document.getElementById("ToursDate"+index).value;
    var ToursSets =document.getElementById("ToursSets"+index).value;
    if (ToursDate&&ToursSets) {
        let obj={
            id:index,
            ToursDate:ToursDate,
            ToursSets:parseInt(ToursSets, 10)
        } 
        date.push(obj);
    }    
    }
    console.log(date)



    var specialoffers=document.getElementById('specialoffers').checked



    
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };


    formData.append("name", ToursName);
    formData.append("price", Toursprice);
    formData.append("priceCh", ToursChildprice);
    formData.append("priceINf", INFANTprice);
    formData.append("body", ToursDescription);
    formData.append("City", ToursCity);
    
    formData.append("Country", ToursCountry);
    formData.append("file",  this.state.ToursImg);
    formData.append("offers",  specialoffers);
    formData.append("Date", JSON.stringify(date) );


    axios({
      url: host + `api/Tours/add`,
      method: "POST",
      data: formData,
        headers: headers
    })
      .then(response => {
      
        // window.location.reload();
        if (response.status === 200) {
          toaster.success('Tours has been added successfully');
        }
      })
      .catch(function (error) {
        console.log(error.response.data)
        if (error.response) {
          toaster.danger(error.response.data);
        }
      });
    
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
    <Form.Control type="text" id="NameofTours" placeholder="Enter Tours Name" />
     
            </Col>
<Col>
<Form.Label>Tours Price</Form.Label>
    <Form.Control type="number" id="Toursprice" placeholder="Enter Price" />

</Col>
<Col>

<Form.Label>Child Price</Form.Label>
    <Form.Control type="number" id="ToursChildprice" placeholder="Enter Child Price" />

</Col>
<Col>

<Form.Label>INFANT  Price</Form.Label>
    <Form.Control type="number" id="INFANTprice" placeholder="Enter INFANT  Price" />

</Col>
</Form.Row>

    <Form.Label>Tours Description</Form.Label>
    <Form.Control as="textarea" rows="2" id="ToursDescription" placeholder=" Description" />
    <Form.Row>
    <Col>
    <Form.Label>Tours Country</Form.Label>
    <Form.Control type="text" id="ToursCountry" placeholder="Enter Country" />
    </Col>
    <Col>
    <Form.Label>Tours City</Form.Label>
    <Form.Control type="text" id="City" placeholder="Enter City" />
    </Col>
    </Form.Row>
<br></br>
<center><h5>Date </h5></center>
<div className="input-group text-center">

  <input type="button" value="-" className="button-minus" data-field="quantitychld" 
    onClick={()=>{
      this.DateInc('-')
  
    }}
  />
  <input type="number" step="1"  max="" value="" id="dateValue"  name="quantitychld" className="quantity-field" disabled/>
  <input type="button" value="+" className="button-plus" data-field="quantitychld"
  onClick={()=>{
    this.DateInc('+')

  }} />
</div>

<div >
{this.displayDataAdt}

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
      ToursImg:files[0]
    })

    }}
/>

  </Form.Group>
  <NavLink to="/dashboard">
  <Button id="BuyHotelBack" height={40} iconAfter="arrow-left" >
          Dashboard
        </Button>
        </NavLink>
     
        <Button id="BuyHotel" marginLeft={16} height={40} iconAfter="add" onClick={()=>{
      this.add()
  }}>
          Add Tours
        </Button>



        </div>
           
    </Col>
</Row>
<br></br>
                       
                        </div>

                    )
                  }else{
                    return(
                      <Home/>
                    )
                  }
                }}
            </Context.Consumer>
        );
    }
}

export default AddHotel;