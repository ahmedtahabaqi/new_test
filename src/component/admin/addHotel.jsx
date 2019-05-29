import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../../component/context.js";

import {  Col, Row ,Form} from 'react-bootstrap';
import {  FilePicker ,toaster,Button} from 'evergreen-ui'

import NavBar from "../../component/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../../assets/js/host";
import Home from "../home.jsx";


const cookies = new Cookies();
class AddHotel extends React.Component {
    constructor() {
        super();
        this.state = {
            img:[]
        };
    }



addHotel(){
var HotelName= document.getElementById('HotelName').value; 
var HotelStars= document.getElementById('HotelStars').value; 
var Country= document.getElementById('Country').value; 
var HotelCity= document.getElementById('HotelCity').value; 
var HotelAddress= document.getElementById('HotelAddress').value;


var BreakFastPrice= document.getElementById('BreakFastPrice').value; 
var MapURL= document.getElementById('MapURL').value; 
var CHILDRENPrice= document.getElementById('CHILDRENPrice').value; 
var INFANTPrice= document.getElementById('INFANTPrice').value; 
var HotelDescription= document.getElementById('HotelDescription').value;


var HotelRoom1= document.getElementById('HotelRoom1').value; 
var HotelRoom1Price= document.getElementById('HotelRoom1Price').value; 
var HotelRoom2= document.getElementById('HotelRoom2').value; 
var HotelRoom2Price= document.getElementById('HotelRoom2Price').value; 
var HotelRoom3= document.getElementById('HotelRoom3').value; 
var HotelRoom3Price= document.getElementById('HotelRoom3Price').value; 
var HotelRoom4= document.getElementById('HotelRoom4').value; 
var HotelRoom4Price= document.getElementById('HotelRoom4Price').value; 
var HotelRoom5= document.getElementById('HotelRoom5').value; 
var HotelRoom5Price= document.getElementById('HotelRoom5Price').value; 
var HotelRoom6= document.getElementById('HotelRoom6').value; 
var HotelRoom6Price= document.getElementById('HotelRoom6Price').value; 
var HotelRoom7= document.getElementById('HotelRoom7').value; 
var HotelRoom7Price= document.getElementById('HotelRoom7Price').value; 
var HotelRoom8= document.getElementById('HotelRoom8').value; 
var HotelRoom8Price= document.getElementById('HotelRoom8Price').value; 
var HotelRoom9= document.getElementById('HotelRoom9').value; 
var HotelRoom9Price= document.getElementById('HotelRoom9Price').value; 
var HotelRoom10= document.getElementById('HotelRoom10').value; 
var HotelRoom10Price= document.getElementById('HotelRoom10Price').value; 
var HotelRoom11= document.getElementById('HotelRoom11').value; 
var HotelRoom11Price= document.getElementById('HotelRoom11Price').value; 
var HotelRoom12= document.getElementById('HotelRoom12').value; 
var HotelRoom12Price= document.getElementById('HotelRoom12Price').value; 

var HotelRoom1beds= document.getElementById('HotelRoom1beds').value; 
var HotelRoom2beds= document.getElementById('HotelRoom2beds').value; 
var HotelRoom3beds= document.getElementById('HotelRoom3beds').value; 
var HotelRoom4beds= document.getElementById('HotelRoom4beds').value; 
var HotelRoom5beds= document.getElementById('HotelRoom5beds').value; 
var HotelRoom6beds= document.getElementById('HotelRoom6beds').value; 
var HotelRoom7beds= document.getElementById('HotelRoom7beds').value; 
var HotelRoom8beds= document.getElementById('HotelRoom3').value; 
var HotelRoom9beds= document.getElementById('HotelRoom9beds').value; 
var HotelRoom10beds= document.getElementById('HotelRoom10beds').value; 
var HotelRoom11beds= document.getElementById('HotelRoom11beds').value; 
var HotelRoom12beds= document.getElementById('HotelRoom12beds').value; 




var HotelRoom1CHILDRENbeds= document.getElementById('HotelRoom1CHILDRENbeds').value; 
var HotelRoom1INFbeds= document.getElementById('HotelRoom1INFbeds').value; 

var HotelRoom2CHILDRENbeds= document.getElementById('HotelRoom2CHILDRENbeds').value; 
var HotelRoom2INFbeds= document.getElementById('HotelRoom2INFbeds').value; 


var HotelRoom3CHILDRENbeds= document.getElementById('HotelRoom3CHILDRENbeds').value; 
var HotelRoom3INFbeds= document.getElementById('HotelRoom3INFbeds').value; 


var HotelRoom4CHILDRENbeds= document.getElementById('HotelRoom4CHILDRENbeds').value; 
var HotelRoom4INFbeds= document.getElementById('HotelRoom4INFbeds').value; 

var HotelRoom5CHILDRENbeds= document.getElementById('HotelRoom5CHILDRENbeds').value; 
var HotelRoom5INFbeds= document.getElementById('HotelRoom5INFbeds').value; 

var HotelRoom6CHILDRENbeds= document.getElementById('HotelRoom6CHILDRENbeds').value; 
var HotelRoom6INFbeds= document.getElementById('HotelRoom6INFbeds').value; 


var HotelRoom7CHILDRENbeds= document.getElementById('HotelRoom7CHILDRENbeds').value; 
var HotelRoom7INFbeds= document.getElementById('HotelRoom7INFbeds').value; 


var HotelRoom8CHILDRENbeds= document.getElementById('HotelRoom8CHILDRENbeds').value; 
var HotelRoom8INFbeds= document.getElementById('HotelRoom8INFbeds').value; 


var HotelRoom9CHILDRENbeds= document.getElementById('HotelRoom9CHILDRENbeds').value; 
var HotelRoom9INFbeds= document.getElementById('HotelRoom9INFbeds').value; 


var HotelRoom10CHILDRENbeds= document.getElementById('HotelRoom10CHILDRENbeds').value; 
var HotelRoom10INFbeds= document.getElementById('HotelRoom10INFbeds').value; 


var HotelRoom11CHILDRENbeds= document.getElementById('HotelRoom11CHILDRENbeds').value; 
var HotelRoom11INFbeds= document.getElementById('HotelRoom11INFbeds').value; 

var HotelRoom12CHILDRENbeds= document.getElementById('HotelRoom12CHILDRENbeds').value; 
var HotelRoom12INFbeds= document.getElementById('HotelRoom12INFbeds').value; 


















var options1= document.getElementById('options1').value; 
var options1Price= document.getElementById('options1Price').value; 
var options2= document.getElementById('options2').value; 
var options2Price= document.getElementById('options2Price').value; 
var options3= document.getElementById('options3').value; 
var options3Price= document.getElementById('options3Price').value; 
var options4= document.getElementById('options4').value; 
var options4Price= document.getElementById('options4Price').value; 
var options5= document.getElementById('options5').value; 
var options5Price= document.getElementById('options5Price').value; 
var options6= document.getElementById('options6').value; 
var options6Price= document.getElementById('options6Price').value; 



var breakFastCheck=document.getElementById('breakFastCheck').checked;

let Rooms=[                                                                     
  {name:HotelRoom1,cost:HotelRoom1Price,beds:parseInt(HotelRoom1beds, 10),CHLbeds:parseInt(HotelRoom1CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom1INFbeds, 10)},
  {name:HotelRoom2,cost:HotelRoom2Price,beds:parseInt(HotelRoom2beds, 10),CHLbeds:parseInt(HotelRoom2CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom2INFbeds, 10)},
  {name:HotelRoom3,cost:HotelRoom3Price,beds:parseInt(HotelRoom3beds, 10),CHLbeds:parseInt(HotelRoom3CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom3INFbeds, 10)},
  {name:HotelRoom4,cost:HotelRoom4Price,beds:parseInt(HotelRoom4beds, 10),CHLbeds:parseInt(HotelRoom4CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom4INFbeds, 10)},
  {name:HotelRoom5,cost:HotelRoom5Price,beds:parseInt(HotelRoom5beds, 10),CHLbeds:parseInt(HotelRoom5CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom5INFbeds, 10)},
  {name:HotelRoom6,cost:HotelRoom6Price,beds:parseInt(HotelRoom6beds, 10),CHLbeds:parseInt(HotelRoom6CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom6INFbeds, 10)},
  {name:HotelRoom7,cost:HotelRoom7Price,beds:parseInt(HotelRoom7beds, 10),CHLbeds:parseInt(HotelRoom7CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom7INFbeds, 10)},
  {name:HotelRoom8,cost:HotelRoom8Price,beds:parseInt(HotelRoom8beds, 10),CHLbeds:parseInt(HotelRoom8CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom8INFbeds, 10)},
  {name:HotelRoom9,cost:HotelRoom9Price,beds:parseInt(HotelRoom9beds, 10),CHLbeds:parseInt(HotelRoom9CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom9INFbeds, 10)},
  {name:HotelRoom10,cost:HotelRoom10Price,beds:parseInt(HotelRoom10beds, 10),CHLbeds:parseInt(HotelRoom10CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom10INFbeds, 10)},
  {name:HotelRoom11,cost:HotelRoom11Price,beds:parseInt(HotelRoom11beds, 10),CHLbeds:parseInt(HotelRoom11CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom11INFbeds, 10)},
  {name:HotelRoom12,cost:HotelRoom12Price,beds:parseInt(HotelRoom12beds, 10),CHLbeds:parseInt(HotelRoom12CHILDRENbeds, 10),INFbeds:parseInt(HotelRoom12INFbeds, 10)}
]


var options=[{name:options1,cost:parseInt(options1Price, 10)}
  ,{name:options2,cost:parseInt(options2Price, 10)}
  ,{name:options3,cost:parseInt(options3Price, 10)}
  ,{name:options4,cost:parseInt(options4Price, 10)}
  ,{name:options5,cost:parseInt(options5Price, 10)}
  ,{name:options6,cost:parseInt(options6Price, 10)}]



let fRooms=[]
for (let index = 0; index < Rooms.length; index++) {
    if (Rooms[index].name&&Rooms[index].cost&&Rooms[index].beds&&Rooms[index].CHLbeds&&Rooms[index].INFbeds) {
        let fdata={'name':Rooms[index].name,'cost':Rooms[index].cost,'beds':Rooms[index].beds,'CHLbeds':Rooms[index].CHLbeds,'INFbeds':Rooms[index].INFbeds}
        fRooms.push(fdata)
    }
    
}
let fOptions=[]
for (let index = 0; index < options.length; index++) {
    if (options[index].name&&options[index].cost) {
        let fdata={'name':options[index].name,'cost':options[index].cost}
        fOptions.push(fdata)
    }
    
}


var CHILDRENAge= document.getElementById('CHILDRENAge').value; 
var INFANTAge= document.getElementById('INFANTAge').value; 
fRooms=JSON.stringify(fRooms);
fOptions=JSON.stringify(fOptions);

let formData = new FormData();
var headers = {
 "Content-Type": "application/json",
 token: cookies.get("token")
};

formData.append("file", this.state.img);
formData.append("name", HotelName);
formData.append("body", HotelDescription);
formData.append("address", HotelAddress);
formData.append("stars", HotelStars);
formData.append("country", Country);
formData.append("breakfastPrice", BreakFastPrice);
formData.append("PriceCHILDREN", CHILDRENPrice);
formData.append("PriceINFANT", INFANTPrice);
formData.append("CHILDRENAge", CHILDRENAge);
formData.append("INFANTAge", INFANTAge); 
formData.append("map", MapURL);
formData.append("City", HotelCity);
formData.append("breakfast", breakFastCheck);
formData.append("rooms",fRooms);
formData.append("option",fOptions);

axios({
  url: host + `api/holet/add`,
  method: "POST",
  data: formData,
  headers: headers
})
  .then(response => {


    if (response.status === 200) {
      toaster.success(`Successful `);
    
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
                   if (ctx.value.sesson.role === 1) {
                    return (
                        <div >
                            <div>
                                <NavBar />
                            </div>
                            <br></br>
                            <br></br>

                            <Row  style={{ marginRight: 0 + "px" }}>
                                <Col  md={{ span: 10 , offset: 1 }}>
                                <div>
  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Name</Form.Label>
      <Form.Control type="text" id="HotelName" placeholder="Hotel Name" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Stars</Form.Label>
      <Form.Control type="number"  id="HotelStars" placeholder="Hotel Stars" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Country</Form.Label>
      <Form.Control type="text"  id="Country" placeholder="Country" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel City</Form.Label>
      <Form.Control type="text"  id="HotelCity" placeholder="City" />
    </Form.Group>


  </Form.Row>


  <Form.Row>

  <Form.Group as={Col} >
      <Form.Label>Hotel Address</Form.Label>
      <Form.Control type="text"  id="HotelAddress" placeholder="Address" />
    </Form.Group>

  <Form.Group as={Col} >
      <Form.Label>BreakFast Price</Form.Label>
      <Form.Control type="number" id="BreakFastPrice" placeholder="BreakFast Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Map URL</Form.Label>
      <Form.Control type="text" id="MapURL" placeholder="Map URL" />
    </Form.Group>

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>CHILDREN  Price</Form.Label>
      <Form.Control type="number" id="CHILDRENPrice" placeholder="CHILDREN Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>CHILDREN  Age</Form.Label>
      <Form.Control type="number" id="CHILDRENAge" placeholder="CHILDREN Age" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>INFANT  Price</Form.Label>
      <Form.Control type="number"  id="INFANTPrice" placeholder="INFANT Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>INFANT  Age</Form.Label>
      <Form.Control type="number"  id="INFANTAge" placeholder="INFANT Age" />
    </Form.Group>
  </Form.Row>







  <Form.Group >
    <Form.Label>Hotel Description</Form.Label>
    <Form.Control as="textarea" id="HotelDescription" rows="2" />
  </Form.Group>
 

  <h4>
  Hotels Rooms Details
  </h4>
  <br></br>

  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 1</Form.Label>
      <Form.Control type="text" id="HotelRoom1" placeholder="Room 1" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 1 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom1Price" placeholder="Room 1 Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Hotel Room 1 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom1beds" placeholder="Room 1 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 1 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom1CHILDRENbeds" placeholder="Room 1 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 1 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom1INFbeds" placeholder="Room 1 INF beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 2</Form.Label>
      <Form.Control type="text" id="HotelRoom2" placeholder="Room 2" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 2 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom2Price" placeholder="Room 2 Price" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 2 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom2beds" placeholder="Room 2 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 2 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom2CHILDRENbeds" placeholder="Room 2 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 2 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom2INFbeds" placeholder="Room 2 INF beds" />
    </Form.Group>

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 3</Form.Label>
      <Form.Control type="text" id="HotelRoom3" placeholder="Room 3" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 3 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom3Price" placeholder="Room 3 Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Hotel Room 3 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom3beds" placeholder="Room 3 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 3 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom3CHILDRENbeds" placeholder="Room 3 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 3 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom3INFbeds" placeholder="Room 3 INF beds" />
    </Form.Group>




    <Form.Group as={Col} >
      <Form.Label>Hotel Room 4</Form.Label>
      <Form.Control type="text" id="HotelRoom4" placeholder="Room 4" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 4 Price</Form.Label>
      <Form.Control type="number"  id="HotelRoom4Price" placeholder="Room 4 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 4 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom4beds" placeholder="Room 4 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 4 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom4CHILDRENbeds" placeholder="Room 4 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 4 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom4INFbeds" placeholder="Room 4 INF beds" />
    </Form.Group>



  </Form.Row>


  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 5</Form.Label>
      <Form.Control type="text" id="HotelRoom5" placeholder="Room 5" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 5 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom5Price" placeholder="Room 5 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 5 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom5beds" placeholder="Room 5 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 5 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom5CHILDRENbeds" placeholder="Room 5 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 5 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom5INFbeds" placeholder="Room 5 INF beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 6</Form.Label>
      <Form.Control type="text" id="HotelRoom6" placeholder="Room 6" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 6 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom6Price" placeholder="Room 6 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 6 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom6beds" placeholder="Room 6 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 6 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom6CHILDRENbeds" placeholder="Room 6 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 6 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom6INFbeds" placeholder="Room 6 INF beds" />
    </Form.Group>

  </Form.Row>

  <Form.Check
        custom
        inline
        label="Extra Rooms?"
        type={'checkbox'}
        id={`morerooms`}
        onChange={()=>{
            
            var checkboxValue=document.getElementById('morerooms').checked
            if (checkboxValue) {
            document.getElementById('RoomsS2').style.display="block"
                
            }else{
            document.getElementById('RoomsS2').style.display="none"

            }

        }}
      />
 <br></br>
<div id="RoomsS2">
  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 7</Form.Label>
      <Form.Control type="text" id="HotelRoom7" placeholder="Room 7" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 7 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom7Price" placeholder="Room 7 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 7 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom7beds" placeholder="Room 7 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 7 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom7CHILDRENbeds" placeholder="Room 7 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 7 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom7INFbeds" placeholder="Room 7 INF beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 8</Form.Label>
      <Form.Control type="text" id="HotelRoom8" placeholder="Room 8" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 8 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom8Price" placeholder="Room 8 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 8 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom8beds" placeholder="Room 8 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 8 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom8CHILDRENbeds" placeholder="Room 8 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 8 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom8INFbeds" placeholder="Room 8 INF beds" />
    </Form.Group>


  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 9</Form.Label>
      <Form.Control type="text" id="HotelRoom9" placeholder="Room 9" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 9 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom9Price" placeholder="Room 9 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 9 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom9beds" placeholder="Room 9 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 9 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom9CHILDRENbeds" placeholder="Room 9 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 9 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom9INFbeds" placeholder="Room 9 INF beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 10</Form.Label>
      <Form.Control type="text" id="HotelRoom10" placeholder="Room 10" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>Hotel Room 10 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom10Price" placeholder="Room 10 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 10 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom10beds" placeholder="Room 10 beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label> Room 10 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom10CHILDRENbeds" placeholder="Room 10 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 10 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom10INFbeds" placeholder="Room 10 INF beds" />
    </Form.Group>


  </Form.Row>


  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>Hotel Room 11</Form.Label>
      <Form.Control type="text" id="HotelRoom11" placeholder="Room 11" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 11 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom11Price" placeholder="Room 11 Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Hotel Room 11 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom11beds" placeholder="Room 11 beds" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label> Room 11 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom11CHILDRENbeds" placeholder="Room 11 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 11 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom11INFbeds" placeholder="Room 11 INF beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Hotel Room 12</Form.Label>
      <Form.Control type="text" id="HotelRoom12" placeholder="Room 12" />
    </Form.Group>


    <Form.Group as={Col}>
      <Form.Label>Hotel Room 12 Price</Form.Label>
      <Form.Control type="number" id="HotelRoom12Price"  placeholder="Room 12 Price" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Hotel Room 12 beds</Form.Label>
      <Form.Control type="number" id="HotelRoom12beds" placeholder="Room 12 beds" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label> Room 12 CH beds</Form.Label>
      <Form.Control type="number" id="HotelRoom12CHILDRENbeds" placeholder="Room 12 CH beds" />
    </Form.Group>   <Form.Group as={Col} >
      <Form.Label> Room 12 INF beds</Form.Label>
      <Form.Control type="number" id="HotelRoom12INFbeds" placeholder="Room 12 INF beds" />
    </Form.Group>

  </Form.Row>
</div>

<br></br>
<h4>
Hotels Rooms options Details
  </h4>
  <br></br>


<Form.Row>
  <Form.Group as={Col} >
      <Form.Label>options 1</Form.Label>
      <Form.Control type="text" id="options1" placeholder="options 1" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>options 1 Price</Form.Label>
      <Form.Control type="number" id="options1Price" placeholder="options 1 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>options 2</Form.Label>
      <Form.Control type="text" id="options2" placeholder="options 2" />
    </Form.Group>


    <Form.Group as={Col}>
      <Form.Label>options 2 Price</Form.Label>
      <Form.Control type="number"  id="options2Price" placeholder="options 2 Price" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>options 3</Form.Label>
      <Form.Control type="text" id="options3" placeholder="options 3" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>options 3 Price</Form.Label>
      <Form.Control type="number" id="options3Price"placeholder="options 3 Price" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>options 4</Form.Label>
      <Form.Control type="text" id="options4" placeholder="options 4" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>options 4 Price</Form.Label>
      <Form.Control type="number"  id="options4Price"  placeholder="options 4 Price" />
    </Form.Group>
  </Form.Row>


  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>options 5</Form.Label>
      <Form.Control type="text" id="options5"  placeholder="options 5" />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>options 5 Price</Form.Label>
      <Form.Control type="number"  id="options5Price" placeholder="options 5 Price" />
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>options 6</Form.Label>
      <Form.Control type="text" id="options6" placeholder="options 6" />
    </Form.Group>


    <Form.Group as={Col} >
      <Form.Label>options 6 Price</Form.Label>
      <Form.Control type="number" id="options6Price" placeholder="options 6 Price" />
    </Form.Group>
  </Form.Row>











  <Form.Row>
    <Form.Group as={Col}  >
    <Form.Label>Hotel Image </Form.Label>
    <FilePicker
  multiple
  width={250}
  marginBottom={32}
  onChange={files =>{  
      this.setState({img:files[0]})
    }}
/>
</Form.Group>

  </Form.Row>


  <Form.Group id="formGridCheckbox">
    <Form.Check custom type="checkbox" id="breakFastCheck" label="BreakFast is Required?" />
  </Form.Group>

  <NavLink to="/dashboard">
  <Button id="BuyHotelBack" height={40} iconAfter="arrow-left" >
          Dashboard
        </Button>
        </NavLink>
     
        <Button id="BuyHotel" marginLeft={16} height={40} iconAfter="add" onClick={()=>{
      this.addHotel()
  }}>
          Add Hotel
        </Button>
  {/* <Button variant="primary" onClick={()=>{
      this.addHotel()
  }}>
    Submit
  </Button> */}
</div>
<br></br>
<br></br>
                                </Col>


                            </Row>
                                
                       
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