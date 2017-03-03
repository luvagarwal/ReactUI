import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Dropdown, Checkbox, Form, Radio } from 'semantic-ui-react'

import { SimpleLineChart, SimpleBarChart, SimplePieChart } from './customcharts.jsx';


export class ChartOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = [];
    this.props.chartTypes.forEach((option) => {
      options.push(
        <Form.Field key={option}>
          <Radio
            label={option}
            name='radioGroup'
            value={option}
            checked={option === this.props.checkedOption}
            onChange={this.props.handleChartTypeChange}
            slider
          />
        </Form.Field>
      );
    });
    return (
      <div className="options-div-inner">
        <Form>
          <Form.Group inline>
            {options}
          </Form.Group>
        </Form>
      </div>
    )
  }
}

function Chart(props) {
  let chart;
  switch (props.chartType) {
    case 'Bar':
      chart = <SimpleBarChart />;
      break;
    case 'Pie':
      chart = <SimplePieChart />;
      break;
    case 'Line':
      chart = <SimpleLineChart />;
      break;
  }
  return (
    <div className="chart">
      {chart}
    </div>
  );
}

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      query: "",
      chartType: "",
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    this.queries = [];
  }

  handleChartTypeChange(e, { value }) {
    this.setState({ chartType: value })
  }

  setQueries() {
    this.queries = {
      "value1": {
        "text": "query 1",
        "chartTypes": ['Bar', 'Pie', 'Line'],
      },
      "value2": {
        "text": "query 2",
        "chartTypes": ['Bar', 'Pie'],
      },
      "value3": {
        "text": "query 3",
        "chartTypes": ['Bar', 'Pie', 'Line'],
      },
      "value4": {
        "text": "query 4",
        "chartTypes": ['Bar', 'Line'],
      }
    }

    this.setState({
      loading: false,
      query: "value1",
      chartType: "Bar"
    })
  }

  componentDidMount() {
    // Fetch queries from server
    setTimeout(() => this.setQueries(), 1);
  }

  getQueries() {
    let queries = [];
    Object.keys(this.queries).forEach((key) => {
      let query = this.queries[key];
      queries.push({
        "text": query.text,
        "value": key,
      });
    });
    return queries;
  }

  getChartTypes() {
    if (this.state.loading) {
      return [];
    }
    return this.queries[this.state.query]['chartTypes'];
  }

  handleQueryChange(event, data) {
    console.log(data);
    this.setState({
      query: data.value
    });
  }

  render() {
    const placeholder = (this.state.loading) ? 'Loading queries ...' : 'Select Query';
    return (
      <div>
        <Dropdown placeholder={placeholder} fluid selection options={this.getQueries()} onChange={this.handleQueryChange}/>
        <ChartOptions chartTypes={this.getChartTypes()} handleChartTypeChange={this.handleChartTypeChange} checkedOption={this.state.chartType} />
        <Chart chartType={this.state.chartType} />
      </div>
    );
  }
}

