const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.json());

connectDB();

const routes = require('./routes/inventory.routes');
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});