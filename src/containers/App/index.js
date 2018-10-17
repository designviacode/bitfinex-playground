import React from "react";
// CONTAINERS
import Trading from "../trading";
// COMPONENTS
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
// LIBRARIES
// import io from "socket.io-client";
var W3CWebSocket = require("websocket").w3cwebsocket;

class App extends React.Component {
  state = {
    socket: null
  };

  componentWillMount() {
    // if (this.checkSocketConnection()) {
    this.initiateSocketConnection();
    // }
  }

  componentDidMount() {
    // this.initiateSocketConnection();

    var client = new W3CWebSocket(
      "wss://api.bitfinex.com/ws/2",
      "echo-protocol"
    );

    client.onerror = () => {
      console.log("Connection Error");
    };

    client.onopen = () => {
      console.log("WebSocket Client Connected");

      let msg = JSON.stringify({
        event: "subscribe",
        channel: "trades",
        pair: "BTCUSD"
      });
      client.send(msg);
    };

    client.onclose = () => {
      console.log("echo-protocol Client Closed");
    };

    client.onmessage = e => {
      if (typeof e.data === "string") {
        let response = JSON.parse(e.data);

        if (response[2]) {
          console.log("Price:", response[2][3], "Quantity:", response[2][2]);
        }
      }
    };
  }

  componentWillUnmount() {
    if (this.checkSocketConnection()) {
      this.state.socket.close();
    }
  }

  checkSocketConnection() {
    return this.state.socket && this.state.socket.connected;
  }

  initiateSocketConnection() {
    // const socketConnection = new WebSocket("wss://api.bitfinex.com/ws/2");
    // socketConnection.on("open", () => {
    //   socketConnection.subscribeTrades("tEOSUSD");
    //   socketConnection.auth();
    // });
    //
    // console.log(socketConnection);
    // ws.connect("wss://api.bitfinex.com/ws/2");
  }

  initiateSocketListeners() {}

  render() {
    return (
      <div className="platform">
        <Navbar />

        <div className="flex flex-row">
          <Sidebar />
          <div className="app--container">
            <Trading />
          </div>
        </div>

        <div className="app--background" />
      </div>
    );
  }
}

export default App;
