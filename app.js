const express = require('express')
const app = express()

const sequelize = require('./database')

const cors = require('cors')

var cookieParser = require('cookie-parser')


var bodyParser = require('body-parser')

const routes = require('./routes/index')
const corsOption = {
    origin: "*"
}
const port = 5000
sequelize.sync({force:false}).then((result) => {
    // console.log(result);
    console.log("database synced successfully ");
}).catch((e) => {
    console.log(e);
})


app.use(cookieParser())
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))



app.use('/', routes);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to  application apis." });
});




app.listen(port, () => {
    console.log(`serever running at port  ${port}`);
})