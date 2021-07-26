const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/todos', require('./routes/todos'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))