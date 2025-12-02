// making a new route
const express = require("express")
const router = express.Router()

router.get('/books', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"

    db.query(sqlquery, (err, result) => {
        if(err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})






// allowing index.js to access it
module.exports = router