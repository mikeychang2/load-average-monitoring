import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../styles/messages.css';

export default class Messages extends React.Component {
  static propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.object)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  renderMessages() {
    return this.props.alerts.map((alert, index) => {
      let classes = classNames({
        'messages-cell': true,
        'messages-cell--alert': alert.type === 'HIGH_LOAD',
        'messages-cell--recovered': alert.type === 'RECOVERED'
      });

      return (
        <div className={classes} key={index}>
          { alert.message }
        </div>
      );
    });
  }

  render() {
    return (
      <div className='messages'>
        <div className='messages-header'>Alerts Messages</div>

        <div className='message-content'>
          { this.renderMessages() }
        </div>
      </div>
    );
  }
}
