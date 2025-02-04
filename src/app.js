const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const port = 7777;
require('dotenv').config();
require('./events/eventServiceProvider');
const DispatchSchedule = require('../src/services/DispatchSchedule')
const chargeAttemptMail = require('../src/mails/ChargeAttemptSuccessMail');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(expressValidator);

app.use(cors());

app.use("/", routes);

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
  const options = {
    amount: 10000
  };
 // const mail = new chargeAttemptMail(options);
 // mail.sendMail();
  //console.log(crypto.randomBytes(5).toString('hex'));
   //DispatchSchedule.chargeAllSchedulesDue();
});
