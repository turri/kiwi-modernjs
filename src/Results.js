import React, { Component } from "react";
import ResultItem from "./ResultItem";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      rowsPerPage: 5
    };

    this.navToPage = this.navToPage.bind(this);
  }

  /**
   * Convert Timestam to UTC
   * @param{Number} nTimestamp
   * @returns {String} formatted date
   */
  timestampToUTC(nTimestamp) {
    return new Date(nTimestamp).toUTCString();
  }

  /**
   * Handler for click on pagination btn
   */
  navToPage(event) {
    event.preventDefault();
    let iPage = parseInt(event.target.textContent);

    this.setState({ currentPage: iPage });
  }

  /**
   * Create bootstrap paginations
   * @param{Number} iPages
   * @returns{Array} array of jsx objects
   */
  createPagination(iPages) {
    let aPaginations = [];
    for (let i = 1; i <= iPages; i++) {
      var bActive = this.state.currentPage === i ? "active" : "";

      aPaginations.push(
        <li className={"page-item " + bActive}>
          <a
            className="page-link"
            onClick={this.navToPage}
            href="javascript:void(0)"
          >
            {i}
          </a>
        </li>
      );
    }

    return aPaginations;
  }

  render() {
    let results = "";
    let paginations = [];
    if (typeof this.props.data.data !== "undefined") {
      let iPages = Math.ceil(
        this.props.data.data.length / this.state.rowsPerPage
      );

      paginations = this.createPagination(iPages);

      results = this.props.data.data.map(
        function(item) {
          return (
            <ResultItem
              from={item.cityFrom}
              to={item.cityTo}
              date={this.timestampToUTC(item.dTimeUTC * 1000)}
              time={item.fly_duration}
              price={item.price}
            />
          );
        }.bind(this)
      );
    }

    results = results.slice(
      (this.state.currentPage - 1) * this.state.rowsPerPage,
      this.state.currentPage * this.state.rowsPerPage
    );

    if (results.length) {
      return (
        <div>
          <div className="row results">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price(EUR)</th>
                </tr>
              </thead>
              <tbody>{results}</tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {paginations}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
    } else {
      /* No content */
      return null;
    }
  }
}

export default Results;
