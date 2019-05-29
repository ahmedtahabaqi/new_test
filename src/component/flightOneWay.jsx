import React from "react";
import Component from "@reactions/component";
import Context from "./context.js";
import { Collapse } from 'react-bootstrap';
import { Icon } from 'evergreen-ui';
import NavBar from './NavBar';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../assets/js/host';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

const cookies = new Cookies();
class FlightOneWay extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            allFlight: []
        }
    }

    componentDidMount() {
        var formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };
        formData.append("Infant", 0);
        formData.append("Child", 0);
        formData.append("Adult", 1);
        formData.append("DepartureDate", '2019-05-31');
        formData.append("from", 'bgw');
        formData.append("to", 'bey');
        formData.append("direct", 0);
        formData.append("cabin", 3);

        axios({ url: host + "api/AirLines/oneway", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ allFlight: response.data.result.data })
                    // this.RenderCard(response.data.result.data)
                    console.log(response.data.result.data);
                }
            })
            .catch(function (error) {
                console.log(error.message);

            });
    }

    RenderCard() {
        var value = this.state.allFlight;
        let card1 = [];
        const { open } = this.state;

        for (let i = 0; i < value.length; i++) {
            if (value[i].stops === 0) {
                card1.push(
                    <div id='CardOneWayContiner'>
                        <div id='CardOneWayContent'>
                            <div id='LogoContinerNEwCard'>
                                <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].AirlineName}</div>
                            </div>

                            <div id='ContentCenterCardOneWay'>
                                <div id='FirstContentCenterCardOneWay'>
                                    <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[0]}</div>
                                    <div>{value[i].arrCityName[0]}</div>
                                </div>
                                <div id='SecondContentCenterCardOneWay'>
                                    <div id='UpLineArowInOneWay'>{value[i].totalDuration}</div>
                                    <div id='LineArowInOneWay' />
                                    <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>0 stop</span></div>
                                </div>
                                <div id='TheardContentCenterCardOneWay'>
                                    <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[0]}</div>
                                    <div>{value[i].depCityName[0]}</div>
                                </div>
                            </div>
                            <div id='btnOneWayCardContiner'>
                                <div id='btnOneWayCard'>
                                    select
                                </div>
                            </div>
                        </div>


                    </div>
                )
            }
            else if (value[i].stops === 1) {

                card1.push(
                    <div>
                        <Component initialState={{ open: false }}>
                            {({ state, setState }) => (
                                <div id='CardOneWayContiner'>
                                    <div id='CardOneWayContent'>
                                        <div id='LogoContinerNEwCard'>
                                            <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                            <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].AirlineName}</div>
                                        </div>

                                        <div id='ContentCenterCardOneWay'>
                                            <div id='FirstContentCenterCardOneWay'>
                                                <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[0]}</div>
                                                <div>{value[i].depCityName[0]}</div>
                                            </div>
                                            <div id='SecondContentCenterCardOneWay'>
                                                <div id='UpLineArowInOneWay'>{value[i].totalDuration}</div>
                                                <div id='LineArowInOneWay' />
                                                <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>1 stop</span></div>
                                            </div>
                                            <div id='TheardContentCenterCardOneWay'>
                                                <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[1]}</div>
                                                <div>{value[i].arrCityName[1]}</div>
                                            </div>
                                        </div>
                                        <div id='btnOneWayCardContiner'>
                                            <div id='btnOneWayCard'>
                                                Select
                                    </div>
                                            <div id='btnOneWayCard1' onClick={() => {
                                                setState({ open: true })

                                            }}

                                                aria-controls="example-collapse-text"
                                                aria-expanded={open}>
                                                Details
                                    </div>
                                        </div>
                                    </div>

                                    <Collapse in={state.open}>
                                        <div id="example-collapse-text" style={{ width: '100%' }}>
                                            <div id='LineDividerInOneWay' />
                                            <div id='detalsCardOneWayContiner'>
                                                <div id='CardOneWayContent'>
                                                    <div id='LogoContinerNEwCard'>
                                                        <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                                        <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].airNames[0]}</div>
                                                    </div>

                                                    <div id='ContentCenterCardOneWay'>
                                                        <div id='FirstContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[0]}</div>
                                                            <div>{value[i].depCityName[0]}</div>
                                                        </div>
                                                        <div id='SecondContentCenterCardOneWay'>
                                                            <div id='UpLineArowInOneWay'>{value[i].Duration[0]}</div>
                                                            <div id='LineArowInOneWay' />
                                                            <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>1 stop</span></div>
                                                        </div>
                                                        <div id='TheardContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[0]}</div>
                                                            <div>{value[i].arrCityName[0]}</div>
                                                        </div>
                                                    </div>
                                                    <div id='btnOneWayCardContiner'>

                                                    </div>
                                                </div>
                                                {/* ///////////////////////////////////////// */}
                                                <div id='CardOneWayContent'>
                                                    <div id='LogoContinerNEwCard'>
                                                        <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                                        <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].airNames[1]}</div>
                                                    </div>

                                                    <div id='ContentCenterCardOneWay'>
                                                        <div id='FirstContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[1]}</div>
                                                            <div>{value[i].depCityName[1]}</div>
                                                        </div>
                                                        <div id='SecondContentCenterCardOneWay'>
                                                            <div id='UpLineArowInOneWay'>{value[i].Duration[1]}</div>
                                                            <div id='LineArowInOneWay' />
                                                            <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>1 stop</span></div>
                                                        </div>
                                                        <div id='TheardContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[1]}</div>
                                                            <div>{value[i].arrCityName[1]}</div>
                                                        </div>
                                                    </div>
                                                    <div id='btnOneWayCardContiner'>
                                                        <div id='closeCollapsBtnContiner'
                                                            onClick={() => {
                                                                setState({ open: false })
                                                            }}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}>
                                                            <Icon color={'white'} icon="arrow-up" size={30} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            )}
                        </Component>
                    </div >
                )

            }
            else if (value[i].stops === 2) {

                card1.push(
                    <div>
                        <Component initialState={{ open: false }}>
                            {({ state, setState }) => (
                                <div id='CardOneWayContiner'>
                                    <div id='CardOneWayContent'>
                                        <div id='LogoContinerNEwCard'>
                                            <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                            <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].AirlineName}</div>
                                        </div>

                                        <div id='ContentCenterCardOneWay'>
                                            <div id='FirstContentCenterCardOneWay'>
                                                <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[0]}</div>
                                                <div>{value[i].depCityName[0]}</div>
                                            </div>
                                            <div id='SecondContentCenterCardOneWay'>
                                                <div id='UpLineArowInOneWay'>{value[i].totalDuration}</div>
                                                <div id='LineArowInOneWay' />
                                                <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>2 stop</span></div>
                                            </div>
                                            <div id='TheardContentCenterCardOneWay'>
                                                <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[2]}</div>
                                                <div>{value[i].arrCityName[2]}</div>
                                            </div>
                                        </div>
                                        <div id='btnOneWayCardContiner'>
                                            <div id='btnOneWayCard'>
                                                Select
                                            </div>
                                            <div id='btnOneWayCard1' onClick={() => {
                                                setState({ open: true })

                                            }}

                                                aria-controls="example-collapse-text"
                                                aria-expanded={open}>
                                                Details
                                             </div>
                                        </div>
                                    </div>

                                    <Collapse in={state.open}>
                                        <div id="example-collapse-text" style={{ width: '100%' }}>
                                            <div id='LineDividerInOneWay' />
                                            <div id='detalsCardOneWayContiner'>
                                                <div id='CardOneWayContent'>
                                                    <div id='LogoContinerNEwCard'>
                                                        <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                                        <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].airNames[0]}</div>
                                                    </div>

                                                    <div id='ContentCenterCardOneWay'>
                                                        <div id='FirstContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[0]}</div>
                                                            <div>{value[i].depCityName[0]}</div>
                                                        </div>
                                                        <div id='SecondContentCenterCardOneWay'>
                                                            <div id='UpLineArowInOneWay'>{value[i].Duration[0]}</div>
                                                            <div id='LineArowInOneWay' />
                                                            <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>2 stop</span></div>
                                                        </div>
                                                        <div id='TheardContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[0]}</div>
                                                            <div>{value[i].arrCityName[0]}</div>
                                                        </div>
                                                    </div>
                                                    <div id='btnOneWayCardContiner'>

                                                    </div>
                                                </div>
                                                {/* ///////////////////////////////////////// */}
                                                <div id='CardOneWayContent'>
                                                    <div id='LogoContinerNEwCard'>
                                                        <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                                        <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].airNames[1]}</div>
                                                    </div>

                                                    <div id='ContentCenterCardOneWay'>
                                                        <div id='FirstContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[1]}</div>
                                                            <div>{value[i].depCityName[1]}</div>
                                                        </div>
                                                        <div id='SecondContentCenterCardOneWay'>
                                                            <div id='UpLineArowInOneWay'>{value[i].Duration[1]}</div>
                                                            <div id='LineArowInOneWay' />
                                                            <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>2 stop</span></div>
                                                        </div>
                                                        <div id='TheardContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[1]}</div>
                                                            <div>{value[i].arrCityName[1]}</div>
                                                        </div>
                                                    </div>
                                                    <div id='btnOneWayCardContiner'>

                                                    </div>
                                                </div>
                                                {/* ///////////////////////////////////////// */}
                                                <div id='CardOneWayContent'>
                                                    <div id='LogoContinerNEwCard'>
                                                        <img width={150} src={`https://daisycon.io/images/airline/?width=600&height=150&iata=${value[i].AirlineCode}`} alt={value[i].AirlineCode} />
                                                        <div style={{ marginTop: 10, textAlign: 'center' }}>{value[i].airNames[2]}</div>
                                                    </div>

                                                    <div id='ContentCenterCardOneWay'>
                                                        <div id='FirstContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].depDateAndTime[2]}</div>
                                                            <div>{value[i].depCityName[2]}</div>
                                                        </div>
                                                        <div id='SecondContentCenterCardOneWay'>
                                                            <div id='UpLineArowInOneWay'>{value[i].Duration[2]}</div>
                                                            <div id='LineArowInOneWay' />
                                                            <div id='DownLineArowInOneWay'><span style={{ color: '#ad146a' }}>2 stop</span></div>
                                                        </div>
                                                        <div id='TheardContentCenterCardOneWay'>
                                                            <div style={{ fontWeight: 600, color: '#000' }}>{value[i].arrDateAndTime[2]}</div>
                                                            <div>{value[i].arrCityName[2]}</div>
                                                        </div>
                                                    </div>
                                                    <div id='btnOneWayCardContiner'>
                                                        <div id='closeCollapsBtnContiner'
                                                            onClick={() => {
                                                                setState({ open: false })
                                                            }}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}>
                                                            <Icon color={'white'} icon="arrow-up" size={30} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            )}
                        </Component>
                    </div >
                )

            }
        }
        if (card1.length > 0) {
            return card1
        }
    }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                            <NavBar />
                            <div id='filterNewoneWayContiner'>
                                {Selection1()}
                                {Selection2()}
                                {Selection3()}
                            </div>
                            <div id='NewOneWayContiner'>
                                {this.RenderCard()}
                            </div>

                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}
const Selection1 = () => (
    <Dropdown id='selectonsNeoOneWay'
        placeholder='Select Friend'
        fluid
        selection
        options={[
            { key: '0_stop', text: '0 stop', value: '0_stop' },
            { key: '1_stop', text: '1 stop', value: '1_stop' },
            { key: '2_stop', text: '2 stop', value: '2_stop' }
        ]}
    />
)
const Selection2 = () => (
    <Dropdown id='selectonsNeoOneWay'
        placeholder='Select Friend'
        fluid
        selection
        options={[
            { key: '0_stop', text: '0 stop', value: '0_stop' },
            { key: '1_stop', text: '1 stop', value: '1_stop' },
            { key: '2_stop', text: '2 stop', value: '2_stop' }
        ]}
    />
)
const Selection3 = () => (
    <Dropdown id='selectonsNeoOneWay'
        placeholder='Select Friend'
        fluid
        selection
        options={[
            { key: '0_stop', text: '0 stop', value: '0_stop' },
            { key: '1_stop', text: '1 stop', value: '1_stop' },
            { key: '2_stop', text: '2 stop', value: '2_stop' }
        ]}
    />
)
export default FlightOneWay;