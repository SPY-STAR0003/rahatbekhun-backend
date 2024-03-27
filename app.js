// ? ===================== Libraries =====
const envConfig = require('dotenv').config({path : "./config/config.env"});
const parser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// ? ===================== Files =========
const connectDB = require('./config/db');
const { setHeaders } = require('./middlewares/setHeaders');

// ? ===================== Express =======
const express = require('express')
const app = express()

// ? ===================== Routes ========
const adminRoute = require('./routes/admin');
const postRoute = require('./routes/posts');
const worksheetRoute = require('./routes/worksheet');
const { errorHandler } = require('./middlewares/error');

// * ========= Connect DataBase ==========
connectDB();

// * ========= Parsers ===================
app.use(parser.urlencoded({extended : true}))
app.use(fileUpload())
app.use(express.json());
app.use(setHeaders)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials : true
}))

// * ========= Routes ====================
app.use("/admin", adminRoute)
app.use("/admin/posts", postRoute)
app.use("/admin/worksheets", worksheetRoute)

// * ========= Middlewares ===============
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})