import React from 'react';
import ReactDOM from 'react-dom';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Sector,
        Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { lineData, barData, pieData, COLORS, RADIAN } from './data.js';


export class SimpleLineChart extends React.Component {
  render () {
    return (
      <LineChart width={600} height={300} data={lineData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name" />
         <YAxis />
         <CartesianGrid strokeDasharray="3 3" />
         <Tooltip />
         <Legend />
         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}} />
         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export class SimpleBarChart extends React.Component {

  render () {
    return (
      <BarChart width={600} height={300} data={barData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
       <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}

export class SimplePieChart extends React.Component {
  render () {
    return (
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={pieData}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
          {
            pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};