import React from "react";
// LIBRARIES
import Helmet from "react-helmet";
import cx from "classnames";
// STORE - REDUX
import { connect } from "react-redux";
// COMPONENTS
import { Panel } from "../../components";
import { HeroChart, Trades, Orders } from "../../components/widgets";

class Trading extends React.Component {
  render() {
    const { props } = this;
    const title = "Primary / Secondary Pair Price";

    return (
      <div className="page-view trading">
        <Helmet title={title} />

        <div className="flex flex-column">
          <HeroChart />

          <div className="flex flex-column flex-row-l">
            <div className="dn db-ns">
              <Panel name="Ticker" />
            </div>

            <div className="w-100 w-two-thirds-l">
              <Orders />
            </div>
            <div className="w-100 w-two-thirds-l">
              <Trades />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  global
});
export default connect(mapStateToProps)(Trading);
