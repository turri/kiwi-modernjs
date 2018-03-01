import React, { Component } from "react";
import Results from "./Results";
import Autocomplete from "react-autocomplete";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "Bratislava",
      to: "Barcelona",
      date: "2018-03-01",
      data: [],
      suggestions: []
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Format dateformat from yyyy-mm-dd to dd/mm/yyyy
   * @param {sDate} value from input[date]
   * @returns {String} formatted date
   */
  formatDate(sDate) {
    let aParts = sDate.split("-");
    return aParts[2] + "/" + aParts[1] + "/" + aParts[0];
  }

  search(event) {
    event.preventDefault();

    let sFormatedDate = this.formatDate(this.state.date);

    let url =
      "https://api.skypicker.com/flights?flyFrom=" +
      this.state.from +
      "&to=" +
      this.state.to +
      "&dateFrom=" +
      sFormatedDate +
      "&dateTo=" +
      sFormatedDate +
      "&partner=picky&partner_market=us";

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      });
  }

  handleChange(event) {
    let inputName = event.target.name;
    let value = event.target.value;

    this.setState({ [inputName]: value });
  }

  /**
   * Returns array of place suggestions
   */
  getSuggestions(sTerm) {
    let url =
      "https://api.skypicker.com/locations/?term=" +
      sTerm +
      "&v=2&locale=en-US";
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ suggestions: json.locations });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <form
                className="form-horizontal"
                role="form"
                onSubmit={this.search}
              >
                <div className="form-group row">
                  <label htmlFor="from" className="col-form-label col-sm-2">
                    From
                  </label>
                  <div className="col-sm-10">
                    <Autocomplete
                      value={this.state.from}
                      items={this.state.suggestions}
                      onChange={(event, value) => {
                        if (value.length > 1) {
                          this.getSuggestions(value);
                        }
                        this.setState({ from: value });
                      }}
                      onSelect={(value, item) => {
                        this.setState({ from: value });
                      }}
                      renderInput={props => (
                        <input
                          name="from"
                          className="form-control"
                          {...props}
                        />
                      )}
                      renderMenu={children => (
                        <div className="menu" htmlStyle="z-index: 1000">
                          {children}
                        </div>
                      )}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className={`item ${
                            isHighlighted ? "item-highlighted" : ""
                          }`}
                          key={item.abbr}
                        >
                          {item.name}
                        </div>
                      )}
                      getItemValue={item => item.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="to" className="col-sm-2 col-form-label">
                    To
                  </label>
                  <div className="col-sm-10">
                    <Autocomplete
                      value={this.state.to}
                      items={this.state.suggestions}
                      onChange={(event, value) => {
                        if (value.length > 1) {
                          this.getSuggestions(value);
                        }
                        this.setState({ to: value });
                      }}
                      onSelect={(value, item) => {
                        this.setState({ to: value });
                      }}
                      renderInput={props => (
                        <input name="to" className="form-control" {...props} />
                      )}
                      renderMenu={children => (
                        <div className="menu" htmlStyle="z-index: 1000">
                          {children}
                        </div>
                      )}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className={`item ${
                            isHighlighted ? "item-highlighted" : ""
                          }`}
                          key={item.abbr}
                        >
                          {item.name}
                        </div>
                      )}
                      getItemValue={item => item.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="date" className="col-sm-2 col-form-label">
                    Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      id="date"
                      placeholder="Date"
                      value={this.state.date}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label" />
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Results data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
