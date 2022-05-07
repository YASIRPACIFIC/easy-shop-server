const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*',cors())

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routers
const categoriesRouters = require('./routers/categories');
const productsRouters = require('./routers/products');
const usersRouters = require('./routers/users');
const ordersRouters = require('./routers/orders');



const api = process.env.API_url; 

app.use(`${api}/categories`,categoriesRouters );
app.use(`${api}/products`,productsRouters );
app.use(`${api}/users`, usersRouters);
app.use(`${api}/orders`,ordersRouters );

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
  
  //Development
// app.listen(3000, () => {
//   console.log("server is running http://localhost:3000");
// });

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port" + port)
})
