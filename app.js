// ? ===================== Libraries =====
const envConfig = require('dotenv').config({path : "./config/config.env"});
const parser = require('body-parser');
const connectDB = require('./config/db');

// ? ===================== Express =======
const express = require('express')
const app = express()

// ? ===================== Routes ========
const adminRoute = require('./routes/admin');
const { errorHandler } = require('./middlewares/error');

// * ========= Connect DataBase ==========
connectDB();

// * ========= Parsers ===================
app.use(parser.urlencoded({extended : true}))
app.use(express.json());

// * ========= Routes ====================
app.use("/admin", adminRoute)

// * ========= Middlewares ===============
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})