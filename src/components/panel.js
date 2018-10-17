import React from "react";
// LIBRARIES
import cx from "classnames";

const Panel = props => (
  <div className="panel">
    <div className="panel--header">
      <div className="user-information flex-auto">
        <div className="name-status">
          <p className="name">{props.name}</p>
        </div>
      </div>

      <div className="panel-controls">
        <button className="button--icon panel-button--mute">
          <i className={cx("icon", "ion-ios-move")} />
        </button>
      </div>
    </div>

    <div className="panel--content">{props.children}</div>
  </div>
);

export default Panel;
