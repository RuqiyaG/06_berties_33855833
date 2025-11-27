// Create a new router and importing express and bcrypt so it can be used
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if(!req.session.userID) {
        res.redirect('users/login') 
    } else {
        next ();
    }
}

const {check, validationResult} = require('express-validator');

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.post('/registered', 
    [check('email').isEmail(), 
    check('username'.isLength({min: 5, max: 20}))], 
    function (req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('users/register')
    }
    else {
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
            let response = ' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            response += 'Your password is:'+ " " + req.body.password +  'and your hashed password is:'+ " " + hashedPassword

            res.send(response) 
        });
     }
    }

    //
    // const plainPassword = req.body.password;
    // const username = req.body.username;
    // const first = req.body.first;
    // const last = req.body.last;
    // const email = req.body.email;

    // // stores hashed password in database
    // bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
    //     // query to insert user info into database
    //     let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
    //     let usrInfo = [username, first, last, email, hashedPassword];

    //     // inserts the query into the database
    //     db.query(sqlquery, usrInfo, (err, result) => {
    //         if(err) {
    //             next(err)
    //         }
    //         // message that will show up in browser to show that you are successful.
    //         let response = ' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
    //         response += 'Your password is:'+ " " + req.body.password +  'and your hashed password is:'+ " " + hashedPassword

    //         res.send(response) 
    //     });

    // });

    // saving data in database
    //res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                            
}); 

router.get('/listusers', redirectLogin, function (req, res, next) {
    // left out hashed password so it is not retrievd
    let sqlquery = "SELECT id, username, first, last, email FROM users";

    // inserts query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("listusers.ejs",{users:result});
    });
});

router.get('/login', function(req, res, next) {
    res.render("login.ejs");
});


router.post('/loggedin', function(req, res, next) {
    const plainPassword = req.body.password;
    const username = req.body.username;

    let sqlquery = "SELECT hashedPassword FROM users where username = ?";
    db.query(sqlquery, [username], (err, result) => {
        if(err) {
            next(err)
        }
        if (!result[0]) {
            res.send("LOgin unsuccessful: User not found");
        }
        let hashedPassword = result[0].hashedPassword
        bcrypt.compare(req.body.password, hashedPassword, function(err, isMatch) {
            if (err) {
              next(err)
            }
            else if (isMatch) {              //result == true
              req.session.userID = username 
              res.send("LOg in successful!!!!")
            }
            else {
              res.send("LOg in unsuccessful: Incorrect Password")
            }
          });

    });

});



// Export the router object so index.js can access it
module.exports = router
