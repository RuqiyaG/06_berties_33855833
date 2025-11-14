// Create a new router
const { name } = require("ejs");
const express = require("express")
const router = express.Router()

router.get('/list', function(req, res, next) {
  let sqlquery = "SELECT * FROM books";

  db.query(sqlquery, (err, result) => {
    if(err) {
        next(err)
    }
    res.render("list.ejs",{availableBooks:result})
  });
});

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword)
});

//new route for adding books
router.get('/addbook', function(req, res, next) {
    res.render("addbook.ejs");
});

// will redirect you another page to confirm you have added the book
router.post('/bookadded', function(req, res, next) {
    // query to insert a new book into database
    let sqlquery = "INSERT INTO books (name) VALUES(?)";
    let newrecord = [req.body.name];

    db.query(sqlquery, newrecord, (err, result) => {
        if(err) {
            next(err)
        }
        res.send('This book has been added:' + req.body.name)
      });

});

// Export the router object so index.js can access it
module.exports = router
