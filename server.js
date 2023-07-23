const express = require('express');
const db = require('./app/config/db.config.js');
const cors = require('cors')
let router = require('./app/routers/router.js');
var bodyParser = require('body-parser');
const env = require('./app/config/env.js'); 
const User = db.User;



// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
}); 


const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', router);

// Create a Server
const server = app.listen(env.port, function () {
  console.log(`App listening on port ${env.port}`);
});


// Initialize Database with Default Users

function initial() {
  User.create({
    phone: '9876543210',
    full_name: 'armin',
    password: '123456789',
    role: 'buyer'
  });

  User.create({
    phone: '9876543211',
    full_name: 'admin',
    password: '123456789',
    role: 'admin'
  });
}



