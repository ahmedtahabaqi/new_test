import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";

import { toaster } from 'evergreen-ui'
import axios from "axios";
import 'react-rangeslider/lib/index.css'

import DatePicker from "react-datepicker";
import Autosuggest from 'react-autosuggest';
import host from "../assets/js/host";
import moment from "moment";
var languages=[];


// Teach Autosuggest how to calculate suggestions for any given input value.


const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
       
         lang.name.toLowerCase().slice(0, inputLength) === inputValue
       
    )
};



// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion =>  suggestion.name ;




const renderSuggestion = suggestion => (
    <div>
        <p> </p>
        {suggestion.name} 
    </div>
);






class HotelSearch extends Component {
    constructor() {
        super();
        this.state = {
            volume: 0,
            horizontal: 10,
            data: [],
            value: '',
            valueTo: '',
            suggestions: [],
            suggestionsTo: [],
            Departing:'',
            Returning:'',
            FlightType:''

        };
    }

componentDidMount(){
	axios({
		url: host + `api/holet/cities`,
		method: "GET",
	  })
		.then(response => {
		  if (response.data) {
		   
			languages=response.data
		  }
  
  
		})
		.catch(function (error) {
  
		});
  
}

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
      
       
   

    };


    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


   
    // onchangeDepartDate(event){
    //     DepartDate=event.target.value;
    //     console.log(DepartDate)
    // }

    onChangeDeparting(value){
        this.setState({
            Departing:value
        })
    }
    onChangeReturning(value){
        this.setState({
            Returning:value
        })
    }


   OnChildrenChange(value){
    document.getElementById('ch1').style.display="none"
    document.getElementById('ch2').style.display="none"
    document.getElementById('ch3').style.display="none"
    document.getElementById('ch4').style.display="none"
    document.getElementById('ch5').style.display="none"

       if (value===1) {
           document.getElementById('ch1').style.display="block"
       }
       if (value===2) {
        document.getElementById('ch1').style.display="block"
        document.getElementById('ch2').style.display="block"

    }
    if (value===3) {
        document.getElementById('ch1').style.display="block"
        document.getElementById('ch2').style.display="block"
        document.getElementById('ch3').style.display="block"

    }
    if (value===4) {
        document.getElementById('ch1').style.display="block"
        document.getElementById('ch2').style.display="block"
        document.getElementById('ch3').style.display="block"
        document.getElementById('ch4').style.display="block"

    }
    if (value===5) {
        document.getElementById('ch1').style.display="block"
        document.getElementById('ch2').style.display="block"
        document.getElementById('ch3').style.display="block"
        document.getElementById('ch4').style.display="block"
        document.getElementById('ch5').style.display="block"

    }
}

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Enter City Name',
            value,
            name:"Destination",
            onChange: this.onChange,
            required:true
        };
        return (
            <Context.Consumer>
                {ctx => {
                    return (   
                        <div id="bookingH" className="section">

                            <div className="section-center">

                                <div className="container">
                                    <div className="row">
                                        <div className="booking-form">
                                            <form action="/HotelList" id="search">

											    <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">Destination</span>
                                                            <Autosuggest
                                                                className="form-control"
                                                                suggestions={suggestions}
                                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                                getSuggestionValue={getSuggestionValue}
                                                                renderSuggestion={renderSuggestion}
                                                                inputProps={inputProps}
                                                                required
                                                           />


                                                        </div>
                                                    </div>

                                                                                                 <div className="col-md-3">
                                                        <div className="form-group">
                                                            <span className="form-label">Check In</span>

                                                            <DatePicker className="form-control" id="Departing" placeholderText="YYYY-MM-DD" name="CheckIn" type="date" value={this.state.Departing}
                                                                onChange={(event) => {
                                                                    this.onChangeDeparting(moment(event).format('YYYY-MM-DD'))
                                                                    // DepartDate = event.target.value;
                                                                    // this.checkForm()
                                                                }}

                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group" id="Returning">
                                                            <span className="form-label" name="Returning" id="ReturningDate">Check Out</span>
                                                            <DatePicker className="form-control" placeholderText="YYYY-MM-DD" value={this.state.Returning}  type="date" name="CheckOut"
                                                                onChange={(event) => {
                                                                    this.onChangeReturning(moment(event).format('YYYY-MM-DD'))

                                                                   
                                                                }}
                                                                required  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label">Adults (12+)</span>
                                                            <select className="form-control"  id="Adults" name="Adults">
                                                                <option value="1"  defaultValue={1}>1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="3">4</option>
                                                                <option value="3">5</option>
                                                                <option value="3">6</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
											    </div>
                                                <div className="row">
                                                <div className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label" >Children (2-12)</span>
                                                            <select className="form-control" defaultValue={0}  id="Children"
                                                            name="Children"
                                                            onChange={(e)=>{
                                                                this.OnChildrenChange(e.target.value)
                                                            }}
                                                            >
                                                                <option value="0"  defaultValue={0}>0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
													<div id="ch1" className="col-md-2">
                                                        <div   className="form-group">
                                                            <span className="form-label">Child 1 Age</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="ch1">
                                                                <option value="2">0-2 Year</option>
                                                                <option value="3">3 Year</option>
                                                                <option value="4">4 Year</option>
                                                                <option value="5">5 Year</option>
                                                                <option value="6">6 Year</option>
                                                                <option value="7">7 Year</option>
                                                                <option value="8">8 Year</option>
                                                                <option value="9">9 Year</option>
                                                                <option value="10">10 Year</option>
                                                                <option value="11">11 Year</option>
                                                                <option value="12">12 Year</option>

                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                            
                                                    <div id="ch2" className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label">Child 2 Age</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="ch2">
                                                                 <option value="2">0-2 Year</option>
                                                                <option value="3">3 Year</option>
                                                                <option value="4">4 Year</option>
                                                                <option value="5">5 Year</option>
                                                                <option value="6">6 Year</option>
                                                                <option value="7">7 Year</option>
                                                                <option value="8">8 Year</option>
                                                                <option value="9">9 Year</option>
                                                                <option value="10">10 Year</option>
                                                                <option value="11">11 Year</option>
                                                                <option value="12">12 Year</option>

                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>	
                                                    <div id="ch3" className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label">Child 3 Age</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="ch3">
                                                                  <option value="2">0-2 Year</option>
                                                                <option value="3">3 Year</option>
                                                                <option value="4">4 Year</option>
                                                                <option value="5">5 Year</option>
                                                                <option value="6">6 Year</option>
                                                                <option value="7">7 Year</option>
                                                                <option value="8">8 Year</option>
                                                                <option value="9">9 Year</option>
                                                                <option value="10">10 Year</option>
                                                                <option value="11">11 Year</option>
                                                                <option value="12">12 Year</option>

                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                                    	<div id="ch4" className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label">Child 4 Age</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="ch4">
                                                                 <option value="2">0-2 Year</option>
                                                                <option value="3">3 Year</option>
                                                                <option value="4">4 Year</option>
                                                                <option value="5">5 Year</option>
                                                                <option value="6">6 Year</option>
                                                                <option value="7">7 Year</option>
                                                                <option value="8">8 Year</option>
                                                                <option value="9">9 Year</option>
                                                                <option value="10">10 Year</option>
                                                                <option value="11">11 Year</option>
                                                                <option value="12">12 Year</option>

                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                                    	<div id="ch5" className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label">Child 5 Age</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="ch5">
                                                                 <option value="2">0-2 Year</option>
                                                                <option value="3">3 Year</option>
                                                                <option value="4">4 Year</option>
                                                                <option value="5">5 Year</option>
                                                                <option value="6">6 Year</option>
                                                                <option value="7">7 Year</option>
                                                                <option value="8">8 Year</option>
                                                                <option value="9">9 Year</option>
                                                                <option value="10">10 Year</option>
                                                                <option value="11">11 Year</option>
                                                                <option value="12">12 Year</option>

                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
							
                            
                            						<div  id="navlinkDi" className="col-md-2">
                                
								<div style={{ cursor:  "pointer" }} className="Flights" onClick={()=>{

								
					   
			 if (this.state.Returning==="") {
						   toaster.danger("Please Fill All The Fields");
					   }
						else if (this.state.Departing==="") {
						   toaster.danger("Please Fill All The Fields");
					   }else{ 
						   // search
						   document.getElementById("search").submit();
					   }
				   }}>
								<span id="Back" className="ChooseaTourBtm">Show Hotels</span>
							</div>

				
                
					</div>
					<div className="col-md-2 ">
					<NavLink  to="/">
					<div className="BackBtmHotel">
						<span id="Back" className="ChooseaTourBtm" >
						 Back
						</span>
						</div>
						</NavLink>


					</div>
											    </div>
                                                <div className="row">
                                               
											    </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    )
                }}
            </Context.Consumer>
        );
    }
}

export default HotelSearch;