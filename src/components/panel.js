import React from "react";
// LIBRARIES
import cx from "classnames";
// STORE - REDUX
import { connect } from "react-redux";

const Panel = props => (
  <div className="panel">
    <div className="panel--header">
      <div className="user-information flex-auto">
        <div className="name-status">
          <p className="name">
            <span>{props.name && props.name.slice(0, 3)}</span>
            {props.name.slice(3, props.name.length)}
          </p>
        </div>
      </div>

      <div className="panel-controls">
        <button className="button--icon panel-button--mute">
          <i className={cx("icon", "ion-ios-move")} />
        </button>
        <div
          className={cx("connection-dot", {
            online: props.socket.connected,
            offline: !props.socket.connected
          })}
          title={
            props.socket.connected ? "Connection Online" : "Connection Offline"
          }
        />
      </div>
    </div>

    <div className="panel--content">{props.children}</div>
  </div>
);

const mapStateToProps = ({ global }) => ({
  socket: global.socket
});
export default connect(mapStateToProps)(Panel);
