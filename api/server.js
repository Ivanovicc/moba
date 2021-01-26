const path = require('path');
const gateway = require('express-gateway');
const {conn} = require('./db.js')
require('./microservices/test.js')
require('./microservices/users.js')  //Uncomment requires for run all the microservices
require('./microservices/accounts.js')
require('./microservices/admin.js')

conn.sync({ force: false }).then(() => {
  gateway()
  .load(path.join(__dirname, 'config'))
  .run();
})
