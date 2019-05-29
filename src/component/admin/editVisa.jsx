import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";

import {  Col, Row ,Form} from 'react-bootstrap';
import { toaster,Button} from 'evergreen-ui'
import NavBar from "../../component/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";
import host from "../../assets/js/host";
 
import "react-datepicker/dist/react-datepicker.css";
import Home from "../home.jsx";

const cookies = new Cookies();
class editVisa extends React.Component {
    constructor() {
        super();
    this.displayDataAdt = [];
    this.displayDataAdt2=[];
        this.state = {
          ToursImg:[],
      Adtdata : this.displayDataAdt,
      Adtdata2 : this.displayDataAdt2,
            dateNumber:0,
            APPROVED: '',
            description:'',
            Nationality:'',
            country:'',
            name:'',
            price:0,
            _id:''


        };
 
    }


componentDidMount(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('visa');
    if (id) {
        var headers = {
            "Content-Type": "application/json",
            token: cookies.get("token")
          };
          axios({
            url: host + `api/visa/find/${id}`,
            method: "GET",
            headers: headers
          })
            .then(response => {
                console.log(response.data)
              if (response.data[0]) {
                if (response.data[0].offers) {
                  document.getElementById('specialoffers').checked=true
                }
                this.setState({
                //   item: response.data[0],
                _id: response.data[0]._id,
                APPROVED: response.data[0].APPROVED,
                description:response.data[0].Description,
                Nationality:response.data[0].Nationality,
                country:response.data[0].country,
                name:response.data[0].name,
                price:response.data[0].price,
                })
              }
      
            })
            .catch(function (error) {
      
            });
    }else{
        window.location.href = "/allVisa";
    }
   
}



add(){

  var specialoffers=document.getElementById('specialoffers').checked
   
  var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };

    let formData = new FormData();
    formData.append("APPROVED", this.state.APPROVED);
    formData.append("description", this.state.description);
    formData.append("Nationality", this.state.Nationality);
    formData.append("country", this.state.country);
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("offers", specialoffers);
    axios({
      url: host + `api/visa/edit/${this.state._id}`,
      method: "POST",
      data: formData,
        headers: headers
    })
      .then(response => {


        // window.location.reload();
        if (response.status === 200) {
          toaster.success('Visa has been Edit successfully');
          window.location.href = "/allVisa";
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
    <div id="VisaFormDiv">
        <br></br>
<h4>Edit Visa</h4>
  <Row >
    <Col>
    <Form.Label>Title</Form.Label>
      <Form.Control  value={this.state.name} onChange={(e)=>{
        this.setState({
            name:e.target.value
        })  
      }} />
    </Col>
    <Col>
    <Form.Label>Country</Form.Label>
      <Form.Control value={this.state.country} onChange={(e)=>{
        this.setState({
            country:e.target.value
        })  
      }}/>
    </Col>
    <Col>
    <Form.Label>Nationality</Form.Label>
      <Form.Control value={this.state.Nationality} onChange={(e)=>{
        this.setState({
            Nationality:e.target.value
        })  
      }}/>
    </Col>
  </Row>
  <Row>
    <Col>
    <Form.Label >Description</Form.Label>
      <Form.Control value={this.state.description} onChange={(e)=>{
        this.setState({
            description:e.target.value
        })  
      }}/>
    </Col>
    <Col>
    <Form.Label>APPROVED</Form.Label>
      <Form.Control value={this.state.APPROVED} onChange={(e)=>{
        this.setState({
            APPROVED:e.target.value
        })  
      }}/>
    </Col>
    <Col>
    <Form.Label>Price</Form.Label>
      <Form.Control type="number" value={this.state.price} onChange={(e)=>{
        this.setState({
            price:e.target.value
        })  
      }} />
    </Col>
  </Row>
  <br></br>
  <Form.Check 
        custom
        type={'checkbox'}
        id={`specialoffers`}
        label={`On Special Offers?`}
      />
  <center>
  <Button id="BuyHotel" marginTop={50} marginLeft={16} height={40} iconAfter="edit" onClick={()=>{
      this.add()
  }}>
          Edit
        </Button>
  <Link to="/allVisa">
        <Button id="BuyHotel" marginTop={50} marginLeft={16} height={40} iconAfter="arrow-left" onClick={()=>{
    //   this.add()
  }}>
         Back
        </Button>  
        </Link>

      </center>

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

export default editVisa;