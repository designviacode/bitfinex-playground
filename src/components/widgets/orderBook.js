import React from "react";
// LIBRARIES
import PropTypes from "prop-types";
import cx from "classnames";
import moment from "moment";
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

  renderRow(row, index) {
    return (
      <tr key={index}>
        <td>
          <p>{JSON.stringify(row)}</p>
          <i
            className={cx("icon", {
              "ion-md-arrow-round-up": true,
              "ion-md-arrow-round-down": false
            })}
          />
        </td>
        <td className="tc">{}</td>
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
            {!props.orderBook.isLoading &&
              props.orderBook &&
              props.orderBook.results.length > 0 &&
              props.orderBook.results.map((order, index) =>
                this.renderRow(order, index)
              )}
          </tbody>
        </table>

        {props.orderBook.isLoading && (
          <div className="w-100 tc flex items-center" style={{ height: 150 }}>
            <div className="loading center" />
          </div>
        )}
        {!props.orderBook.isLoading &&
          props.orderBook.error &&
          this.renderEmpty()}
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
