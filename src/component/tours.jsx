import React from "react";
import Context from "./context.js";
import {Col, Row, Form,ListGroup,Image} from 'react-bootstrap';
import {  toaster,Button,Icon } from 'evergreen-ui'
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import axios from "axios";
import NavBar from "./NavBar";
import host from "../assets/js/host";
const cookies = new Cookies();

class TourSingel extends React.Component {
  constructor() {
    super();
    this.displayDataAdt = [];
    this.displayDataAdt2=[];
    this.state = {
        ToursImg:[],
        Adtdata : this.displayDataAdt,
        Adtdata2 : this.displayDataAdt2,
        item:'',
        name: '',
        price:'',
        priceCh:'',
        priceINf:'',
        city:'',
        body:'',
        Data:[],
        Country:'',
        OldDateNumber:''
    

    };
    //this.html()
  }




  componentDidMount(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('Tours');
    console.log(urlParams.get('Tours'))
    if (id) {
        var headers = {
            "Content-Type": "application/json",
            token: cookies.get("token")
          };
          axios({
            url: host + `api/Tours/find/${urlParams.get('Tours')}`,
            method: "GET",
            headers: headers
          })
            .then(response => {
                console.log(response.data)
              if (response.data[0]) {
                this.setState({
                  item: response.data[0],
                  name: response.data[0].name,
                  price:response.data[0].price,
                  Data:response.data[0].Data,
                  priceCh:response.data[0].priceCh,
                  priceINf:response.data[0].priceINf,
                  city:response.data[0].city,
                  body:response.data[0].body,
                  Country:response.data[0].Country,
                  OldDateNumber:response.data[0].Data.length
                })
          
                // this.html(response.data[0].Data.length)
              }
      
            })
            .catch(function (error) {
      
            });
    } else {
        window.location.href = "/allTours";
    }
  
   
}


SortbyCountry(value){
if (value==="all") {
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
Sort(value){
 
  if (value==="price") {
 
    let sort = this.state.Tourslist;
    sort.sort(function(a, b) {
      var fileA = a.price;
      var fileb = b.price;
      return fileA < fileb ? -1 : fileA > fileb ? 1 : 0;
    });
   
    this.setState({
      Tourslist: sort
    });
  }
  if (value==="uptime") {
   
    let sort = this.state.Tourslist;
    sort.sort(function(a, b) {
      var fileA = a.uptime;
      var fileb = b.uptime;
      return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
    });
  
    this.setState({
      Tourslist: sort
    });
  }
  
  
  }


  incAdult(id,price){
    var value=parseInt(document.getElementById("tPrice").innerText, 10);
    // var adtNumber=parseInt(document.getElementById(id+"adt").value, 10);
   
    if (this.state.ToursSets!==0) {
    // document.getElementById(id+"adt").value=adtNumber+1
    let NumberOfAdt=this.state.NumberOfAdt+1;
    let ToursSets=this.state.ToursSets-1
    console.log(ToursSets)
    this.setState({
      NumberOfAdt:NumberOfAdt,
      ToursSets:ToursSets
    })
    var TadtNumber=value+this.state.price

    document.getElementById("tPrice").textContent= TadtNumber
      
    }
    

 
  }

  desAdult(id,price){
      if (this.state.NumberOfAdt>1) {
       var value=parseInt(document.getElementById("tPrice").innerText, 10);
       let NumberOfAdt=this.state.NumberOfAdt-1;
       let ToursSets=this.state.ToursSets+1
       this.setState({
         NumberOfAdt:NumberOfAdt,
         ToursSets:ToursSets
       })
       var TadtNumber=value-this.state.price

       document.getElementById("tPrice").textContent= TadtNumber
      }
  
  }



  incchld(id,item){
    if (this.state.ToursSets!==0) {
    var value=parseInt(document.getElementById("tPrice").innerText, 10);
    let ChildrenNumber=this.state.Children+1;
    let ToursSets=this.state.ToursSets-0.5
    this.setState({
      Children:ChildrenNumber,
      ToursSets:ToursSets
    })
     var TadtNumber=value+this.state.priceCh
    document.getElementById("tPrice").textContent= TadtNumber
  }
  }

  descchld(id,item){
  
if (this.state.Children>0) {
  var value=parseInt(document.getElementById("tPrice").innerText, 10);
  let ChildrenNumber=this.state.Children-1;
  let ToursSets=this.state.ToursSets+0.5
  this.setState({
    Children:ChildrenNumber,
    ToursSets:ToursSets
  })

   var TadtNumber=value-this.state.priceCh
  document.getElementById("tPrice").textContent= TadtNumber
}
  
  }

  buy(id,item){



var setes=0
if (this.state.NumberOfAdt===1) {
  setes=this.state.ToursSets-1;
}else{
  setes= this.state.ToursSets;
}


let info={
  ChildrenNumber:this.state.Children,
  ADULTSNumber:this.state.NumberOfAdt,
  ToursDate:this.state.ToursDate,
  ToursSets:setes,
  // ToursId:item._id

}
let date=[]
for (let index = 0; index < this.state.Data.length; index++) {
      if (this.state.Data[index].ToursDate===this.state.ToursDate) {
        let obj={
          id: this.state.Data[index].id,
          ToursDate:this.state.Data[index].ToursDate,
          ToursSets:setes
        }
        date.push(obj)
      }else{
        date.push(this.state.Data[index])
      }
  
}


let data={
    Date:date,
    Item:item,
    info:info
}

let ADtPrice=this.state.price*this.state.NumberOfAdt;
let ChildrenPrice=this.state.priceCh*this.state.Children;
let TPrice=ADtPrice+ChildrenPrice
    console.log(TPrice)
   

  let formData = new FormData();
  var headers = {
   "Content-Type": "application/json",
  //  token: cookies.get("token")
 };

  formData.append("type", 'Tours');
  formData.append("price", TPrice);
  formData.append("data", JSON.stringify(data));
  formData.append("Adults", this.state.NumberOfAdt);
  formData.append("Child", this.state.Children);
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
      window.location.href = "/PayTours";     

    })
    .catch(function (error) {
      console.log(error)
      if (error.request.response) {
        toaster.danger(error.request.response);
      }
    });
  
  }

  Info(e){

    if (e.target.value!=="all") {
      this.setState({
        ToursDate:'',
        ChildrenSets:'',
        INFANTSets:'',
        Children:0,
        NumberOfAdt:1,
  
  
      })
      let ToursDate=e.target.value.split("||")[0]
      let ToursSets=e.target.value.split("||")[1]
      // console.log(e.target.value)
  
      this.setState({
        ToursDate:ToursDate,
        ToursSets:parseInt(ToursSets, 10)-1,
        ToursSetsBuffer:parseInt(ToursSets, 10)-1,
  
  
      })
      document.getElementById('ToursPInfo').style.display='block'

    //   document.getElementById('btmBuyGroup').style.display='block'
      // console.log(ToursDate)
      // console.log(ToursSets)
      // console.log(ChildrenSets)
      // console.log(INFANTSets)
    }
   

  }


  html(value){
    console.log(value)
    let html =[]

    for (let index = 0; index <value; index++) {
      html.push(
        <Component initialState={{
             ToursDate: this.state.item.Data[index].ToursDate,
             ToursSets:this.state.item.Data[index].ToursSets
        
        }}>
        {({ state, setState }) => (
        <div id="TorusDateDiv" key={index}>
  <br></br>
        <Form.Row>
    <Col md={{ offset: 3 }}>

    <Form.Label>Tours Date {index+1}</Form.Label>

    <Form.Control type="date" value={state.ToursDate}  id={"ToursDate"+index} onChange={(e)=>{
        console.log(e.target.value)
        setState({
            ToursDate:e.target.value
        })
    }} />
    
    </Col>
    <Col>
    <Form.Label>Tours Seats </Form.Label>

    <Form.Control type="number" value={state.ToursSets} id={"ToursSets"+index} placeholder="Enter Number of seats" onChange={(e)=>{
        console.log(e.target.value)
        setState({
            ToursSets:e.target.value
        })
    }}/>

    
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

    this.displayDataAdt=html;
    this.setState({
       Adtdata : this.displayDataAdt,
    });
}

  render() {
    // const listItems = this.state.Countries.map((number,i) =>

    //   <option key={i} value={number}>{number}</option>

    // // <li><a>{number}</a></li>
    // );
    return (
<div>
      <Context.Consumer>
        {ctx => {
            return(
                <div width="100%">
                <NavBar/>
                <br/>
<Row>
    <Col  md={{ span: 6, offset: 1 }}>
        <h4>{this.state.name}</h4>
        <div style={{minHeight:200}}>
        <p>{this.state.body}</p>

        </div>
    <br></br>
    <Form.Label>Select Available Date</Form.Label>
                          <Form.Control as="select" onChange={(e)=>{
                            this.Info(e)
 
                            // this.setState({
                            //   NumberOfsets
                            // })
                          }}>
                                 <option  value={'all'} defaultValue>Select Date</option>
                          {this.state.Data.map((date,i) => (
                            <option key={i} value={date.ToursDate+"||"+date.ToursSets+"||"+date.ChildrenSets+"||"+date.INFANTSets}>{date.ToursDate}</option>
                          ))}
                          </Form.Control>
<br></br>
<Row>
<Col>
    <ListGroup id="itemToures" style={{marginBottom:6}}>
  <ListGroup.Item style={{marginBottom:6}}><i id="toursIcons"  className="fas fa-street-view"></i>ADULTS Price(+9) {this.state.price} $</ListGroup.Item>
  <ListGroup.Item style={{marginBottom:6}}><i id="toursIcons" className="fas fa-child"></i>Children(2-9) {this.state.priceCh} $</ListGroup.Item>
  <ListGroup.Item style={{marginBottom:6}}><i id="toursIcons" className="fas fa-baby"></i>INFANT Price(0-2) <b>Free</b></ListGroup.Item>

</ListGroup>
    </Col>
<Col>
<div id="ToursPInfo">

{/* <h5 ><b>Available Seats :</b> {this.state.ToursSets}</h5>
    <hr></hr> */}
      <h5 style={{textAlign:"center"}}>Adult </h5>

      <div  className="input-group text-center">
        <input type="button" value="-" className="button-minus" data-field="quantity" onClick={()=>{
          this.desAdult()
        }}
        />
        <input type="number" step="1"  id={"adt"} max="" value={this.state.NumberOfAdt} name="quantity" className="quantity-field" disabled/>
        <input type="button" value="+" onClick={()=>{
          this.incAdult()

        }} 
        className="button-plus" data-field="quantity"/>
      </div>
      <h5 style={{textAlign:"center"}}>Child </h5>
      <div className="input-group">
        <input type="button" value="-" className="button-minus" data-field="quantitychld" 
          onClick={()=>{
            this.descchld()
        
          }}
        />
        <input type="number" step="1"  max="" value={this.state.Children} id={"chld"} name="quantitychld" className="quantity-field" disabled/>
        <input type="button" value="+" className="button-plus" data-field="quantitychld"
        onClick={()=>{
          this.incchld()

        }} />
      </div>
      </div>

</Col>
</Row>


       
                              <div  className="text-center">    
                            <Button id="ChooseaTourBuyBtn"  iconAfter="shopping-cart" variant="primary"
                            onClick={()=>{
                              this.buy()
                            }}
                            >BUY For <span className="spanTorusPrice" id={"tPrice"}>{this.state.price}</span></Button>
                            </div>
                             
    </Col>
    <Col  md={{ span: 4, offset: 0 }}>

<Image src="https://static.neweuropetours.eu/wp-content/uploads/2018/09/thio-prague-walking-tours-08-1600x900.jpg" thumbnail />
<br></br>
<div className="text-center" style={{marginTop:15}}>
<Icon icon="map"  size={25} />{this.state.Country} , {this.state.city}

</div>
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

export default TourSingel;