var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Running Support Brazilian API on port " + port);
});

