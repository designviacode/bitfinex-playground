import React from "react";

class Sidebar extends React.Component {
  render() {
    const items = [
      {
        icon: "ion-ios-home",
        name: "Home",
        isActive: false // TODO: link this with router-location state from store
      },
      {
        icon: "ion-ios-trending-up",
        name: "Trading",
        isActive: true
      }
    ];
    return (
      <div className="sidebar">
        <ul>
          {items &&
            items.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`flex flex-row items-center ${item.isActive &&
                    "active"}`}
                >
                  <i className={`icon ${item.icon}`} />
                  <p className="text ttc">{item.name}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
