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
class AddGroup extends React.Component {
    constructor() {
        super();
    this.displayDataAdt = [];

        this.state = {
          ToursImg:[],
          GroupPdf:[],
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

    <Form.Label>Group Date {index+1}</Form.Label>

    <Form.Control type="date" id={"GroupDate"+index}  />
    
    </Col>
    <Col>
    <Form.Label>Group Seats </Form.Label>

    <Form.Control type="number" id={"GroupSets"+index} placeholder="Enter Number of seats" />

    
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
 
    var GroupName =document.getElementById('GroupName').value;
    var Groupprice =document.getElementById('Groupprice').value;
    var GroupChildprice =document.getElementById('GroupChildprice').value;
    var INFANTprice =document.getElementById('INFANTprice').value;
    var GroupDescription =document.getElementById('GroupDescription').value;
    var GroupCountry =document.getElementById('GroupCountry').value;
    var SinglePrice =document.getElementById('SinglePrice').value;
    var GroupCity =document.getElementById('GroupCity').value;
    var food=document.getElementById('Food').checked;
    var Transport=document.getElementById('Transport').checked;
    var Visa=document.getElementById('Visa').checked;
    var Flight=document.getElementById('Flight').checked;
    var TourismProgram=document.getElementById('TourismProgram').checked;
    var Hotel=document.getElementById('Hotel').checked;
let opt={
    food:food,
    Transport:Transport,
    Visa:Visa,
    Flight:Flight,
    TourismProgram:TourismProgram,
    Hotel:Hotel
}
    var date=[];

    for (let index = 0; index < this.state.dateNumber; index++) {
    var ToursDate =document.getElementById("GroupDate"+index).value;
    var ToursSets =document.getElementById("GroupSets"+index).value;
    if (ToursDate&&ToursSets) {
        let obj={
            id:index,
            ToursDate:ToursDate,
            ToursSets:parseInt(ToursSets, 10)
        } 
        date.push(obj);
    }    
    }
    console.log(opt)





    
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };




    formData.append("name", GroupName);
    formData.append("price", Groupprice);
    formData.append("priceCh", GroupChildprice);
    formData.append("priceINf", INFANTprice);
    formData.append("body", GroupDescription);
    formData.append("Country", GroupCountry);
    formData.append("City", GroupCity);
    formData.append("priceSingle", SinglePrice);
    
    formData.append("file",  this.state.ToursImg);
    formData.append("filePdf",  this.state.GroupPdf);
    formData.append("Date", JSON.stringify(date) );
    formData.append("opt", JSON.stringify(opt) );

    axios({
      url: host + `api/Group/add`,
      method: "POST",
      data: formData,
        headers: headers
    })
      .then(response => {
      
        // window.location.reload();
        if (response.status === 200) {
          toaster.success('Group has been added successfully');
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
            <Form.Label>Group Name</Form.Label>
    <Form.Control type="text" id="GroupName" placeholder="Enter Group Name" />
     
            </Col>
<Col>
<Form.Label>Group Price</Form.Label>
    <Form.Control type="number" id="Groupprice" placeholder="Enter Price" />

</Col>
<Col>

<Form.Label>Single Price</Form.Label>
    <Form.Control type="number" id="SinglePrice" placeholder="Enter Single Price" />

</Col>
<Col>

<Form.Label>Child Price</Form.Label>
    <Form.Control type="number" id="GroupChildprice" placeholder="Enter Child Price" />

</Col>
<Col>

<Form.Label>INFANT  Price</Form.Label>
    <Form.Control type="number" id="INFANTprice" placeholder="Enter INFANT  Price" />

</Col>
</Form.Row>

    <Form.Label>Group Description</Form.Label>
    <Form.Control as="textarea" rows="2" id="GroupDescription" placeholder=" Description" />
    <Form.Row>
         <Col>
    <Form.Label>Group Country</Form.Label>
    <Form.Control type="text" id="GroupCountry" placeholder="Enter Country" />
    </Col>
    <Col>
    <Form.Label>Group City</Form.Label>
    <Form.Control type="text" id="GroupCity" placeholder="Enter Country" />
    </Col>
    </Form.Row>
<br></br>
<div className="text-center">
<Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`Food`}
        label={`Food`}
      />
<Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`Transport`}
        label={`Transport`}
      />
      <Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`Visa`}
        label={`Visa`}
      />
      <Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`Flight`}
        label={`Flight`}
      />

<Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`Hotel`}
        label={`Hotel`}
      />
<Form.Check 
        custom
        inline
        type={'checkbox'}
        id={`TourismProgram`}
        label={`Tourism Program`}
      />


</div>



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
    



<br></br>
<Form.Row >
<Col>
<Form.Label>Group Picture</Form.Label>

<FilePicker
  multiple
  width={'50%'}
  marginBottom={32}
  onChange={files => {
    this.setState({
      ToursImg:files[0]
    })

    }}
/>
</Col>
<Col>
<Form.Label>Group PDF File</Form.Label>

<FilePicker
  multiple
  width={'50%'}
  marginBottom={32}
  onChange={files => {
    this.setState({
     GroupPdf:files[0]
    })

    }}
/>
</Col>
</Form.Row>


  </Form.Group>
  <NavLink to="/dashboard">
  <Button id="BuyHotelBack" height={40} iconAfter="arrow-left" >
          Dashboard
        </Button>
        </NavLink>
     
        <Button id="BuyHotel" marginLeft={16} height={40} iconAfter="add" onClick={()=>{
      this.add()
  }}>
          Add Group
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

export default AddGroup;