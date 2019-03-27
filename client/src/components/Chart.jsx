import React from 'react';
import PropTypes from 'prop-types';
import '../style/app.css';

export default class Chart extends React.Component {
  static propTypes = {
    loadAverages: PropTypes.arrayOf(PropTypes.shape({
      avg: PropTypes.number,
      timeStamp: PropTypes.number
    }))
  }

  static defaultProps = {
    loadAverages: [],
    color: '#2196F3',
    svgHeight: 300,
    svgWidth: 700
  }

  getMinX() {
    const { loadAverages } = this.props;
    // return loadAverages[0].timeStamp;
    return 0;
  }

  getMaxX() {
    const { loadAverages } = this.props;
    return loadAverages.length - 1;
    // return loadAverages[loadAverages.length - 1].timeStamp;
  }

  getYs(){
    const { loadAverages } = this.props;
    return loadAverages.map(d => d.avg)
  }

  getMinY() {
    return Math.min(...this.getYs());
  }

  getMaxY() {
    return Math.max(...this.getYs());
  }

  getSvgX(x) {
    const { svgWidth } = this.props;
    return (x / this.getMaxX() * svgWidth);
  }

  getSvgY(y) {
    const { svgHeight } = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }

  createPath() {
    const { loadAverages, color } = this.props;

    if (loadAverages.length === 0) return null;

    // line starts at first x and y coordinate
    let pathD = "M " + this.getSvgX(0) + " " +
      this.getSvgY(loadAverages[0].avg) + " ";

    // for each value in loadAverages array, we will return a "L" (line)
    // to the next x and y coordinate
    pathD += loadAverages.map((point, i) => {
      return "L " + this.getSvgX(i) + " " +
        this.getSvgY(point.avg) + " ";
    });

    return (
      <path className="chart-path" d={pathD} style={{stroke: color}} />
    );
  }

  createAxis() {
    const minX = this.getMinX(),
          maxX = this.getMaxX(),
          minY = this.getMinY(),
          maxY = this.getMaxY();

    return (
      <g className='chart-axis'>
        <line
          x1={ this.getSvgX(0) } y1={ this.getSvgY(0) }
          x2={ this.getSvgX(maxX) } y2={ this.getSvgY(0) } />
        <line
          x1={ this.getSvgX(0) } y1={ this.getSvgY(0) }
          x2={ this.getSvgX(0) } y2={ this.getSvgY(maxY) } />
      </g>
    )
  }

  render() {
    const { svgHeight, svgWidth } = this.props;

    return (
      <div className='chart'>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          { this.createPath() }
          { this.createAxis() }
        </svg>
      </div>
    )
  }

}
