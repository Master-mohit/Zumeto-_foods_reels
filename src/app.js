// ........create the server.........

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.route');
const foodRoute = require('./routes/food.routes');
const app = express();
app.use(express.json());  //req.body me ye data lakr deta h or redable banata h
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', authRoute);
app.use('/foodpartner',authRoute);
app.use('/food',foodRoute);

module.exports = app;