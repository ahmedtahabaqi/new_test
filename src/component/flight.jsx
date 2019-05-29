import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "./context.js";
import { toaster } from 'evergreen-ui'
import 'react-rangeslider/lib/index.css'
import languages from "../assets/js/airports";
import DatePicker from "react-datepicker";
import Autosuggest from 'react-autosuggest';
import moment from "moment";
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.country.toLowerCase().slice(0, inputLength) === inputValue
        || lang.name.toLowerCase().slice(0, inputLength) === inputValue
        || lang.city.toLowerCase().slice(0, inputLength) === inputValue
        || lang.iata.toLowerCase().slice(0, inputLength) === inputValue
    ).slice(0, 5);
};

const getSuggestionsTo = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.country.toLowerCase().slice(0, inputLength) === inputValue
        || lang.name.toLowerCase().slice(0, inputLength) === inputValue
        || lang.city.toLowerCase().slice(0, inputLength) === inputValue
        || lang.iata.toLowerCase().slice(0, inputLength) === inputValue
    ).slice(0, 5);;
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion =>  suggestion.iata ;


const getSuggestionValueTo = suggestion =>  suggestion.iata ;
// Use your imagination to render suggestions.


const renderSuggestion = suggestion => (
    <div>
        <p> </p>
        {suggestion.country} , {suggestion.city} , {suggestion.name} , ({suggestion.iata})
    </div>
);
const renderSuggestionTo = suggestion => (
    <div>
        {suggestion.country} , {suggestion.city} , {suggestion.name} , ({suggestion.iata})
    </div>
);





class Flight extends Component {
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
            startDate: new Date(),

            Departing:'',
            Returning:'',
            FlightType:''

        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
      
       
   

    };
    onChangeTo = (event, { newValue }) => {
        this.setState({
            valueTo: newValue
        });
     
       
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
    onSuggestionsFetchRequestedTo = ({ value }) => {
        this.setState({
            suggestionsTo: getSuggestionsTo(value)
        });
    };
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    onSuggestionsClearRequestedTo = () => {
        this.setState({
            suggestionsTo: []
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
   onChangeFlightType(value){
    this.setState({
        FlightType:value
    })
   }
    render() {
        const { value, suggestions } = this.state;
        const {  suggestionsTo } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'City or Airport or Country',
            value,
            name:"from",
            onChange: this.onChange,
            required:true
        };
        const inputPropsTo = {
            placeholder: 'City or Airport or Country',
            value: this.state.valueTo,
            name:"to",
            onChange: this.onChangeTo,
            required:true
        };
        return (
            <Context.Consumer>
                {ctx => {
                    return (   
                        <div id="booking" className="section">

                            <div className="section-center">

                                <div className="container">
                                    <div className="row">
                                        <div className="booking-form">
                                            <form action="/flightlist" id="search">
                                                <div className="form-group">
                                                    <div className="form-checkbox">
                                                        <label >
                                                            <input type="radio" id="roundtrip" name="flight-type" value="Roundtrip"
                                                                onChange={(event) => {

                                                                    this.onChangeFlightType(event.target.value)

                                                                    // ReturnDate = "";
                                                                    // this.checkForm()
                                                                }}
                                                                required  />
                                                            <span></span>Roundtrip
                                                    </label>
                                                        <label >
                                                            <input type="radio" id="one-way" name="flight-type" value="Oneway"
                                                                onChange={(event) => {
                                                                    this.onChangeFlightType(event.target.value)
                                                                    // trip = event.target.value;
                                                                    // ReturnDate = "";
                                                                    // document.getElementById("Returning").style.visibility = 'hidden';
                                                                    // document.getElementById("ReturningDate").required=false;

                                                                   
                                                                   
                                                                }} 
                                                                required/>
                                                            <span></span>One way
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Flying from</span>
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
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Flyning to</span>
                                                            <Autosuggest
                                                                className="form-control"
                                                                suggestions={suggestionsTo}
                                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedTo}
                                                                onSuggestionsClearRequested={this.onSuggestionsClearRequestedTo}
                                                                getSuggestionValue={getSuggestionValueTo}
                                                                renderSuggestion={renderSuggestionTo}
                                                                inputProps={inputPropsTo}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <span className="form-label">Departing</span>
                                                            <DatePicker className="form-control" id="Departing" placeholderText="YYYY-MM-DD" name="Departing"   minDate={new Date()} type="date" value={this.state.Departing}
                                                                onChange={(event) => {
                                                                    this.onChangeDeparting(moment(event).format('YYYY-MM-DD'))
                                                                    // DepartDate = event.target.value;
                                                                    
                                                                    console.log(moment(event).format('YYYY-MM-DD'))
                                                                    // this.checkForm()
                                                                }}

                                                                dateFormat="yyyy-MM-dd" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group" id="Returning">
                                                            <span className="form-label"  id="ReturningDate">Returning</span>
                                                            <DatePicker minDate={new Date()} name="Returning" value={this.state.Returning} className="form-control" type="date" placeholderText="YYYY-MM-DD" 
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
                                                                <option value="3">7</option>
                                                                <option value="3">8</option>
                                                                <option value="3">9</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <span className="form-label" >Children (2-12)</span>
                                                            <select className="form-control" defaultValue={0}  id="Children" name="Children">
                                                                <option value="0"  defaultValue={1}>0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="3">4</option>
                                                                <option value="3">5</option>
                                                                <option value="3">6</option>
                                                                <option value="3">7</option>
                                                                <option value="3">8</option>
                                                                <option value="3">9</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <span className="form-label">Infant (0-2)</span>
                                                            <select className="form-control" defaultValue={0} id="class" name="Infant">
                                                                <option value="0"  defaultValue={1}>0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="3">4</option>
                                                                <option value="3">5</option>
                                                                <option value="3">6</option>
                                                                <option value="3">7</option>
                                                                <option value="3">8</option>
                                                                <option value="3">9</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <span className="form-label">Travel className</span>
                                                            <select className="form-control" id="className" name="class">
                                                                <option value="e"  defaultValue={'e'}>Economy class</option>
                                                                <option value="b">Business class</option>
                                                                <option value="f">First class</option>
                                                            </select>
                                                            <span className="select-arrow"></span>
                                                        </div>
                                                    </div>
                                              
                                                    <div  id="navlinkDi" className="col-md-3" >
                                
                                                                <div style={{ cursor:  "pointer" }} className="Flights" onClick={()=>{
                                                       
                                                       if (this.state.FlightType==="") {
                                                           toaster.danger("Please Select Flight Type");
                                                       }else if (this.state.FlightType==="Roundtrip"&&this.state.Returning==="") {
                                                           toaster.danger("Please Fill All The Fields");
                                                       }
                                                        else if (this.state.Departing==="") {
                                                           toaster.danger("Please Fill All The Fields");
                                                       }else{ 
                                                           // search
                                                           document.getElementById("search").submit();
                                                       }
                                                   }}>
                                                                <span id="Back" className="ChooseaTourBtm" >Show Flights</span>
                                                            </div>

                                                
                                                    </div>
                                                    <div className="col-md-3">
                                                    <NavLink  to="/">
                                                    <div className="BackBtm">
                                                        <span id="Back" className="ChooseaTourBtm" >
                                                         Back
                                                        </span>
                                                        </div>
                                                        </NavLink>


                                                    </div>
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

export default Flight;