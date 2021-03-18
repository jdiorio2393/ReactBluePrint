const express = require('express')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/build", express.static(path.join(__dirname, "../build")));


//=======================  OUR ROUTES  =======================

//=====================================================================

// general 404 handler for any other endpoints / serve homepage --->

app.use('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// global error handler --->
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('listening on port 3000'))