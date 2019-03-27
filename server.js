const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const os = require('os');

app.listen(port);

app.get('/load_averages', (req, res) => {
  let cpus = os.cpus().length,
      averages = os.loadavg()[0] / cpus;

  res.send({
    averages: averages
  });
});
