const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const connectBD = require('./server/database/connection');

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 8000

// log requests
app.use(morgan("tiny"));

// mongodb connection

connectBD();

// pass request to body parse
app.use(bodyParser.urlencoded({ extended: true }));

// load public
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));

// set view engine
app.set("view engine", "ejs");

// load routers
// const routPath = './server/routs/router';
app.use("/", require('./server/routes/router'));

app.listen(port, () => {
    console.log("Listening at port number " + port);
})