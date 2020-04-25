var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = 3000 || process.env.PORT;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

require("./routes/htmlRoutes")(app);
// require("./routes/apiRoutes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});