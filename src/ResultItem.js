import React, { Component } from "react";

class ResultItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.from}</td>
        <td>{this.props.to}</td>
        <td>{this.props.date}</td>
        <td>{this.props.time}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}

export default ResultItem;
