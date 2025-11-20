// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    //
    const plainPassword = req.body.password;
    const username = req.body.username;
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;

    // stores hashed password in database
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
        // query to insert user info into database
        let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
        let usrInfo = [username, first, last, email, hashedPassword];

        // inserts the query into the database
        db.query(sqlquery, usrInfo, (err, result) => {
            if(err) {
                next(err)
            }
            // message that will show up in browser to show that you are successful.
            let result = ' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            result += 'Your password is:'+ req.body.password + 'and your hashed password is:'+ hashedPassword

            res.send(result) 
        });

    });

    // saving data in database
    //res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                            
}); 

// Export the router object so index.js can access it
module.exports = router
