const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('mongoose-unique-validator'));
const router = require('./config/router');
const errorHandler = require('./lib/errorHandler');

const { dbURI, port } = require('./config/environment');

const app = express();

app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
