"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const controllers_1 = require("./controllers");
// import * as copy from './services'
// console.log('<<<<<<<<<<<<',copy)
// var express = require('express')
const app = express();
app.use(bodyParser.json());
app.post('/product', controllers_1.controllers.productController.postProduct);
app.get('/product', controllers_1.controllers.productController.getProduct);
app.post('/product/bulk', controllers_1.controllers.productController.postBulkProducts);
app.listen(3002, () => {
    console.log('<<<<<server is running on port 3001>>>');
});
//# sourceMappingURL=app.js.map