import * as express from 'express'
import * as bodyParser from 'body-parser'
import { controllers } from './controllers'
// import * as copy from './services'
// console.log('<<<<<<<<<<<<',copy)


// var express = require('express')

const app= express()

app.use(bodyParser.json())

app.post('/product',controllers.productController.postProduct)
app.get('/product',controllers.productController.getProduct)
app.post('/product/bulk',controllers.productController.postBulkProducts)



app.listen(3002,()=>{
    console.log('<<<<<server is running on port 3001>>>')
})