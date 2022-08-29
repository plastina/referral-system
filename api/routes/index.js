const bodyParser = require('body-parser')
 
const person = require('./PersonRoute.js')
const purchase = require('./PurchaseRoute.js')


module.exports = app => {
 app.use(
   bodyParser.json(),
   bodyParser.urlencoded({ extended: false }),
   person,
   purchase,
   )
 }


