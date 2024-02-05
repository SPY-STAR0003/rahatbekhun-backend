// ? ===================== Libraries =====
const envConfig = require('dotenv').config({path : "./config/config.env"});
const parser = require('body-parser');
const connectDB = require('./config/db');

// ? ===================== Express =======
const express = require('express')
const app = express()

// ? ===================== Routes ========
const adminRoute = require('./routes/admin');

// * ========= Connect DataBase ==========
connectDB();

// * ========= Parsers ===================
app.use(parser.urlencoded({extended : true}))
app.use(express.json());


app.use("/admin", adminRoute)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})