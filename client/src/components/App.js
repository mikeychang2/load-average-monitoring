import React from 'react';
import { initializeLoadAvgs, updateLoadAverages } from '../utils/loadAverageUtil';
import { isHighLoadAlert } from '../utils/alertsUtil';
import LineChart from '../components/LineChart';
import Messages from '../components/Messages';
import '../styles/app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.timerId = null;

    this.state = {
      alerts: [],
      data: initializeLoadAvgs(),
      hasError: false,
      hasHighLoadAlert: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    this.handleResponse();

    this.timerId = setInterval(
      this.handleResponse,
      10000 // 10s intervals
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  callBackendAPI = async () => {
    const response = await fetch('/load_averages');
    const body = await response.json();

    if (response.status !== 200) {
      this.setState({ error: true });
    }

    return body;
  }

  handleResponse = () => {
    this.callBackendAPI()
      .then(res => {
        this.setState(prevState => ({
          data: updateLoadAverages(prevState.data, res.averages)
        }))
      })
      .then(() => {
        this.handleAlerts();
      })
      .catch(err => console.log(err));
  }

  handleAlerts = () => {
    const { data, alerts } = this.state,
          currentLoad = data[data.length-1],
          hasHighLoadAlert = isHighLoadAlert(data);

    // high load above 1 alert
    if (!this.state.hasHighLoadAlert && hasHighLoadAlert) {
      this.setState(prevState => ({
        alerts: [{
          type: 'HIGH_LOAD',
          message: `High load generated an alert - load = ${currentLoad.avg},`
           + ` triggered at ${currentLoad.time}`
        }, ...alerts]
      }));
    } else if (this.state.hasHighLoadAlert && !hasHighLoadAlert) {
      this.setState(prevState => ({
        alerts: [{
          type: 'RECOVERED',
          message: `Load average has recovered at ${currentLoad.time}`
        }, ...alerts]
      }));
    }

    this.setState(prevState => ({
      hasHighLoadAlert: isHighLoadAlert(prevState.data)
    }));
  }

  renderError() {
    if (this.state.error) {
      return null;
    }

    return (
      <div className='app-error'>
        <p>Oops! Something went wrong!</p>

        <p>Please try <a href=".">refreshing</a> the page again.</p>
      </div>
    );
  }

  renderContent() {
    if (this.state.error) {
      return null;
    }

    return (
      <div className='app-content'>
        <LineChart
          loadAverages={ this.state.data }
        />
        <Messages
          alerts={ this.state.alerts }
        />
      </div>
    );
  }

  render() {
    let content = (this.state.hasError
          ? this.renderError()
          : this.renderContent()
        );

    return (
      <div className='app'>
        <header className='app-header'>
          Load Monitoring Application
        </header>
        { content }
      </div>
    );
  }
}
