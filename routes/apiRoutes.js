var axios = require("axios");
var cheerio = require("cheerio");
var db = require('../models');

module.exports = function(app) {
    app.get("/scrape", (req, res) => {
        // First, we grab the body of the html with axios
        axios.get("https://www.npr.org/sections/news/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
        
            // Now, we grab every .title within an article tag, and do the following:
            $(".title").each(function(i, element) {
                // Save an empty result object
                var result = {};
            
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                console.log(result);
        
                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                    })
                    .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });
            });
        
            // Send a message to the client
            res.send("Scrape Complete");
        });
    });

    app.post("/comment/:id", (req, res) => {
        db.Comment.create(req.body).then((dbComment) => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbComment._id }, { new: true });
        }).then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            res.json(err);
        })
    });
 
    app.get("/comment/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function(dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
        });
    })
}