import React from "react";
import Context from "./context.js";
import Logo from "../assets/img/HomeLogo.png";
import Home from "./home";
import NavBar from "./NavBar";


class Invoice extends React.Component {
    constructor() {
        super();
        this.state = {
            Invoice:[],
        };
    }

    componentDidMount(){
        var Invoice = localStorage.getItem('Invoice');
        if (Invoice) {
            Invoice=JSON.parse(Invoice);  
            this.setState({
                Invoice:Invoice
            })
        } else {
            this.setState({
                Invoice:"NoN"
            })
        }

    }

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (this.state.Invoice!=="NoN") {
                        return (
                            <div>
                             <NavBar/>
                             <div className="invoice-box">
            <table cellPadding="0" cellSpacing="0">
            <tbody>
                <tr className="top">
                    <td colSpan="2">
                        <table>
                            <tbody>
                            <tr>
                                <td className="title">
                                    <img id='invLogo' src={Logo} alt='img'/>
                                </td>
                                
                                <td>
                                    Invoice #: {this.state.Invoice.InvoiceID}<br/>
                                    Created:  {this.state.Invoice.Created}<br/>
                             
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="information">
                    <td colSpan="2">
                        <table>
                        <tbody>
                            <tr>
                                <td>
                                Turkey – Istanbul.<br/>
                                Ergenekon Mah. Halaskargazi Cad<br/>
                                19/A - Sisli<br/>
                                info@favorite-holiday.com<br/>
                                +90 538 443 3030
                                </td>
                                
                                <td>
                                {this.state.Invoice.Country}<br/>
                                {this.state.Invoice.name}<br/>
                                {this.state.Invoice.Email}<br/>
                                {this.state.Invoice.phone}
                                </td>
                            </tr>
                            </tbody>
                       </table>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="heading">
                    <td>
                        Payment Method
                    </td>
                    
                    <td>
                     
                    Credit Card Number#
    
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="details">
                    <td>
                    {this.state.Invoice.CreditCard}
                    </td>
                    
                    <td>
                    **** **** **** {this.state.Invoice.Cardlast4}
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="heading">
                    <td>
                        Item
                    </td>
                    
                    <td>
                        Price
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="item">
                    <td>
                    {this.state.Invoice.type} Ticket 
                    </td>
                    
                    <td>
                        $ {this.state.Invoice.Price}
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr className="total">
                    <td></td>
                    
                    <td>
                       Total: ${this.state.Invoice.Price}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
                              
                            </div>
                        ) 
                    }else{
                        return(
                            <div>
                                <Home/>
                            </div>
                        )
                    }

                }}
            </Context.Consumer>
        );
    }
}

export default Invoice;