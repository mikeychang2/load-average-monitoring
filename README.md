# Load Monitoring Application

A simple React application that monitors load average on your machine.

## Requirements
* Collect the load averages of your system
* Display load averages in a graphical representation a history of load over the past 10 minutes in 10s intervals.
* User can keep web page open and monitor on machine.
* Alert when load average exceeds 1 for past 2 minutes
* Alert when load drops below 1 threshold for past 2 minutes
* Keep log of all alert messages
* Write a unit test for alert logic

## Notes
- Improvements on this application design (especially with more robust features)
* Add a state management container like Redux
* Implement Webpack for code-splitting and code bundling
* Use SASS especially if stylesheets get bigger

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Starting the server:
1) `cd datadog_load_monitoring`
2) Run `node server.js`

Starting the client
1) `cd datadog_load_monitoring/client`
2) Run `npm install` and `npm start` to get the client running on http://localhost:3000/.

## Running the tests

`cd datadog_load_monitoring/client`
`npm test`

## Built With

* [React](https://reactjs.org/) - Javascript UI Library
* [Express/Node](https://expressjs.com/) - Minimalist web framework for Node.js
* [Recharts](http://recharts.org/en-US/) - Composable charting React library
* [Create-React-App](https://github.com/facebook/create-react-app)

## Authors

* **Michael Chang**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
