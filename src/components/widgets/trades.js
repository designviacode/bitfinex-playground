import React from "react";
// LIBRARIES
import PropTypes from "prop-types";
import cx from "classnames";
import Moment from "react-moment";
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

  renderRow(row, index) {
    return (
      <tr key={index}>
        <td>
          <i
            className={cx("icon", {
              "ion-ios-arrow-round-up": row.price,
              "ion-ios-arrow-round-down": !row.price
            })}
          />
        </td>
        <td className="tc">
          <Moment unix format="HH-mm:ss">
            {row.tmstp}
          </Moment>
        </td>
        <td className="tr text-danger">{row.price}</td>
        <td className="tr">{row.amount}</td>
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
            {props.trades.isLoading && <div className="loading" />}
            {!props.trades.isLoading &&
              props.trades &&
              props.trades.results.length > 0 &&
              props.trades.results.map((trade, index) =>
                this.renderRow(trade, index)
              )}
          </tbody>
        </table>
        {!props.trades.isLoading && props.trades.error && this.renderEmpty()}

        <p>{JSON.stringify(props.trades)}</p>
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
