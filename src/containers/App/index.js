import React from "react";
// STORE - REDUX
import { connect } from "react-redux";
import { initiateSocket, successfulSocket } from "../../redux/actions/sockets";
import {
  requestAll,
  successTrades,
  successTicker,
  successOrderBook
} from "../../redux/actions/data";
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
    this.props.dispatch(requestAll());
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
      this.requestTrades(connection);
    }
  }

  requestTrades(connection) {
    if (connection) {
      connection.onerror = () => {
        console.log("Connection Error");
      };
      connection.onopen = () => {
        console.log("WebSocket connection Connected");

        let msgTrades = JSON.stringify({
          event: "subscribe",
          channel: "trades",
          pair: "BTCUSD"
        });
        let msgTicker = JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          pair: "tBTCUSD"
        });
        let msgOrderBook = JSON.stringify({
          event: "subscribe",
          channel: "book",
          pair: "tBTCUSD"
        });

        connection.send(msgTrades);
      };

      connection.onclose = () => {
        console.log("WebSocket connection Closed");
      };

      connection.onmessage = e => {
        if (typeof e.data === "string") {
          let response = JSON.parse(e.data);

          if (response[2]) {
            console.log(response);
            this.props.dispatch(successTrades(response[2]));
          }
        }
      };
    }
  }

  requestTicker(connection) {
    if (connection) {
      connection.onerror = () => {
        console.log("Connection Error");
      };
      connection.onopen = () => {
        console.log("WebSocket connection Connected");

        let msg = JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          pair: "tBTCUSD"
        });
        connection.send(msg);
      };

      connection.onclose = () => {
        console.log("WebSocket connection Closed");
      };

      connection.onmessage = e => {
        if (typeof e.data === "string") {
          let response = JSON.parse(e.data);

          if (response[2]) {
            console.log(response);
            this.props.dispatch(successTicker(response[2]));
          }
        }
      };
    }
  }

  requestOrderBook(connection) {
    if (connection) {
      connection.onerror = () => {
        console.log("Connection Error");
      };
      connection.onopen = () => {
        console.log("WebSocket connection Connected");

        let msg = JSON.stringify({
          event: "subscribe",
          channel: "book",
          pair: "tBTCUSD"
        });
        connection.send(msg);
      };

      connection.onclose = () => {
        console.log("WebSocket connection Closed");
      };

      connection.onmessage = e => {
        if (typeof e.data === "string") {
          let response = JSON.parse(e.data);

          if (response[2]) {
            console.log(response);
            this.props.dispatch(successOrderBook(response[2]));
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
