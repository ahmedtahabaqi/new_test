import React from "react";
import { Link } from "react-router-dom";
import Context from "../../component/context.js";
import {Badge,Image} from 'react-bootstrap';
import Cookies from "universal-cookie";
import {toaster} from 'evergreen-ui'
import axios from "axios";
import Home from "../../component/home";
import moment from "moment";
import host from "../../assets/js/host";
import openSocket from 'socket.io-client';

const hostsocket=`https://www.favorite-holiday.com/`;
var io = openSocket.connect(
  hostsocket,
  // host,
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
  }
);
io.on("disconnect", () => {
  toaster.danger("Server Connection Lost");
});
io.on("connect", () => {
  // toaster.notify("Real Time Active");
});
io.on("reconnect_attempt", attemptNumber => {
  toaster.warning("Attempting To Reconnect To Server "+attemptNumber);
});
const cookies = new Cookies();

class Clients extends React.Component {
  constructor() {
    super();
    this.state = {
        msg:'',
        chatUsers:[],
        userId:'',
        chatData:[],
        file:[]
    

    };
    this.SocketData()
  }

  SocketData() {



    io.on("chat", data => {
      this.componentDidMount()
        this.findByid(this.state.userId)
      console.log(data)

      // let Orders = [...this.state.OrdersOneWay, data];
    
      // var uniqueOrders = Orders.reduce((unique, o) => {
      //   if (!unique.some(obj => obj.Order_id === o.Order_id)) {
      //     unique.push(o);
      //   }
      //   return unique;
      // }, []);
      // this.setState({
      //   OrdersOneWay:uniqueOrders
      // });
    });

  }
componentDidMount(){
    var headers = {
        "Content-Type": "application/json",
        token: cookies.get("token")
      };
  
  
      axios({
        url: host + `api/Messages/users`,
        method: "GET",
        headers: headers
      })
        .then(response => {
            console.log(response.data)
            this.setState({
              chatUsers:response.data
            })
  
        })
        .catch(function (error) {
  
        });
}

findByid(item){
  console.log(item)
    var headers = {
        "Content-Type": "application/json",
        token: cookies.get("token")
      };
        axios({
          url: host + `api/Messages/admin/${item}`,
          method: "GET",
          headers: headers
        })
          .then(response => {
              console.log(response.data)
              this.setState({
                chatData:response.data
              })
    
          })
          .catch(function (error) {
    
          });
   
}
 onKeyDownNotEnter(){

    io.emit('typingMessage');

  

}
sendmsg(value){
    let formData = new FormData();

    if (value) {
      formData.append("file", value[0]);
    }
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    formData.append("to", this.state.userId);
    formData.append("body", this.state.msg);;
    axios({
      url: host + `api/Messages/add`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        // let Orders = [...this.state.chatData, data];
        this.findByid(this.state.userId)
        // this.setState({
        //     chatData:Orders
        // })

      })
      .catch(function (error) {
        console.log(error)
      });
}

  render() {
    return (
<div>
      <Context.Consumer>
        {ctx => {
          if (ctx.value.sesson.role === 1) {
            return (
                <div>
                  <div className="messaging">
      <div className="inbox_msg">
        <div className="inbox_people">
          <div className="headind_srch">
            <div className="recent_heading">
              <h4>Recent</h4>
            </div>
            <div className="srch_bar">
           <Link to="/dashboard">
           <i style={{fontSize:30,color:"red"}} class="fas fa-arrow-circle-left"></i></Link> 
              {/* <div className="stylish-input-group">
                <input type="text" className="search-bar"  placeholder="Search" />
                <span className="input-group-addon">
                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div> */}
            </div>
          </div>
          <div className="inbox_chat">
          {this.state.chatUsers.map(item => (
            <div key={item._id} className="chat_list active_chat" id="chatUser" onClick={()=>{
                this.setState({
                  userId:item.from._id,
                  chatData:[]
                })
                localStorage.setItem(item.from._id, JSON.stringify(item.count));
                console.log(item)
                this.findByid(item.from._id)
            }}>
            
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                <div className="chat_ib">
                  <h5>{item.from.name}  <Badge style={item.count-localStorage.getItem(item.from._id)>0? {}: { display: "none" }} id="msginfo" variant="danger">{item.count-localStorage.getItem(item.from._id)}</Badge> <span className="chat_date">{moment(item.uptime, "x").fromNow()}</span></h5>
                  <p>{item.body}</p>
                </div>
            
                {/* <p>   New Messages  
                  <Badge variant="danger">{item.count-localStorage.getItem(item.from._id)}</Badge>
                  </p> */}
              </div>
            </div>
          ))}






          </div>
        </div>
        <div className="mesgs">
          <div className="msg_history">
          {this.state.chatData.map(item => (
    <div>
            <div  style={item.from._id===ctx.value.sesson._id? {display: "none"}: {  }} className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
               
                  <p style={item.type==="text"? {}: { display: "none" }} > <Badge variant="secondary">{item.body}</Badge></p>
                  <Image style={item.type==="text"? { display: "none"}: { }} src={host+item.file} thumbnail  />
                  <span className="time_date"> {moment(item.uptime, "x").fromNow()}</span></div>
              </div>
            </div>
            <br></br>

            
            <div style={item.from._id===ctx.value.sesson._id? { }: { display: "none"}} className="outgoing_msg">
              <div className="sent_msg">
              <p style={item.type=== "text"? {}: { display: "none" }} >{item.body}</p>
      
                <Image style={item.type==="text"? { display: "none"}: { }} src={host+item.file} thumbnail  />

                <span className="time_date">{moment(item.uptime, "x").fromNow()}</span> </div>
            </div>
            </div>
          ))}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input type="text" className="write_msg" value={this.state.msg} onKeyDown={this.onKeyDownNotEnter.bind(this)} placeholder="Type a message" onChange={(e)=>{
                  this.setState({msg:e.target.value})
              }}/>
              <button className="msg_send_btn" type="button" onClick={()=>{
                this.sendmsg()
                  this.setState({
                      msg:''
                  })
              }}><i className="fa fa-paper-plane" ></i></button>
              
             {/* <input  type="file" style={{marginRight:50}}  onChange={(files)=>{
               console.log(files)
                // this.sendmsg()
                //   this.setState({
                //       msg:''
                //   })
              }}/> */}
              <div className="image-upload msg_send_btn" style={{marginRight:50,cursor:'pointer'}}>
    <label for="file-input">
    <i className="fa fa-paperclip" style={{textAlign:"center",marginTop:10,cursor:'pointer'}}></i>
    </label>

    <input id="file-input" type="file" onChange={(event)=>{
               console.log(event.target.files)
                this.sendmsg(event.target.files)
                  this.setState({
                      msg:''
                  })
              }}/>
</div>
            </div>
          </div>
        </div>
      </div>
      
      
     
      
    </div>
                </div>
            )
          } else {
            return(
              <Home/>
            )
          }

        }}
      </Context.Consumer>
      </div>
    );
  }
}

export default Clients;