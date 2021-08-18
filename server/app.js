const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require("./routes")
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is running under ${port}`)
})

module.exports = app;