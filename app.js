const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sequelize = require("./utils/database");

const app = express();
dotenv.config();

// import routes
const routes = require('./routes/getUser');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

// Routes
app.use("/", routes);

app.use('/', (req, res, next) => {
    res.render('bookingAppointmentApp',{pageTitle:'Booking Appointment App'});
})

// Database Connection

sequelize.sync().then(result => {
    console.log('Database Connected Successfully..!');
}).catch(err => {
    console.log(err);
})

// Server
app.listen(port, () => {
    console.log(`Server is successfully running on port : ${port}`);
})