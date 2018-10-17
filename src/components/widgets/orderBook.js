import React from "react";
// LIBRARIES
import PropTypes from "prop-types";
import cx from "classnames";
// STORE - REDUX
import { connect } from "react-redux";
// COMPONENTS
import Panel from "../panel";

class OrderBook extends React.Component {
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
        <h3 className="font-secondary f3 fw5">No Orders to Display</h3>
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
              props.orderBook &&
              props.orderBook.length > 0 &&
              props.orderBook.map((order, index) =>
                this.renderRow(order, index)
              )}
          </tbody>
        </table>
        {!props.isLoading && props.orderBook.error && this.renderEmpty()}
      </Panel>
    );
  }
}

OrderBook.propTypes = {
  title: PropTypes.string
};
OrderBook.defaultProps = {
  title: "Order Book"
};
const mapStateToProps = ({ global, data }) => ({
  orderBook: data.orderBook
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
