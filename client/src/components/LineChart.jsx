import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import '../styles/app.css';

export default class Chart extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    loadAverages: PropTypes.arrayOf(PropTypes.shape({
      avg: PropTypes.number,
      time: PropTypes.string
    })),
    height: PropTypes.number,
    width: PropTypes.number
  }

  static defaultProps = {
    color: '#556B2F', // olive green
    loadAverages: [],
    height: 600,
    width: 900
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.loadAverages !== nextProps.loadAverages;
  }

  renderChart() {
    const { height, width, loadAverages, color } = this.props;

    return (
      <ResponsiveContainer>
        <LineChart width={width} height={height} data={loadAverages}>
          <Line
            type='monotone'
            dataKey='avg'
            stroke={ color }
            activeDot={ {r: 8} }
            isAnimationActive
            animationDuration={200}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  render() {
    return (
      <div className='chart'>
        { this.renderChart() }
      </div>
    )
  }
}
