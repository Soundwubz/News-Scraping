var db = require("../models");

module.exports = function(app) {
    app.get("/", (req, res) => {
        db.Article.find({}).lean().then((dbArticle) => {
            // res.json(dbArticle);
            res.render("index", {dbArticle})
        }).catch((err) => {
            res.json(err);
        });
    })
}