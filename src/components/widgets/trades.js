import React from "react";
// LIBRARIES
import PropTypes from "prop-types";
import cx from "classnames";
// STORE - REDUX
import { connect } from "react-redux";
// COMPONENTS
import Panel from "../panel";

class Trades extends React.Component {
  renderHeader() {
    return (
      <tr>
        <th />
        <th className="tc">Time</th>
        <th className="tr">Price</th>
        <th className="tr">Amount</th>
      </tr>
    );
  }

  renderRow(row) {
    return (
      <tr>
        <td>
          <i
            className={cx("icon", {
              "ion-ios-arrow-round-up": true,
              "ion-ios-arrow-round-down": false
            })}
          />
        </td>
        <td className="tc">01.07</td>
        <td className="tr text-bright">$15.21</td>
        <td className="tr text-danger">-$1.13</td>
      </tr>
    );
  }

  renderEmpty() {
    return (
      <div className="tc w-100 lh-copy">
        <h3 className="font-secondary f3 fw5">No Trades to Display</h3>
      </div>
    );
  }

  render() {
    const { props } = this;

    return (
      <Panel name={props.title}>
        <table className="table table-compact smaller mb-0">
          <thead>{this.renderHeader()}</thead>
          <tbody>
            {props.isLoading && <div className="loading" />}
            {!props.isLoading &&
              props.trades &&
              props.trades.length > 0 &&
              props.trades.map((trade, index) => this.renderRow(trade, index))}
          </tbody>
        </table>
        {!props.isLoading && props.trades.error && this.renderEmpty()}
      </Panel>
    );
  }
}

Trades.propTypes = {
  title: PropTypes.string
};
Trades.defaultProps = {
  title: "Trades"
};
const mapStateToProps = ({ global, data }) => ({
  trades: data.trades
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trades);
