import React from "react";
// STORE - REDUX
import { connect } from "react-redux";
import { initiateSocket, successfulSocket } from "../../redux/actions/sockets";
import { successTrades } from "../../redux/actions/data";
// CONTAINERS
import Trading from "../trading";
// COMPONENTS
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
// LIBRARIES
const W3CWebSocket = require("websocket").w3cwebsocket;

class App extends React.Component {
  componentWillMount() {
    if (!this.props.socket.connected && this.props.socket.connection) {
      this.initSocket();
    }
  }

  componentDidMount() {
    this.initSocket();
  }

  componentWillUnmount() {
    if (this.checkSocketConnection()) {
      this.state.socket.close();
    }
  }

  checkSocketConnection() {
    return this.state.socket && this.state.socket.connected;
  }

  initSocket() {
    let self = this;

    let socketConnected = new Promise((resolve, reject) => {
      let socketConnection = new W3CWebSocket(
        "wss://api.bitfinex.com/ws/2",
        "echo-protocol"
      );

      this.props.initiateSocket(socketConnection);
      this.props.successfulSocket(socketConnection);
      resolve(socketConnection);
    });

    socketConnected
      .then(connection => {
        if (connection) {
          // alert(JSON.stringify(connection));
          console.log(connection);
          this.initiateSocketListeners(connection);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  initiateSocketListeners(connection) {
    if (connection) {
      connection.onerror = () => {
        console.log("Connection Error");
      };
      connection.onopen = () => {
        console.log("WebSocket this.state.socketConnection Connected");

        let msg = JSON.stringify({
          event: "subscribe",
          channel: "trades",
          pair: "BTCUSD"
        });
        connection.send(msg);
      };

      connection.onclose = () => {
        console.log("echo-protocol this.state.socketConnection Closed");
      };

      connection.onmessage = e => {
        if (typeof e.data === "string") {
          let response = JSON.parse(e.data);

          if (response[2]) {
            console.log(response);
            console.log("Price:", response[2][3], "Quantity:", response[2][2]);
            this.props.dispatch(successTrades(response[2]));
          }
        }
      };
    }
  }

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

const mapStateToProps = ({ global }) => ({
  global,
  socket: global.socket
});
const mapDispatchToProps = dispatch => ({
  dispatch,
  initiateSocket: () => dispatch(initiateSocket()),
  successfulSocket: connection => dispatch(successfulSocket(connection))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
