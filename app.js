const express = require("express");
const fs = require("fs");
const PORT = 5000;
const app = express();


const getDurationInMiliSeconds = start => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS //converted to second;
};


let demoLogger = (req, res, next) => { //middleware function
  let current_datetime = new Date();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getDurationInMiliSeconds(start);
  let log = `${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  console.log(log);
  
  fs.appendFile("request_logs.txt", log + "\n", err => {
    if (err) {
      console.log(err);
    }
  });
  next();
};


app.use(demoLogger);


app.get("/register", (req, res) => {
  res.send("This is the register page");
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});